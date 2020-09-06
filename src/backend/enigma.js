/* Vigenere encription & decription */
let string = require('./util/string');
const { not, re } = require('mathjs');

module.exports = {
	/** Get reflector positions
	 *      Rotor #				ABCDEFGHIJKLMNOPQRSTUVWXYZ			 Date 			Introduced	Model Name & Number
	 *               UKW		QYHOGNECVPUZTFDJAXWMKISRBL		7 February 1941			German Railway (Rocket)
	 *             UKW-K		IMETCGFRAYSQBZXWLHKDVUPOJN		 February 1939					Swiss K
	 *       Reflector A		EJMZALYXVBWFCRQUONTSPIKHGD
	 *       Reflector B		YRUHQSLDPXNGOKMIEBFZCWVJAT
	 *       Reflector C		FVPJIAOYEDRZXWGCTKUQSBNMHL
	 *  Reflector B Thin		ENKQAUYWJICOPBLMDXZVFTHRGS			 1940					M4 R1 (M3 + Thin)
	 *  Reflector C Thin		RDOBJNTKVEHMLFCWZAXGYIPSUQ			 1940					M4 R1 (M3 + Thin)
	 * @param {String} reflector
	 * @returns {Array} - Array of alphabets
	 */
	getRefletor: function (reflector) {
		let out;

		if (reflector === "UKW") {
			out = "QYHOGNECVPUZTFDJAXWMKISRBL".split("");
		} else if (reflector === "UKW - K") {
			out = "IMETCGFRAYSQBZXWLHKDVUPOJN".split("");
		} else if (reflector === "Reflector A") {
			out = "EJMZALYXVBWFCRQUONTSPIKHGD".split("");
		} else if (reflector === "Reflector B") {
			out = "YRUHQSLDPXNGOKMIEBFZCWVJAT".split("");
		} else if (reflector === "Reflector C") {
			out = "FVPJIAOYEDRZXWGCTKUQSBNMHL".split("");
		} else if (reflector === "Reflector B Thin") {
			out = "ENKQAUYWJICOPBLMDXZVFTHRGS".split("");
		} else if (reflector === "Reflector C Thin") {
			out = "RDOBJNTKVEHMLFCWZAXGYIPSUQ".split("");
		} else {
			out = [];
		}

		return out;
	},

	/**
	 * Get turnover notch positions
	 * 	  	Rotor				Notch								Effect
	 *  		    I			  Q			If rotor steps from Q to R, the next rotor is advanced
	 *  		   II			  E			If rotor steps from E to F, the next rotor is advanced
	 *  		  III			  V			If rotor steps from V to W, the next rotor is advanced
	 *  		   IV			  J			If rotor steps from J to K, the next rotor is advanced
	 *  		    V			  Z			If rotor steps from Z to A, the next rotor is advanced
	 *  VI, VII, VIII	 		 M+Z		If rotor steps from M to N, or from Z to A the next rotor is advanced
	 * @param {String} rotorType
	 * @returns {String} - Turnover notch
	 */
	getNotch: function (rotorType) {
		let notch;

		if (rotorType === "I") {
			notch = "Q";
	    } else if (rotorType === "II") {
			notch = "E";
	    } else if (rotorType === "III") {
	     	notch = "V";
	    } else if (rotorType === "IV") {
	      	notch = "J";
	    } else if (rotorType === "V") {
	      	notch = "Z";
	    } else if (rotorType === "VI") {
	      	notch = ["M", "Z"];
	    } else if (rotorType === "VII") {
	      	notch = ["M", "Z"];
		} else if (rotorType === "VIII") {
	      	notch = ["M", "Z"];
		}

	    return notch;
	},

	/**
	 * Get rotor wiring
	 *		Rotor #				ABCDEFGHIJKLMNOPQRSTUVWXYZ			Date 			Introduced	Model Name & Number
	 *                IC		DMTWSILRUYQNKFEJCAZBPGXOHV			1924				Commercial Enigma A, B
	 *               IIC		HQZGPJTMOBLNCIFDYAWVEUSRKX			1924				Commercial Enigma A, B
	 *              IIIC		UQNTLSZFMREHDPXKIBVYGJCWOA			1924				Commercial Enigma A, B
	 * -------------------------------------------------------------------------------------------------------------
	 *      Rotor #				ABCDEFGHIJKLMNOPQRSTUVWXYZ			Date 			Introduced	Model Name & Number
	 *        I (Rocket)		JGDQOXUSCAMIFRVTPNEWKBLZYH		7 February 1941			German Railway (Rocket)
	 *       II (Rocket)		NTZPSFBOKMWRCJDIVLAEYUXHGQ		7 February 1941			German Railway (Rocket)
	 *      III (Rocket)		JVIUBHTCDYAKEQZPOSGXNRMWFL		7 February 1941			German Railway (Rocket)
	 *               ETW		QWERTZUIOASDFGHJKPYXCVBNML		7 February 1941			German Railway (Rocket)
	 * -------------------------------------------------------------------------------------------------------------
	 *      Rotor #				ABCDEFGHIJKLMNOPQRSTUVWXYZ			Date 			Introduced	Model Name & Number
	 *               I-K		PEZUOHXSCVFMTBGLRINQJWAYDK		 February 1939					Swiss K
	 *              II-K		ZOUESYDKFWPCIQXHMVBLGNJRAT		 February 1939					Swiss K
	 *             III-K		EHRVXGAOBQUSIMZFLYNWKTPDJC		 February 1939					Swiss K
	 *             ETW-K		QWERTZUIOASDFGHJKPYXCVBNML		 February 1939					Swiss K
	 * -------------------------------------------------------------------------------------------------------------
	 *      Rotor #				ABCDEFGHIJKLMNOPQRSTUVWXYZ			Date 			Introduced	Model Name & Number
	 *      I (Enigma I)		EKMFLGDQVZNTOWYHXUSPAIBRCJ			1930						Enigma I
	 *     II (Enigma I)		AJDKSIRUXBLHWTMCQGZNPYFVOE			1930						Enigma I
	 *    III (Enigma I)		BDFHJLCPRTXVZNYEIWGAKMUSQO			1930						Enigma I
	 *                IV		ESOVPZJAYQUIRHXLNFTGKDCMWB		 December 1938					M3 Army
	 *                 V		VZBRGITYUPSDNHLXAWMJQOFECK		 December 1938					M3 Army
	 *                VI		JPGVOUMFYQBENHZRDKASXLICTW			1939				M3 & M4 Naval (FEB 1942)
	 *               VII		NZJHGRCXMYSWBOUFAIVLPEKQDT			1939				M3 & M4 Naval (FEB 1942)
	 *              VIII		FKQHTLXOCBJSPDZRAMEWNIUYGV			1939				M3 & M4 Naval (FEB 1942)
	 * -------------------------------------------------------------------------------------------------------------
	 *      Rotor #				ABCDEFGHIJKLMNOPQRSTUVWXYZ			Date 			Introduced	Model Name & Number
	 *              Beta		LEYJVCNIXWPBQMDRTAKZGFUHOS		  Spring 1941					 M4 R2
	 *             Gamma		FSOKANUERHMBTIYCWLQPZXVGJD		  Spring 1942					 M4 R2
	 *               ETW		ABCDEFGHIJKLMNOPQRSTUVWXYZ										Enigma I
	 * @param {String} rotorType
	 * @param {String} key
	 * @returns {Array} - Rotor wiring
	 */
	getRotor: function (rotorType, key) {
		let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let x = alphabet.indexOf(key);
		let res = "";

		if (rotorType === "I") {
			let secret = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
			res += secret.slice(x, 26) + secret.slice(0, x);
		} else if (rotorType === "II") {
			let secret = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
			res += secret.slice(x, 26) + secret.slice(0, x);
	    } else if (rotorType === "III") {
			let secret = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
			res += secret.slice(x, 26) + secret.slice(0, x);
	    } else if (rotorType === "IV") {
			let secret = "ESOVPZJAYQUIRHXLNFTGKDCMWB";
			res += secret.slice(x, 26) + secret.slice(0, x);
	    } else if (rotorType === "V") {
			let secret = "VZBRGITYUPSDNHLXAWMJQOFECK";
			res += secret.slice(x, 26) + secret.slice(0, x);
	    } else if (rotorType === "VI") {
			let secret = "JPGVOUMFYQBENHZRDKASXLICTW";
			res += secret.slice(x, 26) + secret.slice(0, x);
	    } else if (rotorType === "VII") {
			let secret = "NZJHGRCXMYSWBOUFAIVLPEKQDT";
			res += secret.slice(x, 26) + secret.slice(0, x);
		} else if (rotorType === "VIII") {
			let secret = "FKQHTLXOCBJSPDZRAMEWNIUYGV";
			res += secret.slice(x, 26) + secret.slice(0, x);
		}

	    return res.split("");
	},

	/** Get machine initial positions
	 * @param {String} key
	 * @returns {Array} - Array of alphabets
	 */
	getSecretkey: function (key) {
		let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let x = alphabet.indexOf(key);

		let out = key + alphabet.slice((x + 1), 26) + alphabet.slice(0, x);

		return out.split("");
	},

	/** Get plugboard positions
	 * @param {String} plugboard
	 * @returns {Array} - Array of alphabets
	 */
	getPlugboard: function (plugboard) {
		let i = 0;
		let j = 0;
		let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

		while (j < (plugboard.length / 2)) {
			let x = alphabet.indexOf(plugboard[i]);
			let y = alphabet.indexOf(plugboard[i + 1]);

			if (x !== -1 && y !== -1) {
				alphabet[x] = plugboard[i + 1];
				alphabet[y] = plugboard[i];
			}

			i += 2;
			j++;
		}

		return alphabet;
	},

	/**
	 * Encrypts with enigma cipher
	 * @param {String} plaintext
	 * @param {String} key
	 * @param {String} rotorType
	 * @param {String} wheel
	 * @param {String} wiring
	 * @returns {String} - Ciphertext
	 */
	encrypt: function (plaintext, key, rotorType, wheel, wiring) {
		if (string.isString(plaintext) && string.isString(key)) {
			rotorType = rotorType.split("|");
			plaintext = string.removeNonAlphabet(plaintext);
			key = string.removeNonAlphabet(key).slice(0, rotorType.length);

			let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			let reflector = this.getRefletor(wheel);
			let plugboard = this.getPlugboard(wiring);
			let notch = [];
			let rotor = [];
			let secretkey = [];
			let out = [];

			for (let i = 0; i < rotorType.length; i++) {
				notch.push(this.getNotch(rotorType[i]));
				rotor.push(this.getRotor(rotorType[i], key[i]));
				secretkey.push(this.getSecretkey(key[i]));
			}

			// for (let j = 0; j < plaintext.length; j++) {
			for (let j = 0; j < 1; j++) {
				// Shift last rotor
				let x = rotor[rotor.length - 1].shift();
				let y = secretkey[secretkey.length - 1].shift();

				rotor[rotor.length - 1].push(x);
				secretkey[secretkey.length - 1].push(y);

				let char = plaintext[j];

				console.log("Input :", char);

				// Plugboard substitution
				if (char != plugboard[alphabet.indexOf(char)]) {
					char = plugboard[alphabet.indexOf(char)];
				}

				console.log("\nPlugboard 1");
				console.log("->", char);

				// To reflector
				console.log("\nTo Reflector");
				char = secretkey[secretkey.length - 1][alphabet.indexOf(char)];
				console.log("-->", char);
				char = rotor[rotor.length - 1][secretkey[secretkey.length - 1].indexOf(char)];
				console.log("-->", char);

				console.log("\nTo rotor 2")

				for (let k = (rotor.length - 2); k >= 0; k--) {
					console.log("iteration :", k);
					char = secretkey[k][secretkey[k + 1].indexOf(char)];
					console.log("--->", char);
					char = rotor[k][secretkey[k].indexOf(char)];
					console.log("--->", char)
				}

				// Reflector
				console.log("\nReflector");
				char = reflector[string.mod((alphabet.indexOf(char) - string.toNumbers(secretkey[0][0])[0]), 26)];
				console.log("---->", char);

				// From reflector
				console.log("\nFrom Reflector");

				console.log("rotor", rotor[0]);
				console.log("n :", secretkey[0].indexOf(char) - string.toNumbers(secretkey[0][0])[0]);
				char = rotor[0][string.mod((secretkey[0].indexOf(char) - string.toNumbers(secretkey[0][0])[0]), 26)];
				console.log("char :", char);
				char = secretkey[0][rotor[0].indexOf(char)];
				console.log(rotor[0].indexOf(char));
				console.log(char);


				for (let l = 1; l > (rotor.length - 1); l++) {
				}

				// // Plugboard substitution
				// if (char != plugboard[plugboard.indexOf(char)]) {
				// 	char = plugboard[plugboard.indexOf(char)];
				// }

				// out.push(char)

				// // Check previous rotors for change
				// for (let m = (rotor.length - 1); m > 0; m--) {
				// 	if (rotor[m][0] == notch[m]) {
				// 		x = rotor[m - 1].shift();
				// 		y = secretkey[m - 1].shift();
				// 		secretkey[m - 1].push(y);
				// 		rotor[m - 1].push(x);
				// 	}
				// }
			}

			// console.log("plaintext :", plaintext);
			// console.log("key :", key);
			// console.log("secretkey :", secretkey);
			// console.log("rotorType :", rotorType);
	        // console.log("notch :", notch);
			// console.log("rotor :", rotor);
			// console.log("wheel :", wheel);
			// console.log("reflector :", reflector);
	        // console.log("wiring :", wiring);
			// console.log("plugboard :", plugboard);

			return out.join('');
		} else {
            return "Must be string !!!";
		}
	},

	/**
	 * Decrypts with enigma cipher
	 * @param {String} ciphertext
	 * @param {String} key
	 * @param {String} rotorType
	 * @param {String} wheel
	 * @param {String} wiring
	 * @returns {String} - Plaintext
	 */
	decrypt: function (ciphertext, key, rotorType, wheel, wiring) {},
};