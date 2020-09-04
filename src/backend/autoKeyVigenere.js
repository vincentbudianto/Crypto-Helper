/* Vigenere encription & decription */
let string = require('./util/string')

module.exports = {
    /**
     * Encrypts with formula : Ci = Pi + ki (mod 26), key is extended
     * @param {String} plaintext
     * @param {String} key
     * @returns {String} - Ciphertext
     */
    encrypt: function(plaintext, key) {
        if (string.isString(plaintext) && string.isString(key)) {
            // Convert string to order number
            let P = string.toNumbers(plaintext);
            let K = string.toNumbers(key);

            if (K == []) return plaintext; // Do nothing

            // Add key until same length
            let index = 0;

            while (K.length < P.length) {
                K.push(P[index]);
                index++;
            }

            for (let i = 0; i < P.length; i++) {
                let x = P[i] + K[i];

                P[i] = x % 26;
            }

            let out = string.toAlphabet(P);

            return out;
        } else {
            return "Must be string !!!";
        }
    },

    /**
     * Decrypts with formula : Pi = Ci - ki (mod 26), key is extended
     * @param {String} ciphertext
     * @param {String} key
     * @returns {String} - Plaintext
     */
    decrypt: function(ciphertext, key) {
        if (string.isString(ciphertext) && string.isString(key)) {
            // Convert string to order number
            let C = string.toNumbers(ciphertext);
            let K = string.toNumbers(key);

            if (K == []) return ciphertext; // Do nothing

            for (let i = 0; i < C.length; i++) {
                let x = C[i] - K[i] + 26;

                C[i] = x % 26;
                K.push(C[i]);
            }

            let out = string.toAlphabet(C);

            return out;
        } else {
            return "Must be string !!!";
        }
    }
}