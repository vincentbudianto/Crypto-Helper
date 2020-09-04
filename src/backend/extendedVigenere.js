/* Vigenere encription & decription*/
var string = require('./util/string')

module.exports = {
    /**
     * Encrypts with formula : Ci = Pi + ki (mod 256)
     * @param {String} plaintext 
     * @param {String} key 
     * @returns {String} - Ciphertext
     */
    encrypt : function(plaintext, key) {
        // Convert string to ASCII
        let P = plaintext;
        let K = key;

        if (typeof plaintext == "string") P = string.toASCII(plaintext);
        if (typeof key == "string") K = string.toASCII(key);

        if (K == []) return plaintext; // Do nothing
        for (var i = 0; i < P.length; i++) {
            let x = P[i] + K[i % K.length];
            P[i] = x % 256;
        }
        return P;
    },
    /**
     * Decrypts with formula : Pi = Ci - ki (mod 26)
     * @param {String} ciphertext 
     * @param {String} key 
     * @returns {String} - Plaintext
     */
    decrypt : function(ciphertext, key) {
        // Convert string to ASCII
        let C = ciphertext;
        let K = key;

        if (typeof ciphertext == "string") C = string.toASCII(ciphertext);
        if (typeof key == "string") K = string.toASCII(key);

        if (K == []) return ciphertext; // Do nothing
        for (var i = 0; i < C.length; i++) {
            let x = C[i] - K[i % K.length] + 256;
            C[i] = x % 256;
        }
        return C;
    }
}