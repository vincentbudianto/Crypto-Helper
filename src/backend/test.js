var string = require('./util/string')
var vigenere = require('./vigenere')
var fVigenere = require('./fullVigenere')
var aKeyVigenere = require('./autoKeyVigenere')

// console.log(string.removeNonAlphabet("aaSSnana78&&"));
// console.log(string.isString("aaSSnana78&&"));
// console.log(string.toNumbers("aaSSnana78&&"));
// console.log(string.isString(77));
console.log(vigenere.encrypt("I will find you", "C"));
console.log(vigenere.decrypt("KYKNNHKPFAQW", "C"));
console.log(fVigenere.encrypt("I will find you", "maybe"));
console.log(fVigenere.decrypt("IZXGRBBZNDFK", "maybe"));
console.log(aKeyVigenere.encrypt("negara penghasil minyak", "INDO"));
console.log(aKeyVigenere.decrypt("VRJOEEVEEGWEFOSMAVJMS", "INDO"));

