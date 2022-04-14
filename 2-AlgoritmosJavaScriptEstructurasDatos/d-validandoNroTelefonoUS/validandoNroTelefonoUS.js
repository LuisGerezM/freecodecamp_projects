/**
 * https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator
 * 
 * 
Validador de números telefónicos

Devuelve true si la cadena pasada concuerda con un número de teléfono válido en Estados Unidos.

El usuario puede completar el campo del formulario de la forma que elija, siempre que tenga el formato de un número estadounidense válido. Los siguientes ejemplos son de formatos válidos para números estadounidenses (consulte las pruebas a continuación para otras variantes):

555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555

Para este desafío se te presentará una cadena como 800-692-7753 o 8oo-six427676;laskdjf. Tu trabajo es validar o rechazar el número de teléfono estadounidense basado en cualquier combinación de los formatos proporcionados arriba. El código de área es obligatorio. Si el código de país es proporcionado, debes confirmar que el código de país es 1. Devuelve true si la cadena es un número de teléfono estadounidense valido; de lo contrario devuelve false.

*/

function telephoneCheck(str) {
  let resBool = false;

  // patron sin parentesis
  let patternWithoutParentheses =
    /^[1]?(\s)*(\d{3})+[-|\s]*(\d{3})+[-|\s]*\d{4}$/;

  // patron con parentesis
  let patternWithParentheses =
    /^[1]?(\s)*[\(]+(\d{3})+[\)]+[-|\s]*(\d{3})+[-|\s]*\d{4}$/;

  // ^[1]? ---> ?: El carácter anterior puede aparecer una sola vez o no aparecer ;;;  ^: ponerlo dentro del corchete [^] significa que	No exista cualquiera de los caracteres del interior de los corchetes, pero como lo ponemos AFUERA, quiere decir que no exista ningún otro número que NO sea el 1, y si APARECE, como le pusimos '?' sólo será 1 vez. ;;;
  // (\s)* ---> *: puede no aparecer, o puede aparecer 1 o muchas veces. ;;; \s: espacio en blanco
  // (\d{3})+ ---> +: puede aparecer 1 o muchas veces. ;;; \d{3}: digito de 3 números
  // [-|\s]* ---> * y \s: ya mencionado ;;; |: OR ;;; -: que tenga un guión '-'
  // $ ---> con lo que debe terminar el str ;;; (en este caso con un nro de 4 digitos)

  if (patternWithoutParentheses.test(str)) return (resBool = true);
  if (patternWithParentheses.test(str)) return (resBool = true);

  return resBool;
}

console.log(telephoneCheck("555-555-5555"));

/**
PRUEBAS:

telephoneCheck("555-555-5555") should return a boolean.

telephoneCheck("1 555-555-5555") should return true.

telephoneCheck("1 (555) 555-5555") should return true.

telephoneCheck("5555555555") should return true.

telephoneCheck("555-555-5555") should return true.

telephoneCheck("(555)555-5555") should return true.

telephoneCheck("1(555)555-5555") should return true.

telephoneCheck("555-5555") should return false.

telephoneCheck("5555555") should return false.

telephoneCheck("1 555)555-5555") should return false.

telephoneCheck("1 555 555 5555") should return true.

telephoneCheck("1 456 789 4444") should return true.

telephoneCheck("123**&!!asdf#") should return false.

telephoneCheck("55555555") should return false.

telephoneCheck("(6054756961)") should return false.

telephoneCheck("2 (757) 622-7382") should return false.

telephoneCheck("0 (757) 622-7382") should return false.

telephoneCheck("-1 (757) 622-7382") should return false.

telephoneCheck("2 757 622-7382") should return false.

telephoneCheck("10 (757) 622-7382") should return false.

telephoneCheck("27576227382") should return false.

telephoneCheck("(275)76227382") should return false.

telephoneCheck("2(757)6227382") should return false.

telephoneCheck("2(757)622-7382") should return false.

telephoneCheck("555)-555-5555") should return false.

telephoneCheck("(555-555-5555") should return false.

telephoneCheck("(555)5(55?)-5555") should return false.

telephoneCheck("55 55-55-555-5") should return false.

telephoneCheck("11 555-555-5555") should return false.
*/
