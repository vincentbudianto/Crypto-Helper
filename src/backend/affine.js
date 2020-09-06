/* Affine encription & decription */
let string = require('./util/string')

module.exports = {
	/**
     * Encrypts with formula : C = m * P + b (mod 26)
	 * @param {String} plaintext
	 * @param {String} key
	 * @returns {String} - Ciphertext
	 */
	encrypt: function (plaintext, key) {
		if (string.isString(plaintext) && string.isString(key)) {
			let keyDigits = key.split(" ");
			let m = parseInt(keyDigits[0]);
			let b = parseInt(keyDigits[1]);

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
			return "INPUT ERROR";
		}
	},

	/**
     * Decrypts with formula : P = m^(-1) (C - b) (mod 26)
	 * @param {String} ciphertext
	 * @param {String} key
	 * @returns {String} - Plaintext
	 */
	decrypt: function (ciphertext, key) {
		if (string.isString(ciphertext) && string.isString(key)) {
			let keyDigits = key.split(" ");
			let m = parseInt(keyDigits[0]);
			let b = parseInt(keyDigits[1]);

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
			return "INPUT ERROR";
		}
	}
}