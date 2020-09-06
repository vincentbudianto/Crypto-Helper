/* Vigenere encription & decription */
let string = require('./util/string')

module.exports = {
    /**
     * Encrypts with formula : Ci = Pi + ki (mod 26)
     * @param {String} plaintext
     * @param {String} key
     * @returns {String} - Ciphertext
     */
    encrypt: function(plaintext, key) {
        if (string.isString(plaintext) && string.isString(key)) {
            // Convert string to order number
            let P = string.toNumbers(plaintext);
            let K = string.toNumbers(key);

            for (let i = 0; i < P.length; i++) {
                P[i] = string.mod((P[i] + K[string.mod(i, K.length)]), 26);
            }

            let out = string.toAlphabet(P);

            return out;
        } else {
            return "INPUT ERROR";
        }
    },

    /**
     * Decrypts with formula : Pi = Ci - ki (mod 26)
     * @param {String} ciphertext
     * @param {String} key
     * @returns {String} - Plaintext
     */
    decrypt: function(ciphertext, key) {
        if (string.isString(ciphertext) && string.isString(key)) {
            // Convert string to order number
            let C = string.toNumbers(ciphertext);
            let K = string.toNumbers(key);

            for (let i = 0; i < C.length; i++) {
                C[i] = string.mod((C[i] - K[string.mod(i, K.length)]), 26);
            }

            let out = string.toAlphabet(C);

            return out;
        } else {
            return "INPUT ERROR";
        }
    }
}