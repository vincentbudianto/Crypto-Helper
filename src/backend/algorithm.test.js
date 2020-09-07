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

let basicAlgorithms = [[ "vigenere" ,vigenere ], [ "fVig",fVigenere ], 
[ "aKeyVig", aKeyVigenere]]

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

test.each(basicAlgorithms)(
    'Encrypt/Decrypt of %s',
    (str, algorithm) => {
      let plaintext = makeid(20)
      let key = makeid(8)

      let cipher = algorithm.encrypt(plaintext, key)
      expect(algorithm.decrypt(cipher, key)).toBe(plaintext.toUpperCase());
});

// test('Encrypt/Decrypt of affine', () => {
//     let plaintext = makeid(20)
//     let [a, b] = [Math.floor(Math.random() * 200 + 1), Math.floor(Math.random() * 200 + 1)];
//     while (str.modInverse(a, 26) === NaN || str.modInverse(b, 26) === NaN) {
//         [a, b] = [Math.floor(Math.random() * 200 + 1), Math.floor(Math.random() * 200 + 1)];
//     }
//     let key = a + " " + b;
//     console.log(key);

//     let cipher = affine.encrypt(plaintext, key)
//     expect(affine.decrypt(cipher, key)).toBe(plaintext.toUpperCase());
// })

// test('Encrypt/Decrypt of hill', () => {
//     let plaintext = makeid(20)
//     let key = Math.floor(Math.random() * 200 + 1).toString();
//     for (let i = 0; i < 8; i++) key += " " + Math.floor(Math.random() * 200 + 1).toString();
//     console.log(key);

//     let cipher = hill.encrypt(plaintext, key)
//     while (plaintext.length < cipher.length) plaintext += "A";
//     expect(hill.decrypt(cipher, key)).toBe(plaintext.toUpperCase());
// })