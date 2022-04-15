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

const checkCoinsInBox = (change, moneyNotExceedChange) => {

  for (let i = 0; i < moneyNotExceedChange.length; i++) {

    let amountCoinsNeededForType = 0;
    let amountCoinsAvaible = moneyNotExceedChange[i][2];

    for (let j = 0; j < amountCoinsAvaible && change >= moneyNotExceedChange[i][1]; j++ ) {

      change = Number((change - moneyNotExceedChange[i][1]).toFixed(2));

      amountCoinsNeededForType++;

      if (change === 0) {
      
        moneyNotExceedChange[i].push(amountCoinsNeededForType);
        return moneyNotExceedChange;

      } else if (change < 0) {
        return false;
      }
    }

    if (amountCoinsNeededForType > 0)
      moneyNotExceedChange[i].push(amountCoinsNeededForType);
  }
};

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let coins = [];
  let changeToReturn = {
    status: "",
    change: [],
  };

  let totalCash = cid
    .map((item) => coins.push(item[0]) && item[1])
    .reduce((acc, prev) => acc + prev, 0);

  if (totalCash < change) {
    changeToReturn.status = "INSUFFICIENT_FUNDS";
    return changeToReturn;
  }

  if (totalCash === change) {
    changeToReturn.status = "CLOSED";
    changeToReturn.change = cid;
    return changeToReturn;
  }

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

  let changeCashByType = [];
  for (let i = 0; i < cid.length; i++) {
    changeCashByType.push([
      cid[i][0],
      monetaryUnitAmount[i][1],
      cid[i][1] / monetaryUnitAmount[i][1],
    ]);
  }

  changeCashByType.sort(function compareFunction(a, b) {
    return a[1] > b[1] ? -1 : 1;
  });

  let moneyNotExceedChange = changeCashByType.filter(
    (item) => item[1] <= change
  );

  let numberMoneyNeededByType = checkCoinsInBox( change, moneyNotExceedChange, changeCashByType );

  if (!numberMoneyNeededByType) {
    changeToReturn.status = "INSUFFICIENT_FUNDS";

  } else {

    changeToReturn.status = "OPEN";

    let arrMoneyWithChange = numberMoneyNeededByType
      .map((element) => element[3] && [element[0], element[1] * element[3]])
      .filter((item) => item !== undefined);

    changeToReturn.change = arrMoneyWithChange;
  }

  return changeToReturn;
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
