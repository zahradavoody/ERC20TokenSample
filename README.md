# Sample ERC20 Project

This project demonstrates a sample ERC20 smart contract. It comes with tests for that contract and a script that deploys that contract.
In this smart contract 10 percent of transfer amount will be sent to the contract  owner for every transfer.

### Compile Project  
```shell
npx hardhat compile
```  

### Run Tests  
```shell
npx hardhat test
```

### Deploy Contract  
```shell
npx hardhat run scripts/deploy.ts
```  

_This contract is deployed on ropsten test network at **[0x34394019526Be48fcCF6bFD549f7f133Ff29f2D1](https://ropsten.etherscan.io/address/0x34394019526Be48fcCF6bFD549f7f133Ff29f2D1)**_
  

