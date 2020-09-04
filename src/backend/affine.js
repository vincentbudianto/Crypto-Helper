/* Affine encription & decription */
let string = require('./util/string')

module.exports = {
	/**
     * Encrypts with formula : C = m * P + b (mod 26)
	 * @param {String} plaintext
	 * @param {Number} m
	 * @param {Number} b
	 * @returns {String} - Ciphertext
	 */
	encrypt: function (plaintext, m, b) {
		if (string.isString(plaintext)) {
			if (!isNaN(string.modInverse(m, 26))) {
            	// Convert string to order number
				let P = string.toNumbers(plaintext);

				for (let i = 0; i < P.length; i++) {
					P[i] = string.mod((m * P[i] + b), 26);
				}

				let out = string.toAlphabet(P);

				return out;
			} else {
				return "No modular inverse found !!!";
			}
		} else {
			return "Must be string !!!";
		}
	},

	/**
     * Decrypts with formula : P = m^(-1) (C - b) (mod 26)
	 * @param {String} ciphertext
	 * @param {Number} m
	 * @param {Number} b
	 * @returns {String} - Plaintext
	 */
	decrypt: function (ciphertext, m, b) {
		if (string.isString(ciphertext)) {
			if (!isNaN(string.modInverse(m, 26))) {
            	// Convert string to order number
				let C = string.toNumbers(ciphertext);

				for (let i = 0; i < C.length; i++) {
					C[i] = string.mod((string.modInverse(m, 26) * (C[i] - b)), 26);
				}

				let out = string.toAlphabet(C);

				return out;
			} else {
				return "No modular inverse found !!!";
			}
		} else {
			return "Must be string !!!";
		}
	}
}