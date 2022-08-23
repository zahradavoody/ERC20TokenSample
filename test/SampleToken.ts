import {expect} from "chai";
import hre, {contract, ethers, web3} from "hardhat";

describe("SampleToken", function () {
  describe("setTransferFeeRate", function() {
    it("Should check setTransferFeeRate method", async function () {
      const SampleToken = await hre.ethers.getContractFactory("SampleToken");
      const sampleToken = await SampleToken.deploy(10000000000);
      await sampleToken.setTransferFeeRate(15);
      expect(await sampleToken.transferFeeRate()).to.equal(15);

    })

    it("Should revert when transferFeeRate is <=0 or >=100", async function () {
      const SampleToken = await hre.ethers.getContractFactory("SampleToken");
      const sampleToken = await SampleToken.deploy(10000000);
      await expect(sampleToken.setTransferFeeRate(101)).to.be.revertedWith("wrong range: transferFeeRate is >=0 and <=100");
    })
    
  }); 

  describe("afterDeploy", function() {
    it("Should check default transferFeeRate is 10", async function(){
      const SampleToken = await hre.ethers.getContractFactory("SampleToken");
      const sampleToken = await SampleToken.deploy(10000000000);
      expect(await sampleToken.transferFeeRate()).to.equal(10);
    })

    it("Should check initialSupply is true", async function(){
      const initialSupply = 10000000000;
      const SampleToken = await hre.ethers.getContractFactory("SampleToken");
      const sampleToken = await SampleToken.deploy(initialSupply);
      const owner= await sampleToken.owner();
      expect(await sampleToken.balanceOf(owner)).to.be.equal(initialSupply);
    })

  });

  describe("transfer", async function(){
    it("Should transfer 90% tokens to receiver & 10% to owner", async function(){
    const initialSupply = 100;
    const SampleToken = await hre.ethers.getContractFactory("SampleToken");
    const sampleToken = await SampleToken.deploy(initialSupply);
    
    const [owner, account1, account2] = await ethers.getSigners();

    //Transfer 100 tokens from owner to account1
    await sampleToken.transfer(account1.address, 100);
    expect(await sampleToken.balanceOf(account1.address)).to.equal(90);
    expect(await sampleToken.balanceOf(owner.address)).to.equal(10);


    // Transfer 50 tokens from account1 to account2
    await sampleToken.connect(account1).transfer(account2.address, 50);
    expect(await sampleToken.balanceOf(account1.address)).to.equal(40);
    expect(await sampleToken.balanceOf(account2.address)).to.equal(45);
    expect(await sampleToken.balanceOf(owner.address)).to.equal(15);
    
    })

  });

  
});
