/**
 * https://www.freecodecamp.org/espanol/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker
 * https://www.freecodecamp.org/espanol/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker
 * 
 * 
Comprobador de palíndromos

Devuelve true si la cadena proporcionada es un palíndromo. De lo contrario, devuelve false.

Un palíndromo es una palabra o frase que se escribe de la misma manera hacia adelante y hacia atrás, ignorando la puntuación, mayúsculas, minúsculas y espaciado.

Nota: Tendrás que eliminar todos los caracteres no alfanuméricos (puntuación, espacios y símbolos) y convertir todo en mayúsculas o minúsculas para comprobar si hay palíndromos.

Pasaremos cadenas con formatos variables, como racecar, RaceCar y race CAR entre otros.

También pasaremos cadenas con símbolos especiales, como 2A3*3a2, 2A3 3a2 y 2_A3*3#A2.
*/

const searchCharacter = (arrCharacters, indexStart, indexMakeCut) => {
  // deovlvemos el caracter, indexStart -> indica el caracter de inicio; arrCharacters.length - indexMakeCut -> indica cuál tomar.
  return arrCharacters.slice(indexStart, arrCharacters.length - indexMakeCut);
};

// funcion principal
function palindrome(str) {
  let strToLower = str.toLowerCase();
  let arr = strToLower.split("");

  // filtramos array de sólo letras y números
  let arrCharacters = arr.filter((item) => /[a-zA-Z0-9]/.test(item));

  // obtenemos mitad de la longitud
  let arrLengthCheck = parseInt(arrCharacters.length / 2);

  let isPalin = true;
  // para iniciar desde el último
  let indexStart = -1;
  // cantidad de elementos a tomar
  let indexMakeCut = 0;

  for (let i = 0; i < arrLengthCheck; i++) {
    // obtenemos uno por uno desde el último caracter
    let lastCharacterToCompare = searchCharacter(
      arrCharacters,
      indexStart,
      indexMakeCut
    );

    if (lastCharacterToCompare[0] !== arrCharacters[i]) {
      // son distintos
      isPalin = false;
      return isPalin;
    }

    indexStart--;
    indexMakeCut++;
  }
  // si todos fueron iguales, retornamos true
  return isPalin;
}

console.log(palindrome("eye"))


/**
PRUEBAS:

palindrome("eye") debe devolver un booleano.

palindrome("eye") debe devolver true.

palindrome("_eye") debe devolver true.

palindrome("race car") debe devolver true.

palindrome("not a palindrome") debe devolver false.

palindrome("A man, a plan, a canal. Panama") debe devolver true.

palindrome("never odd or even") debe devolver true.

palindrome("nope") debe devolver false.

palindrome("almostomla") debe devolver false.

palindrome("My age is 0, 0 si ega ym.") debe devolver true.

palindrome("1 eye for of 1 eye.") debe devolver false.

palindrome("0_0 (: /-\ :) 0-0") debe devolver true.

palindrome("five|\_/|four") debe devolver false.
*/
