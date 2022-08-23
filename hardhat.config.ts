import {HardhatUserConfig, task} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-truffle5";
import "@nomicfoundation/hardhat-chai-matchers";

require('dotenv').config();
const {ROPSTEN_URL, RINKEBY_URL, PRIVATE_KEY} = process.env;


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  mocha: {
    timeout: 400000
  },
  networks: {
    hardhat: {
    },
    ganache: {
      timeout: 1000000,
      url: "http://0.0.0.0:7545",
      accounts: ["5c11f6503e03bdd2018bc2800de2f88e4827836999ed53afef9b475a3cc31196", "eb5069a8603e52e15d2f170c03c84921362fea70719fada099700e13907c1ef8"],
      gasPrice: 5000000000,
    },
    rinkeby: {
      gasPrice: 40000000000,
      url: RINKEBY_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
    ropsten: {
      gasPrice: 40000000000,
      url: ROPSTEN_URL,
      accounts: [`${PRIVATE_KEY}`],
    }
  },
  etherscan: {
    apiKey: '48KNX1MVPM72747KJ9Q813V878A22B67DD'
  }
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

export default config;
