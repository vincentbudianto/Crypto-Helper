/* All string-related utility function is stored here*/
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
        return input.replace(/[^a-zA-Z]/gi, '');
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
        // input = input.toUpperCase();

        let out = [];

        for (let i = 0; i < input.length; i++) {
            out.push(input.charCodeAt(i) - a.charCodeAt(0));
        }

        return out;
    },

    /**
     * Converts all alphabet to ASCII
     * @param {String} input - All characters must be upper case alphabet
     * @returns {Array} - Array of order numbers
     */
    toASCII : function (input) {
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
            out += String.fromCharCode(input[i] + a.charCodeAt(0));
        }

        return out;
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
    removeLetter : function (input, letter) {
        let out = "";
        for (var i = 0; i < input.length; i++) {
            if (input[i] != letter)
            out += input[i];
        }
        return out;
    }
}