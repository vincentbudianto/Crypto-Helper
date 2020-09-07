import React from 'react';
import { string } from 'mathjs';

let str = require("./util/string")
let vigenere = require("./vigenere");
let fVigenere = require("./fullVigenere");
let aKeyVigenere = require("./autoKeyVigenere");
let eVigenere = require("./extendedVigenere");
let playfair = require("./playfair");
let sEncryption = require("./superEncryption");
let affine = require("./affine");
let hill = require("./hill");
let enigma = require("./enigma");

let basicAlgorithms = [
    ["vigenere" ,vigenere],
    ["full vigenere",fVigenere],
    ["auto-Key vigenere", aKeyVigenere],
    ["super encryption", sEncryption]]

function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

test.each(basicAlgorithms)(
    'Encrypt/Decrypt of %s',
    (str, algorithm) => {
      let plaintext = makeid(20);
      let key = makeid(8);
      let cipher = algorithm.encrypt(plaintext, key);

      expect(algorithm.decrypt(cipher, key)).toBe(plaintext.toUpperCase());
})

test('Encrypt/Decrypt of extended vigenere', () => {
    let plaintext = [];

    for (let i = 0; i < Math.floor(Math.random() * 200 + 1); i++) {
        plaintext.push(str.toNumbers(makeid(1)));
    }

    let key = makeid(8);
    let cipher = eVigenere.encrypt(plaintext, key);

    expect(eVigenere.decrypt(cipher, key)).toBe(plaintext);
})

// test('Encrypt/Decrypt of playfair', () => {
//     let plaintext = str.removeDuplicates(makeid(20));
//     let key = makeid(8);

//     while (plaintext.length % 2 != 0) {
//         plaintext = str.removeDuplicates(makeid(20));
//     }

//     let cipher = playfair.encrypt(plaintext, key);

//     expect(playfair.decrypt(cipher, key)).toBe(plaintext.toUpperCase());
// })

// test('Encrypt/Decrypt of affine', () => {
//     let plaintext = makeid(20);
//     let [a, b] = [Math.floor(Math.random() * 200 + 1), Math.floor(Math.random() * 200 + 1)];

//     while (isNaN(str.modInverse(a, 26))) {
//         [a, b] = [Math.floor(Math.random() * 200 + 1), Math.floor(Math.random() * 200 + 1)];
//     }

//     let key = a + " " + b;
//     let cipher = affine.encrypt(plaintext, key);

//     expect(affine.decrypt(cipher, key)).toBe(plaintext.toUpperCase());
// })

// test('Encrypt/Decrypt of hill', () => {
//     let plaintext = makeid(20);
//     let key = Math.floor(Math.random() * 200 + 1).toString();

//     for (let i = 0; i < 8; i++) key += " " + Math.floor(Math.random() * 200 + 1).toString();

//     let cipher = hill.encrypt(plaintext, key);

//     // while (plaintext.length < cipher.length) plaintext += "?";

//     expect(hill.decrypt(cipher, key)).toBe(plaintext.toUpperCase());
// })

test('Encrypt/Decrypt of enigma', () => {
    let plaintext = makeid(20);
    let key = makeid(8);
    let rotors = "I II III IV V VI VII VIII";
    let reflector = "Reflector B";
    let plug = "";
    let cipher = enigma.cipher(plaintext, key, rotors, reflector, plug);

    expect(enigma.cipher(cipher, key, rotors, reflector, plug)).toBe(plaintext.toUpperCase());
})
