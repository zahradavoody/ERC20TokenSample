import { ethers } from "hardhat";

async function main() {
  const SampleToken = await ethers.getContractFactory("SampleToken");

  // Start deployment, returning a promise that resolves to a contract object
  // @ts-ignore
  const instance = await SampleToken.deploy(100000000); // Instance of the contract
  await instance.deployed();

  console.log("Contract deployed to address:", instance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
