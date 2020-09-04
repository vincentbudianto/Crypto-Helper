let string = require('./util/string')
let vigenere = require('./vigenere')
let fVigenere = require('./fullVigenere')
let aKeyVigenere = require('./autoKeyVigenere')
let playfair = require('./playfair')

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
console.log(playfair.encrypt("temui ibu nanti malam", "JALAN GANESHA SEPULUH"));
console.log(playfair.decrypt("ZB RS FY KU PG LG RK VS NL QV", "JALAN GANESHA SEPULUH"));

