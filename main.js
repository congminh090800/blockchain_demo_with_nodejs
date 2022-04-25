const Blockchain = require("./blockchain");
const Transaction = require("./transaction");

const minerAddr = "minhlpc";

let blockchain = new Blockchain();
blockchain.createTx(new Transaction("address1", "address2", 100));
blockchain.createTx(new Transaction("address2", "address1", 10));

blockchain.minePendingTxsPool(minerAddr);

console.log(`Balance of ${minerAddr}: ${blockchain.getBalance(minerAddr)}`);

blockchain.minePendingTxsPool(minerAddr);

console.log(`Balance of ${minerAddr}: ${blockchain.getBalance(minerAddr)}`);
