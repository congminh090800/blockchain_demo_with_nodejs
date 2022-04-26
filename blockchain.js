const Block = require("./block");
const Transaction = require("./transaction");
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4; // number of zeros, the bigger the harder to solve the consensus
    this.pendingTxs = [];
    // amount of reward
    this.miningReward = 10;
  }

  createGenesisBlock() {
    return new Block(Date.now(), [], "0");
  }

  minePendingTxsPool(rewardAddress) {
    let block = new Block(Date.now(), this.pendingTxs);
    block.mineBlock(this.difficulty);
    console.log("Block mined: ", block.hash);
    this.chain.push(block);
    this.pendingTxs = [new Transaction(null, rewardAddress, this.miningReward)];
  }

  createTx(tx) {
    this.pendingTxs.push(tx);
  }

  getBalance(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAdress == address) {
          balance -= tx.amount;
        }
        if (tx.toAddress == address) {
          balance += tx.amount;
        }
      }
    }
    return balance;
  }
}

module.exports = Blockchain;
