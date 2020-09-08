<h1 align="center">
    <b>
        <br>
        Tugas Kecil 1 IF4020 Kriptografi
        <br>
    </b>
</h1>

<h2 align="center">
    <b>
        Crypto Helper
        <br>
        <br>
    </b>
</h2>

## Deskripsi Singkat
Membuat sebuah program yang mengimplementasikan:

<ol>
    <li>
        Vigenere Cipher standard (26 huruf alfabet)
    </li>
    <li>
        Varian Vigenere Cipher (26 huruf alfabet):
        <ul>
            <li>Full Vigenere Cipher</li>
            <li>Auto-key Vigenere Cipher</li>
        </ul>
    </li>
    <li>Extended Vigenere Cipher (256 karakter ASCII)</li>
    <li>Playfair Cipher (26 huruf alfabet)</li>
    <li>Super enkripsi: Vigenere Cipher standard + cipher transposisi (bebas). Jelaskan cipher transposisi yang dibuat.</li>
    <li>Affine cipher (26 huruf alfabet)</li>
    <li>Hill cipher (26 huruf alfabet)</li>
    <li>Bonus: Enigma cipher (26 huruf alfabet)</li>
</ol>

dengan spesifikasi sebagai berikut:
<ol>
    <li>Program dapat menerima pesan berupa file sembarang (file text maupun file biner) atau pesan yang diketikkan dari papan-ketik.</li>
    <li>Program dapat mengenkripsi plainteks. Khusus untuk Vigenere Cipher dengan 26 huruf alfabet dan Playfair Cipher dengan 26 huruf alfabet, program hanya mengenkripsi karakter alfabet saja. Angka, spasi, dan tanda baca dibuang.</li>
    <li>Program dapat mendekripsi cipherteks menjadi plainteks semula.</li>
    <li>Untuk pesan berupa text, program dapat menampilkan plainteks dan cipherteks di layar.</li>
    <li>Untuk plainteks berupa text, cipherteks dapat ditampilkan ke layar dalam bentuk:
        <ul>
            <li>tanpa spasi</li>
            <li>dalam kelompok 5-huruf</li>
        </ul>
    </li>
    <li>Program dapat menyimpan cipherteks ke dalam file.</li>
    <li>Kunci dimasukkan oleh pengguna. Panjang kunci bebas.</li>
    <li>Untuk enkripsi plainteks sembarang file (khusus untuk extended Vigenere Cipher), setiap file diperlakukan sebagai file of bytes. Program membaca setiap byte di dalam file (termasuk byte-byte header file) dan mengenkripsinya. Hanya saja file yang sudah terenkripsi tidak bisa dibuka oleh program aplikasinya karena header file ikut terenkripsi. Namun dengan mendekripsinya kembali maka file tersebut dapat dibuka oleh aplikasinya.</li>
</ol>

## Tabel Fitur
| No | Feature                     | Success (✔) | Fail (❌) | Details |
|:--:|:----------------------------|:------------|:----------|:--------|
|  1 | Vigenere Cipher             | ✔           |           |         |
|  2 | Full Vigenere Cipher        | ✔           |           |         |
|  3 | Auto-Key Vigenere Cipher    | ✔           |           |         |
|  4 | Extended Vigenere Cipher    | ✔           |           |         |
|  5 | Playfair Cipher             | ✔           |           | perlu dilakukan post-processing untuk membuang huruf X tidak terpakai |
|  6 | Super Encryption            | ✔           |           |         |
|  7 | Affine Cipher               | ✔           |           |         |
|  8 | Hill Cipher (matriks 3 x 3) | ✔           |           |         |
|  9 | Enigma Cipher               | ✔           |           | ring setting tidak dapat diubah |

<br>

## Screenshot

### Front page & Theme
- Light mode
![light front page](./doc/frontPageLight.png)
- Dark mode
![dark front page](./doc/frontPageDark.png)

### Page
- Encryption
![encryption page](./doc/encryption.png)
- Decryption
![decryption page](./doc/decryption.png)
- Enigma machine
![enigma machine page](./doc/enigma.png)

### Vigenere Cipher
- Encryption input
![inputEncryption](./doc/vigEncrypt.png)
- Encryption output
![outputEncryption](./doc/vigEncryptResult.png)
- Decryption input
![inputDecryption](./doc/vigDecrypt.png)
- Decryption output
![outputDecryption](./doc/vigDecryptResult.png)

### Full Vigenere Cipher
- Encryption input
![inputEncryption](./doc/fVigEncrypt.png)
- Encryption output
![outputEncryption](./doc/fVigEncryptResult.png)
- Decryption input
![inputDecryption](./doc/fVigDecrypt.png)
- Decryption output
![outputDecryption](./doc/fVigDecryptResult.png)

### Auto-Key Vigenere Cipher
- Encryption input
![inputEncryption](./doc/aKeyVigEncrypt.png)
- Encryption output
![outputEncryption](./doc/aKeyVigEncryptResult.png)
- Decryption input
![inputDecryption](./doc/aKeyVigDecrypt.png)
- Decryption output
![outputDecryption](./doc/aKeyVigDecryptResult.png)

### Extended Vigenere Cipher (using image file)
- Input file
![inputFile](./doc/eVigFile.png)
- Encryption file input
![inputEncryption](./doc/eVigEncryptInput.png)
- Encryption
![encryption](./doc/eVigEncrypt.png)
- Encrypted file download
![outputEncryption](./doc/eVigEncryptResult.png)
- Encrypted file
![encryptedFile](./doc/eVigFileEncrypted.png)
- Decryption file input
![inputDecryption](./doc/eVigDecryptInput.png)
- Decryption
![decryption](./doc/eVigDecrypt.png)
- Decryption file download
![outputDecryption](./doc/eVigDecryptResult.png)
- Decrypted File
![decryptedFile](./doc/eVigFileDecrypted.png)

### Playfair Cipher
- Encryption input
![inputEncryption](./doc/playfairEncrypt.png)
- Encryption output
![outputEncryption](./doc/playfairEncryptResult.png)
- Decryption input
![inputDecryption](./doc/playfairDecrypt.png)
- Decryption output
![outputDecryption](./doc/playfairDecryptResult.png)

### Super Cipher (using text file)
- Encryption input
![inputEncryption](./doc/sCipherEncrypt.png)
- Encryption output
![outputEncryption](./doc/sCipherEncryptResult.png)
- Encryption download
![downloadEncryption](./doc/sCipherEncryptFile.png)
- Decryption input
![inputDecryption](./doc/sCipherDecrypt.png)
- Decryption output
![outputDecryption](./doc/sCipherDecryptResult.png)
- Decryption download
![downloadDecryption](./doc/sCipherDecryptFile.png)
- Input files, encrypted files and decrypted files
![files](./doc/sCipherFile.png)

### Affine Cipher
- Encryption input
![inputEncryption](./doc/affineEncrypt.png)
- Encryption output
![outputEncryption](./doc/affineEncryptResult.png)
- Decryption input
![inputDecryption](./doc/affineDecrypt.png)
- Decryption output
![outputDecryption](./doc/affineDecryptResult.png)

### Hill Cipher
- Encryption input
![inputEncryption](./doc/hillEncrypt.png)
- Encryption output
![outputEncryption](./doc/hillEncryptResult.png)
- Decryption input
![inputDecryption](./doc/hillDecrypt.png)
- Decryption output
![outputDecryption](./doc/hillDecryptResult.png)

### Enigma Cipher
- Encryption input
![inputEncryption](./doc/enigmaEncrypt.png)
- Encryption output
![outputEncryption](./doc/enigmaEncryptResult.png)
- Decryption input
![inputDecryption](./doc/enigmaDecrypt.png)
- Decryption output
![outputDecryption](./doc/enigmaDecryptResult.png)

<br>

## Sources
- Theme switch button created by [Raunaq Chawchan](https://codepen.io/_Raunaq_)
- Icon and logo from [pngio](https://pngio.com/images/png-a1742084.html)

<p align="center">
    <b>
        <br>
        <font size="6">
            About
        </font>
    </b>
</p>

<p align="center">
    <b>
        IF4020-Kriptografi - 2020
        <br>
        Teknik Informatika 2017
        <br>
        <br>
        13517020 - T. Antra Oksidian Tafly
        <br>
		13517137 - Vincent Budianto
    </b>
</p>