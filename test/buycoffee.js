const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BuyCoffee", function () {
  let buyCoffee;
  let owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const BuyCoffee = await ethers.getContractFactory("BuyCoffee");
    buyCoffee = await BuyCoffee.deploy();
    await buyCoffee.deployed();
  });

  describe("Deployments", async () => {
    it("Should set the owner", async () => {
      const result = await buyCoffee.getOwner();
      expect(result).to.equal(await owner.address);
    });
  });

  describe("BuyCoffe", async () => {
    beforeEach(async () => {
      const amountInEther = ethers.utils.parseEther("1");
      const buy = await buyCoffee.buyCoffee("Aman", "Hello", {
        value: amountInEther,
        gasLimit: 3000000,
      });
      await buy.wait();
    });

    it("Should set the name & message", async () => {
      const result = await buyCoffee.getMemos();

      expect(result.length).to.equal(1);
      expect(result[0].name).to.equal("Aman");
      expect(result[0].message).to.equal("Hello");
    });
  });

  describe("Withdraw", async () => {
    const beforeBalance = await ethers.provider.getBalance(owner.address);

    it("Should increase the owner balance", async () => {
      const Withdraw = await withdrawTips();
      const afterBalance = await ethers.provider.getBalance(owner.address);
      expect(afterBalance).greaterThan(beforeBalance);
    });
  });
});
