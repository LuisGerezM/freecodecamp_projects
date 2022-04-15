/***
 https://www.freecodecamp.org/espanol/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/roman-numeral-converter

Conversor de números romanos

Convierte el número proporcionado en un número romano.

Todos los números romanos deben proporcionarse en mayusculas.

*/

function convertToRoman(num) {
  let defaultRomanNums = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let strResult = "";

  for (let romanNumber in defaultRomanNums) {
    for (
      ;
      num >= defaultRomanNums[romanNumber];
      num -= defaultRomanNums[romanNumber]
    ) {
      strResult += romanNumber;
    }
  }

  return strResult;
}

console.log(convertToRoman(36));

/**
PRUEBAS:

convertToRoman(2) debe devolver la cadena II.

convertToRoman(3) debe devolver la cadena III.

convertToRoman(4) debe devolver la cadena IV.

convertToRoman(5) debe devolver la cadena V.

convertToRoman(9) debe devolver la cadena IX.

convertToRoman(12) debe devolver la cadena XII.

convertToRoman(16) debe devolver la cadena XVI.

convertToRoman(29) debe devolver la cadena XXIX.

convertToRoman(44) debe devolver la cadena XLIV.

convertToRoman(45) debe devolver la cadena XLV.

convertToRoman(68) debe devolver la cadena LXVIII

convertToRoman(83) debe devolver la cadena LXXXIII

convertToRoman(97) debe devolver la cadena XCVII

convertToRoman(99) debe devolver la cadena XCIX

convertToRoman(400) debe devolver la cadena CD

convertToRoman(500) debe devolver la cadena D

convertToRoman(501) debe devolver la cadena DI

convertToRoman(649) debe devolver la cadena DCXLIX

convertToRoman(798) debe devolver la cadena DCCXCVIII

convertToRoman(891) debe devolver la cadena DCCCXCI

convertToRoman(1000) debe devolver la cadena M

convertToRoman(1004) debe devolver la cadena MIV

convertToRoman(1006) debe devolver la cadena MVI

convertToRoman(1023) debe devolver la cadena MXXIII

convertToRoman(2014) debe devolver la cadena MMXIV

convertToRoman(3999) debe devolver la cadena MMMCMXCIX
 */
