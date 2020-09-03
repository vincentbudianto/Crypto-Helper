/* Vigenere encription & decription */
let string = require('./util/string')

let charTable = require('./util/charTable.json')

module.exports = {
    /**
     * Encrypts with formula : Ci = custom char table[ki][Pi]
     * @param {String} plaintext
     * @param {String} key
     * @returns {String} - Ciphertext
     */
    encrypt : function(plaintext, key) {
        if (string.isString(plaintext) && string.isString(key)) {
            // Convert string to order number
            let P = string.toNumbers(plaintext);
            let K = string.toNumbers(key);

            if (K == []) return plaintext; // Do nothing if key doesn't exist

            for (let i = 0; i < P.length; i++) {
                let Kn = K[i % K.length]; // charTable index by Ki

                P[i] = charTable[Kn][P[i]];
            }

            let out = string.toAlphabet(P);

            return out;
        } else {
            return "Must be string !!!";
        }
    },

    /**
     * Decrypts with formula : Pi = custom char table[ki].indexof(Ci)
     * @param {String} ciphertext
     * @param {String} key
     * @returns {String} - Plaintext
     */
    decrypt : function(ciphertext, key) {
        if (string.isString(ciphertext) && string.isString(key)) {
            // Convert string to order number
            let C = string.toNumbers(ciphertext);
            let K = string.toNumbers(key);

            if (K == []) return ciphertext; // Do nothing if key doesn't exist

            for (let i = 0; i < C.length; i++) {
                let Kn = K[i % K.length]; // charTable index by Ki

                C[i] = charTable[Kn].indexOf(C[i]);
            }

            let out = string.toAlphabet(C);

            return out;
        } else {
            return "Must be string !!!";
        }
    }
}