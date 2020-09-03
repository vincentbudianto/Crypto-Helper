/* All string-related utility function is stored here*/
var a = "A";

module.exports = {
    /**
     * Removes all non alphabet (including spaces & newlines)
     * @param {String} input 
     * @returns {String}
     */
    removeNonAlphabet : function (input) {
        return input.replace(/[^a-zA-z]/gi, '');
    },
    isString : function (input) {
        return ((typeof input) == "string");
    },
    /**
     * Converts all alphabet to its order in alphabet (e.g. J -> 10)
     * @param {String} input - All characters must be upper case alphabet
     * @returns {Array} - Array of order numbers
     */
    toNumbers : function (input) {
        input = this.removeNonAlphabet(input);
        input = input.toUpperCase();
        let out = [];
        for (var i = 0; i < input.length; i++) {
            out.push(input.charCodeAt(i) - a.charCodeAt(0));
        }
        return out;
    },
    /**
     * Converts all number order in alphabet to alphabet (e.g. 10 -> J)
     * @param {Array} input - Array of order numbers
     */
    toAlphabet : function (input) {
        let out = "";
        for (var i = 0; i < input.length; i++) {
            out += String.fromCharCode(input[i] + a.charCodeAt(0));
        }
        return out;
    }
}