let string = require('./util/string')
let vigenere = require('./vigenere')
let fVigenere = require('./fullVigenere')
let aKeyVigenere = require('./autoKeyVigenere')
let playfair = require('./playfair')
var eVigenere = require('./extendedVigenere')

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
console.log(eVigenere.encrypt([
    110, 101, 103,  97, 114,  97,
     32, 112, 101, 110, 103, 104,
     97, 115, 105, 108,  32, 109,
    105, 110, 121,  97, 107
  ], "INDO"));
console.log(eVigenere.decrypt([
    183, 179, 171, 176, 187,
    175, 100, 191, 174, 188,
    171, 183, 170, 193, 173,
    187, 105, 187, 173, 189,
    194, 175, 175
  ], "INDO"));
