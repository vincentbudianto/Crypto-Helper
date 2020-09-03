/* Playfair encription & decription */
let string = require('./util/string')

module.exports = {
    /**
     * Generate secret key with rules :
	 * 1. Remove all letter J from key
	 * 2. Add all missing alphabet from key except letter J
	 * 3. Insert key into the 5x5 square
     * @param {String} key
     * @returns {2dArray} - Secretkey
     */
	generateKey: function (key) {
		key = string.removeNonAlphabet(key);
		key = string.replaceCharacters(key, "J", "");

		let i = 0;
		let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
		let secretKey = string.removeDuplicates(key + alphabet);

		// Initilize matrix
		let matrix = new Array(5);

		for (let j = 0; j < matrix.length; j++) {
			matrix[j] = new Array(5);
		}

		// Initilize matrix's elements
		for (let k = 0; k < matrix.length; k++) {
			for (let l = 0; l < matrix[k].length; l++) {
				matrix[k][l] = secretKey[i];
				i++;
			}
		}

		// Display matrix
		// for (let m = 0; m < matrix.length; m++) {
		// 	for (let n = 0; n < matrix[m].length; n++) {
		// 		console.log(m, ":", n, " -> ", matrix[m][n]);
		// 	}
		// }
		// console.log(secretKey.length, ":", secretKey);

		return matrix;
	},

    /**
     * Encrypts with rules :
	 * 1. Replace all letter J with letter I
	 * 2. Write a message in letter pairs (bigram)
	 * 3. There should not be the same letter pairs. If there is, insert letter X in the center
	 * 4. If the number of letters is odd, add letter X at the end
	 * 5. If two letters are on the same key line, then each letter is replaced with the letter to the right (cyclic)
	 * 6. If two letters are in the same key column, each letter is replaced with a letter under it (cyclic)
	 * 7. If two letters are not in the same row or column, then :
	 * 	  • The first letter is replaced with a letter at the intersection of the first letter row with the second letter column
	 *	  • The second letter is replaced by a letter at the fourth corner of the rectangle formed from the three letters used so far
     * @param {String} plaintext
     * @param {String} key
     * @returns {String} - Ciphertext
     */
	encrypt: function (plaintext, key) {
		if (string.isString(plaintext) && string.isString(key)) {
			plaintext = string.replaceCharacters(plaintext, "J", "I");

			let P = string.digrams(plaintext);
			let K = this.generateKey(key);

			console.log(P);
			console.log(K);

			// return out;
		} else {
			return "Must be string !!!";
		}
	},

    /**
     * Decrypts with rules :
	 * 1. If two letters are on the same square row then each letter is replaced by a letter to its left
	 * 2. If two letters are in the same square column then each letter is replaced with a letter above it
	 * 3. If two letters are not in the same row or the same column, then :
	 *    • The first letter is replaced by the letter at the intersection of the first letter row with the second letter column
	 *    • The second letter is replaced by a letter at the fourth vertex of the rectangle formed from the three letters used so far
	 * 4. Throw away any letter X which has no meaning
     * @param {String} ciphertext
     * @param {String} key
     * @returns {String} - Plaintext
     */
	decrypt: function (ciphertext, key) {
		if (string.isString(ciphertext) && string.isString(key)) {
			// Convert string to order number
			let C = string.toNumbers(ciphertext);
			let K = string.toNumbers(key);

			if (K == []) return ciphertext; // Do nothing
			for (let i = 0; i < C.length; i++) {
				let x = C[i] - K[i % K.length] + 26;
				C[i] = x % 26;
			}
			let out = string.toAlphabet(C);
			return out;
		} else {
			return "Must be string !!!";
		}
	}
}