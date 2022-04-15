/**
https://www.freecodecamp.org/espanol/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher

Cifrado César

Uno de los cifrados más simples y conocidos es el cifrado César, también conocido como cifrado por desplazamiento. En un cifrado por desplazamiento los significados de las letras se desplazan por una cantidad determinada.

Un uso moderno común es el cifrado ROT13, donde los valores de las letras son desplazados por 13 lugares. Así que A ↔ N, B ↔ O y así sucesivamente.

Escribe una función que reciba una cadena codificada en ROT13 como entrada y devuelva una cadena decodificada.

Todas las letras estarán en mayúsculas. No transformes ningún carácter no alfabético (espacios, puntuación, por ejemplo), pero si transmítelos.

*/

const searchEncryptedLetter = (letter) => {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  let startSearch = 13;
  let indexLetter = letters.indexOf(letter);

  return indexLetter >= 13
    ? letters[indexLetter - startSearch]
    : letters[indexLetter + startSearch];
};

function rot13(str) {
  let strResult = "";

  let arrStr = str.split("");

  for (let i = 0; i < arrStr.length; i++) {
    if (/[A-Z]/.test(arrStr[i])) {
      strResult += searchEncryptedLetter(arrStr[i]);
    } else {
      strResult += arrStr[i];
    }
  }

  return strResult;
}

console.log(rot13("SERR PBQR PNZC"));

/**
PRUEBAS:

rot13("SERR PBQR PNZC");

rot13("SERR PBQR PNZC") debe decodificarse en la cadena FREE CODE CAMP

rot13("SERR CVMMN!") debe decodificarse en la cadena FREE PIZZA!

rot13("SERR YBIR?") debe decodificarse en la cadena FREE LOVE?

rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") debe decodificarse en la cadena THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.

*/
