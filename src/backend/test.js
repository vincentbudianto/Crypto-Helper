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
let fs = require('fs');

let text = "";
let plaintext = "";
let ciphertext = "";
let filename = "";
let plainfile = [];
let cipherfile = [];
let key = "";
let rotors = "";
let wheel = "";
let wiring = "";

console.log("  <<<<<< CIPHER ALGORITHM RESULT >>>>>>");

console.log("\n  Vigenere Standard");
text = "I will find you";
key = "K";
ciphertext = vigenere.encrypt(text, key);
plaintext = vigenere.decrypt(ciphertext, key);

console.log("       input :", text)
console.log("         key :", key)
console.log("");
console.log("  encryption :", ciphertext)
console.log("  decryption :", plaintext)

console.log("\n  Full Vigenere Cipher ");
text = "You cant find me";
key = "maybe";
ciphertext = fVigenere.encrypt(text, key);
plaintext = fVigenere.decrypt(ciphertext, key);

console.log("       input :", text)
console.log("         key :", key)
console.log("");
console.log("  encryption :", ciphertext)
console.log("  decryption :", plaintext)

console.log("\n  Auto-Key Vigenere Cipher");
text = "negara penghasil minyak";
key = "INDONESIA";
ciphertext = aKeyVigenere.encrypt(text, key);
plaintext = aKeyVigenere.decrypt(ciphertext, key);

console.log("       input :", text)
console.log("         key :", key)
console.log("");
console.log("  encryption :", ciphertext)
console.log("  decryption :", plaintext)

console.log("\n  Playfair Cipher");
text = "temui ibu nanti malam";
key = "JALAN GANESHA SEPULUH";
ciphertext = playfair.encrypt(text, key);
plaintext = playfair.decrypt(ciphertext, key);

console.log("       input :", text)
console.log("         key :", key)
console.log("");
console.log("  encryption :", ciphertext)
console.log("  decryption :", plaintext)

console.log("\n  Super Encryption");
text = "temui bapak besok pagi segera ya";
key = "ABCDEFGHIJjihgfedcba";
ciphertext = sEncryption.encrypt(text, key);
plaintext = sEncryption.decrypt(ciphertext, key);

console.log("       input :", text)
console.log("         key :", key)
console.log("");
console.log("  encryption :", ciphertext)
console.log("  decryption :", plaintext)

console.log("\n  Affine Cipher");
text = "kripto asik";
key = "7 10";
ciphertext = affine.encrypt(text, key);
plaintext = affine.decrypt(ciphertext, key);

console.log("       input :", text)
console.log("         key :", key)
console.log("");
console.log("  encryption :", ciphertext)
console.log("  decryption :", plaintext)

console.log("\n  Hill Cipher ");
text = "kriptografika";
key = "17 17 5 21 18 21 2 2 19";
ciphertext = hill.encrypt(text, key);
plaintext = hill.decrypt(ciphertext, key);

console.log("       input :", text)
console.log("         key :", key)
console.log("");
console.log("  encryption :", ciphertext)
console.log("  decryption :", plaintext)

console.log("\n  Enigma Cipher ");
text = "Halo Apa kabar kalian semua apakah baik baik saja";
key = "ABCDEFGH";
rotors = "I II III IV V VI VII VIII";
wheel = "Reflector B";
wiring = "ab km ju bw zh";
ciphertext = enigma.cipher(text, key, rotors, wheel, wiring);
plaintext = enigma.cipher(ciphertext, key, rotors, wheel, wiring);

console.log("       input :", text)
console.log("         key :", key)
console.log("      rotors :", rotors)
console.log("   reflector :", wheel)
console.log("      wiring :", wiring)
console.log("");
console.log("  encryption :", ciphertext)
console.log("  decryption :", plaintext)

console.log("\n  Extended Vigenere Cipher");
filename = "src/logo.png";
key = "enkripsi file";

fs.readFile(filename, function (err, file) {
  if (err) throw err;

  const typedArray = new Uint8Array(file);
  const array = [...typedArray];

  cipherfile = eVigenere.encrypt(array, key);
  plainfile = eVigenere.decrypt(cipherfile, key);

  console.log("    filename :", filename);
  console.log("       input :", array);
  console.log("         key :", key);
  console.log("");
  console.log("  encryption :", cipherfile);
  console.log("  decryption :", plainfile);
  console.log("\n  <<<<<< CIPHER ALGORITHM RESULT >>>>>>");
});

