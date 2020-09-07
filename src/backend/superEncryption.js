/* Super encription & decription */
let string = require('./util/string')
let vigenere = require('./vigenere')

module.exports = {
    /**
     * Generate matrix filled with alphabet :
     * @param {String} input
     * @param {Number} k
     * @returns {2dArray} - Transposedtext
     */
	generateTable: function (input, k) {
		let i = 0;

		// Initilize matrix
		let matrix = new Array(k);

		for (let j = 0; j < matrix.length; j++) {
			matrix[j] = new Array(k);
		}

		// Initilize matrix's elements
		for (let k = 0; k < matrix.length; k++) {
			for (let l = 0; l < matrix[k].length; l++) {
				if (i < input.length) {
					matrix[k][l] = input[i];
					i++;
				} else {
					matrix[k][l] = "?";
				}
			}
		}

		return matrix;
	},

	/**
	 * Encrypts with steps :
	 * 1. Encrypt using substitution cipher
	 * 2. Encrypt using transposition cipher
	 * @param {String} plaintext
	 * @param {String} key
	 * @returns {String} - Ciphertext
	 */
	encrypt: function (plaintext, key) {
		if (string.isString(plaintext) && string.isString(key)) {
			plaintext = string.removeNonAlphabet(plaintext);
			key = string.removeNonAlphabet(key);

			let temp = vigenere.encrypt(plaintext, key);
			let k = Math.ceil(Math.sqrt(temp.length));
			let matrix = this.generateTable(temp, k);
			let out = "";

			for (let i = 0; i < k; i++) {
				for (let j = 0; j < k; j++) {
					out += matrix[j][i];
				}
			}

			return out;
		} else {
			return "INPUT ERROR";
		}
	},

	/**
	 * Decrypts with steps :
	 * 1. Decrypt using transposition cipher
	 * 2. Decrypt using substitution cipher
	 * @param {String} ciphertext
	 * @param {String} key
	 * @returns {String} - Plaintext
	 */
	decrypt: function (ciphertext, key) {
		if (string.isString(ciphertext) && string.isString(key)) {
			ciphertext = string.removeNonAlphabetException(ciphertext);
			key = string.removeNonAlphabet(key);

			let k = Math.ceil(Math.sqrt(ciphertext.length));
			let matrix = this.generateTable(ciphertext, k);
			let temp = "";

			for (let i = 0; i < k; i++) {
				for (let j = 0; j < k; j++) {
					temp += matrix[j][i];
				}
			}

			let out = vigenere.decrypt(temp, key);

			return out;
		} else {
			return "INPUT ERROR";
		}
	}
}