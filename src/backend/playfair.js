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

		return matrix;
	},

    /**
     * Find letter position (x,y) in secretkey matrix
     * @param {Array} matrix
     * @param {String} input
     * @returns {Array} - Position
     */
	getPos: function (matrix, input) {
		let out = new Array(2);
		let i = 0;
		let found = false;

		while (!found && (i < matrix.length)) {
			let j = 0;

			while (!found && (j < matrix[i].length)) {
				if (matrix[i][j] === input) {
					out[0] = i;
					out[1] = j;
					found = true;
				} else {
					j++;
				}
			}

			i++;
		}

		return out;
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
	 * 	  • The first letter is replaced with the letter at the intersection of the first letter row with the second letter column
	 *	  • The second letter is replaced with the letter at the fourth corner of the rectangle formed from the three letters used so far
     * @param {String} plaintext
     * @param {String} key
     * @returns {String} - Ciphertext
     */
	encrypt: function (plaintext, key) {
		if (string.isString(plaintext) && string.isString(key)) {
			plaintext = string.replaceCharacters(plaintext, "J", "I");

			let out = [];
			let P = string.bigram(plaintext);
			let K = this.generateKey(key);

			for (let i = 0; i < P.length; i++) {
				let pos1 = this.getPos(K, P[i][0]);
				let pos2 = this.getPos(K, P[i][1]);

				if (pos1[0] == pos2[0]) {
					out.push(K[pos1[0]][string.mod((pos1[1] + 1), 5)] + K[pos2[0]][string.mod((pos2[1] + 1), 5)])
				} else if (pos1[1] == pos2[1]) {
					out.push(K[string.mod((pos1[0] + 1), 5)][pos1[1]] + K[string.mod((pos2[0] + 1), 5)][pos2[1]])
				} else {
					out.push(K[pos1[0]][pos2[1]] + K[pos2[0]][pos1[1]])
				}
			}

			return out.join("");
		} else {
			return "INPUT ERROR";
		}
	},

    /**
     * Decrypts with rules :
	 * 1. If two letters are on the same square row then each letter is replaced with a letter to its left
	 * 2. If two letters are in the same square column then each letter is replaced with a letter above it
	 * 3. If two letters are not in the same row or the same column, then :
	 *    • The first letter is replaced with the letter at the intersection of the first letter row with the second letter column
	 *    • The second letter is replaced with the letter at the fourth vertex of the rectangle formed from the three letters used so far
	 * 4. Throw away any letter X which has no meaning
     * @param {String} ciphertext
     * @param {String} key
     * @returns {String} - Plaintext
     */
	decrypt: function (ciphertext, key) {
		if (string.isString(ciphertext) && string.isString(key)) {
			let out = [];
			let C = string.bigram(ciphertext);
			let K = this.generateKey(key);

			for (let i = 0; i < C.length; i++) {
				let pos1 = this.getPos(K, C[i][0]);
				let pos2 = this.getPos(K, C[i][1]);

				if (pos1[0] == pos2[0]) {
					out.push(K[pos1[0]][string.mod((pos1[1] - 1), 5)] + K[pos2[0]][string.mod((pos2[1] - 1), 5)])
				} else if (pos1[1] == pos2[1]) {
					out.push(K[string.mod((pos1[0] - 1), 5)][pos1[1]] + K[string.mod((pos2[0] - 1), 5)][pos2[1]])
				} else {
					out.push(K[pos1[0]][pos2[1]] + K[pos2[0]][pos1[1]])
				}
			}

			return out.join("");
		} else {
			return "INPUT ERROR";
		}
	}
}