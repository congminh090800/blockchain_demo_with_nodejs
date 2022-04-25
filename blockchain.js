const Block = require("./block");
const Transaction = require("./transaction");
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5; // number of zeros
    this.pendingTxs = [];
    this.miningReward = 10;
  }

  createGenesisBlock() {
    return new Block(Date.now(), "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
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

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;
