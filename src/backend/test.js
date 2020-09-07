let string = require('./util/string')
let vigenere = require('./vigenere')
let fVigenere = require('./fullVigenere')
let aKeyVigenere = require('./autoKeyVigenere')
let eVigenere = require('./extendedVigenere')
let playfair = require('./playfair')
let sEncryption = require('./superEncryption')
let affine = require('./affine')
let hill = require('./hill')
let enigma = require("./enigma")
let math = require('mathjs')

// console.log("Vigenere :");
// console.log(vigenere.encrypt("I will find you", "C"));
// console.log(vigenere.decrypt("KYKNNHKPFAQW", "C"));
// console.log("\nFull Vigenere :");
// console.log(fVigenere.encrypt("I will find you", "maybe"));
// console.log(fVigenere.decrypt("IZXGRBBZNDFK", "maybe"));
// console.log("\nAuto-Key Vigenere :");
// console.log(aKeyVigenere.encrypt("negara penghasil minyak", "INDO"));
// console.log(aKeyVigenere.decrypt("VRJOEEVEEGWEFOSMAVJMS", "INDO"));
// console.log("\nExtended Vigenere :");
// console.log(eVigenere.encrypt([
//     110, 101, 103,  97, 114,  97,
//      32, 112, 101, 110, 103, 104,
//      97, 115, 105, 108,  32, 109,
//     105, 110, 121,  97, 107
//   ], "INDO"));
// console.log(eVigenere.decrypt([
//     183, 179, 171, 176, 187,
//     175, 100, 191, 174, 188,
//     171, 183, 170, 193, 173,
//     187, 105, 187, 173, 189,
//     194, 175, 175
//   ], "INDO"));
// console.log("\nPlayfair :");
// console.log(playfair.encrypt("temui ibu nanti malam", "JALAN GANESHA SEPULUH"));
// console.log(playfair.decrypt("ZB RS FY KU PG LG RK VS NL QV", "JALAN GANESHA SEPULUH"));
// console.log("\nSuper Encryption :");
// console.log(sEncryption.encrypt("temui ibu nanti malam", "ABCDEFGHIJ"));
// console.log(sEncryption.decrypt("TNNQ?FHUG?OBKT?XVP??MJE??", "ABCDEFGHIJ"));
// console.log("\nAffine :");
// console.log(affine.encrypt("kripto asik", "7 10"));
// console.log(affine.decrypt("CZOLNEKGOC", "7 10"));
console.log("\nHill :");
console.log(hill.encrypt("kriptografikk", "17 17 5 21 18 21 2 2 19"))
console.log(hill.decrypt("FIYYPWSYP", "17 17 5 21 18 21 2 2 19"))
// console.log("\nEnigma :");
// console.log(enigma.cipher("Halo Apa kabar", "A A A", "I|II|III", "Reflector B", ""))
// console.log(enigma.cipher("IDBMOUCZLKKL", "A A A", "I|II|III", "Reflector B", ""))
