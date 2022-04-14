/**
 * https://www.freecodecamp.org/espanol/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register
   
Caja registradora

Diseña una función checkCashRegister() que acepte el precio de compra como primer argumento (price), la cantidad pagada como segundo argumento (cash), y el dinero en efectivo que tiene la caja (cid) como tercer argumento.

cid es un arreglo 2D que enumera las monedas disponibles.

La función checkCashRegister() siempre debe devolver un objeto con una clave status y una clave change.

Devuelve {status: "INSUFFICIENT_FUNDS", change: []} si el efectivo en caja es menor que el cambio necesario, o si no puedes devolver el cambio exacto.

Devuelve {status: "CLOSED", change: [...]} si el efectivo en caja como valor de la clave change es igual al cambio que se debe entregar.

En cualquier otro caso, devuelve {status: "OPEN", change: [...]}, con el cambio a entregar en monedas y billetes, ordenados de mayor a menor, como valor de la clave change.

Unidad              Monetaria	    Importe

Penny	                $0.01       (PENNY)
Nickel              	$0.05       (NICKEL)
Dime                	$0.1        (DIME)
Quarter             	$0.25       (QUARTER)
Dollar              	$1          (ONE)
Five Dollars        	$5          (FIVE)
Ten Dollars	          $10         (TEN)
Twenty Dollars      	$20         (TWENTY)
One-hundred Dollars 	$100        (ONE HUNDRED)

A continuación, un ejemplo del efectivo en caja en formato de arreglo:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]

*/

const checkCoinsInBox = (change, minorsCoins) => {
  // recorremos todo el array de monedas que tenemos disponibles en caja
  for (let i = 0; i < minorsCoins.length; i++) {
    // cantidad de monedas que necesitaré de cada tipo
    let amountCoinsNeededForType = 0;

    // cantidad de monedas disponibles en caja
    let amountCoinsAvaible = minorsCoins[i][2];

    // condicion -> j no supera la cantidad que se dipone; y además, el cambio que resta saldar es mayor al valor de la moneda;
    for (
      let j = 0;
      j < amountCoinsAvaible && change >= minorsCoins[i][1];
      j++
    ) {
      change = Number((change - minorsCoins[i][1]).toFixed(2));
      amountCoinsNeededForType++;

      // corroboro el cambio a otorgar
      if (change === 0) {
        // llego al cambio justo con lo que dispongo en caja
        // inserto la cantidad de monedas en caja, del tipo que necesito para atender el cambio
        minorsCoins[i].push(amountCoinsNeededForType);
        return minorsCoins;
      } else if (change < 0) {
        // no llego al cambio justo con lo que dispongo en caja
        return false;
      }
    }
    // inserto la cantidad de monedas en caja, del tipo que necesito para atender el cambio
    if (amountCoinsNeededForType > 0)
      minorsCoins[i].push(amountCoinsNeededForType);
  }
};

function checkCashRegister(price, cash, cid) {
  // cambio que debo atender
  let change = cash - price;

  // obj a retornar
  let moneyBack = {
    status: "",
    change: [],
  };

  // array de monedas
  let coins = [];

  // corroboro efectivo total
  let efectTotal = cid
    .map((item) => coins.push(item[0]) && item[1])
    .reduce((acc, prev) => acc + prev, 0);

  // no dispongo de fondos en caja para solventar el cambio
  if (efectTotal < change) {
    moneyBack.status = "INSUFFICIENT_FUNDS";
    return moneyBack;
  }

  // fondos en caja es igual al cambio a solventar
  if (efectTotal === change) {
    moneyBack.status = "CLOSED";
    moneyBack.change = cid;
    return moneyBack;
  }

  // array monedas con respectivo importe (VALOR) de c/u
  let monetaryUnitAmount = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100],
  ];

  // cantidad de monedas disponibles en caja por tipo; changeCoinsByType=[NOMBRE_MONEDA, VALOR_MONEDA, CANTIDAD_MONEDAS_EN_CAJA]
  let changeCoinsByType = [];
  for (let i = 0; i < cid.length; i++) {
    changeCoinsByType.push([
      cid[i][0],
      monetaryUnitAmount[i][1],
      cid[i][1] / monetaryUnitAmount[i][1],
    ]);
  }

  // ordenamos de mayor a menor el array de monedas disponibles en caja, por valor de moneda - para ir retirando la cantidad que se necesita de cada una partiendo de la mayor
  changeCoinsByType.sort(function compareFunction(a, b) {
    return a[1] > b[1] ? -1 : 1;
  });

  // obtenemos sólo aquellas monedas que posiblemente podríamos usar para dar el cambio (no superan al cambio que tengo que atender)
  let minorsCoins = changeCoinsByType.filter((item) => item[1] <= change);

  // armamos array con la cantidad de monedas que se necesita de cada tipo para solventar el cambio a atender;
  // result = [ NOMBRE_MONEDA, VALOR_MONEDA, CANTIDAD_EN_CAJA, CANTIDAD_NECESARIA_PARA_SOLVENTAR_CAMBIO ]
  // O, si NO dispongo de la cantidad necesaria para solventar el cambio --> result = false
  let result = checkCoinsInBox(change, minorsCoins, changeCoinsByType);

  if (!result) {
    // no hay fondos suficientes
    moneyBack.status = "INSUFFICIENT_FUNDS";
  } else {
    // si hay fondos suficientes
    moneyBack.status = "OPEN";

    // filtramos elementos que tengan 4 indices (el 4to indice es cantidad necesaria -> element[3]);
    // Multiplicamos VALOR_MONEDA * CANTIDAD_NECESARIA_PARA_SOLVENTAR_CAMBIO
    let arrResult = result
      .map((element) => element[3] && [element[0], element[1] * element[3]])
      .filter((item) => item !== undefined);

    // añadimos el array obtenido a propiedad change de obj moneyBack
    moneyBack.change = arrResult;
  }

  // retornamos
  return moneyBack;
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);

/**
PRUEBAS:

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) debe devolver un objeto.

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) debe devolver {status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) debe devolver {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) debe devolver {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) debe devolver {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) debe devolver {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.

*/
