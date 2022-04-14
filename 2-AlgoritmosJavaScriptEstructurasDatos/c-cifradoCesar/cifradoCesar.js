/**
https://www.freecodecamp.org/espanol/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher

Cifrado César

Uno de los cifrados más simples y conocidos es el cifrado César, también conocido como cifrado por desplazamiento. En un cifrado por desplazamiento los significados de las letras se desplazan por una cantidad determinada.

Un uso moderno común es el cifrado ROT13, donde los valores de las letras son desplazados por 13 lugares. Así que A ↔ N, B ↔ O y así sucesivamente.

Escribe una función que reciba una cadena codificada en ROT13 como entrada y devuelva una cadena decodificada.

Todas las letras estarán en mayúsculas. No transformes ningún carácter no alfabético (espacios, puntuación, por ejemplo), pero si transmítelos.

*/

const searchLetter = (letter) => {
  // letras abcdario
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

  // mitad abcdario
  let startSearch = 13;
  // buscamos indice de la letra en abcdario
  let indexLetter = letters.indexOf(letter);

  // si indice es mayor a 13 -> retornamos letra cuya ubicacion es ( indexLetter - startSearch), ej, letter S -> indexLetter = 18, entonces 18 - 13 --> retornamos F, ya que letters[5] = F ; Sino, retornamos de la misma forma, pero de la otra mita, ej, letter: E -> indexLetter 4 --> letters[indexLetter (4) + startSearch (13)] = R
  return indexLetter >= 13
    ? letters[indexLetter - startSearch]
    : letters[indexLetter + startSearch];
};

function rot13(str) {
  //  ROT13, -> https://en.wikipedia.org/wiki/ROT13

  // Input	ABCDEFGHIJKLM NOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
  // Output	NOPQRSTUVWXYZ ABCDEFGHIJKLM nopqrstuvwxyzabcdefghijklm

  let strResult = "";

  // dividimos str en un array con las letras
  let arrStr = str.split("");

  for (let i = 0; i < arrStr.length; i++) {
    // nos interesa sólo letras (en mayusculas)
    if (/[A-Z]/.test(arrStr[i])) {
      // es letra, buscamos el reemplazo
      strResult += searchLetter(arrStr[i]);
    } else {
      // no es letra
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
