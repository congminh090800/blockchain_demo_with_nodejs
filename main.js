const Blockchain = require("./blockchain");
const Transaction = require("./transaction");

const minerAddr = "minhlpc(miner)";
const andy = "andy";
const lisa = "lisa";
let blockchain = new Blockchain();
// stimulate 2 transactions
blockchain.createTx(new Transaction(andy, lisa, 100));
blockchain.createTx(new Transaction(lisa, andy, 10));

blockchain.minePendingTxsPool(minerAddr);
console.log(`Balance of ${minerAddr}: ${blockchain.getBalance(minerAddr)}`);

// balance of miner will be update until the next block is mined
blockchain.minePendingTxsPool(minerAddr);
console.log(`Balance of ${andy}: ${blockchain.getBalance(andy)}`);
console.log(`Balance of ${lisa}: ${blockchain.getBalance(lisa)}`);
console.log(`Balance of ${minerAddr}: ${blockchain.getBalance(minerAddr)}`);
