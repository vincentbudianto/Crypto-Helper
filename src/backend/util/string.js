/* All string-related utility function is stored here */
let a = "A";

module.exports = {
    /**
     * Check if input type is string
     * @param {String} input
     * @returns {Boolean}
     */
    isString: function(input) {
        return ((typeof input) == "string");
    },

    /**
     * Removes all non alphabet and capitalize each letters (including spaces & newlines)
     * @param {String} input
     * @returns {String}
     */
    removeNonAlphabet : function (input) {
        return input.replace(/[^a-zA-Z]/gi, '').toUpperCase();
    },

    /**
     * Removes all non alphabet and capitalize each letters (including spaces & newlines except '?')
     * @param {String} input
     * @returns {String}
     */
    removeNonAlphabetException: function (input) {
        return input.replace(/[^a-zA-Z?]/gi, '').toUpperCase();
    },

    /**
     * Removes all non alphabet and capitalize each letters (including spaces & newlines except '?' and '#)
     * @param {String} input
     * @returns {String}
     */
    removeNonAlphabetHill: function (input) {
        return input.replace(/[^a-zA-Z?#]/gi, '').toUpperCase();
    },

    /**
     * Removes all duplicate characters
     * @param {String} input
     * @returns {String}
     */
    removeDuplicates: function(input) {
        return input.split('').filter(function (char, pos, self) {
            return self.indexOf(char) == pos;
        }).join('');
    },

    /**
     * Replace all specific characters with another character
     * @param {String} input
     * @param {String} search
     * @param {String} replace
     * @returns {String}
     */
    replaceCharacters: function(input, search, replace) {
        let regex = new RegExp(search, "gi");

        return input.replace(regex, replace.toUpperCase());
    },

    /**
     * Converts all alphabet to its order in alphabet (e.g. J -> 10)
     * @param {String} input - All characters must be upper case alphabet
     * @returns {Array} - Array of order numbers
     */
    toNumbers: function(input) {
        input = this.removeNonAlphabet(input);

        let out = [];

        for (let i = 0; i < input.length; i++) {
            out.push(input.charCodeAt(i) - a.charCodeAt(0));
        }

        return out;
    },

    /**
     * Converts all alphabet to its order in alphabet (e.g. J -> 10)
     * @param {String} input - All characters must be upper case alphabet
     * @returns {Array} - Array of order numbers
     */
    toNumbersException: function(input) {
        input = this.removeNonAlphabetException(input);

        let out = [];

        for (let i = 0; i < input.length; i++) {
            out.push(input.charCodeAt(i) - a.charCodeAt(0));
        }

        return out;
    },

    /**
     * Converts all number order in alphabet to alphabet with ? -> 27 (e.g. 10 -> J)
     * @param {Array} input - Array of order numbers
     * @returns {String}
     */
    toNumbersHill: function (input) {
        input = this.removeNonAlphabetHill(input);

        let out = [];

        for (let i = 0; i < input.length; i++) {
            if (input[i] === "?") {
                out.push(26);
            } else if (input[i] === "#") {
                out.push(27);
            } else {
                out.push(input.charCodeAt(i) - a.charCodeAt(0));
            }
        }

        return out;
    },

    /**
     * Converts all alphabet to ASCII
     * @param {String} input - All characters must be upper case alphabet
     * @returns {Array} - Array of order numbers
     */
    toASCII: function(input) {
        let out = [];

        for (var i = 0; i < input.length; i++) {
            out.push(input.charCodeAt(i));
        }

        return out;
    },

    /**
     * Converts all number order in alphabet to alphabet (e.g. 10 -> J)
     * @param {Array} input - Array of order numbers
     * @returns {String}
     */
    toAlphabet: function(input) {
        let out = "";

        for (let i = 0; i < input.length; i++) {
            if (input[i] === 63) {
                out += String.fromCharCode(input[i]);
            } else {
                out += String.fromCharCode(input[i] + a.charCodeAt(0));
            }
        }

        return out;
    },

    /**
     * Converts all number order in alphabet to alphabet with 27 -> ? (e.g. 10 -> J)
     * @param {Array} input - Array of order numbers
     * @returns {String}
     */
    toAlphabetHill: function(input) {
        let out = "";

        for (let i = 0; i < input.length; i++) {
            if (input[i] === 26) {
                out += "?";
            } else if (input[i] === 27) {
                out += "#";
            } else {
                out += String.fromCharCode(input[i] + a.charCodeAt(0));
            }
        }

        return out;
    },

    /**
     * Mod operator (eg: mod(-10, 26) = 16)
     * @param {Number} a
     * @param {Number} b
     * @returns {Number}
     */
    mod: function(a, b) {
        let res = a % b;

        return Math.floor(res >= 0 ? res : this.mod(a + b, b));
    },

	/**
     * Modular inverse (eg: modinv(7, 26) = 15)
	 * @param {Number} m
	 * @param {Number} n
	 * @returns {Number}
	 */
    modInverse: function (m, n) {
        // Find gcd
        const s = [];
        let b = n;

        while (m < 0) m+=n;

        while (b) {
            [m, b] = [b, m % b];
            s.push({ m, b });
        }

        // Find inverse
        if (m !== 1) {
            return NaN;
        } else {
            let x = 1;
            let y = 0;

            for (let i = s.length - 2; i >= 0; --i) {
                [x, y] = [y, x - y * Math.floor(s[i].m / s[i].b)];
            }

            return (y % n + n) % n;
        }
	},

    /**
     * Arrange sentence to bigram
     * @param {String} input
     * @returns {Array} - Array of alphabets in pair
     */
    bigram: function(input) {
        input = this.removeNonAlphabet(input);

        let pos = 0;
        let tempDigram = "";
        let out = [];

        while (pos < input.length) {
            if (tempDigram.length == 0) {
                tempDigram += input.charAt(pos);
            } else if (tempDigram.length == 1) {
                if (tempDigram.charAt(0) == input.charAt(pos)) {
                    tempDigram += "X";
                    pos--; // Stay at current position
                } else {
                    tempDigram += input.charAt(pos);
                    out.push(tempDigram);
                    tempDigram = "";
                }
            } else {
                out.push(tempDigram);
                tempDigram = "";
                tempDigram += input.charAt(pos);
            }

            // Check last bigram length
            if ((input.length % 2) != 0 && pos == (input.length - 1) && (tempDigram.length % 2) != 0) {
                tempDigram += "X";
                out.push(tempDigram);
            } else if (pos == (input.length - 1) && tempDigram.length != 0) {
                tempDigram = input.charAt(pos) + "X";
                out.push(tempDigram);
            }

            pos++;
        }

        return out;
    },

    /**
     * Splits the output into groups of n characters (n=5: ABCDEFG -> ABCDE FG)
     * @param {String} input
     * @returns {String}
     */
    formatOutput: function(input, n) {
        let out = "";
        for (let i=0; i<input.length; i+=n) {
            out += input.substr(i, n) + " ";
        }
        return out;
    }
}