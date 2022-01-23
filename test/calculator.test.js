const CalculatorContract = artifacts.require("./calculator.sol");
const TruffleAssert = require('truffle-assertions');

contract("The calculator", accounts => {
    let calculator;

    before("deployment", async () =>{
        calculator = await CalculatorContract.deployed();
    });

    afterEach("delete storage", async () => {
        await calculator.deleteStoredValue();
    });

    it("adds two given numbers", async () => {
        let result = await calculator.add(2, 5);
        assert.equal(result, 7);
    });

    it("subtracts two given numbers", async () => {
        let result = await calculator.subtract(4, 2);
        assert.equal(result, 2);
    });

    it("multiplies two given numbers", async () => {
        let result = await calculator.multiply(4, 2);
        assert.equal(result, 8);
    });

    it("divides two given numbers", async () => {
        let result = await calculator.divide(4, 2);
        assert.equal(result, 2);
    });

    it("calculates the factorial of a given number", async () => {
        let result = await calculator.factorial(5);
        assert.equal(result, 120);
    });

    it("sets value by owner on chain", async () => {
        await calculator.setValueByOwner(23, {from: accounts[0]});
        let firstAccountValue = await calculator.getStoredValue({from: accounts[0]});
        let secondAccountValue = await calculator.getStoredValue({from: accounts[1]});
        assert.equal(firstAccountValue, 23);
        assert.equal(secondAccountValue, 0);
    });

    it("adds a given value to the stored value", async () => {
        await calculator.setValueByOwner(22, {from: accounts[0]});
        let result = await calculator.addStoredValue(5, {from: accounts[0]});
        assert.equal(result, 27);
    });

    it("subtract a given value to the stored value", async () => {
        await calculator.setValueByOwner(7, {from: accounts[0]});
        let result = await calculator.subtractStoredValue(5, {from: accounts[0]});
        assert.equal(result, 2);
    });

    it("multiply a given value to the stored value", async () => {
        await calculator.setValueByOwner(7, {from: accounts[0]});
        let result = await calculator.multiplyStoredValue(5, {from: accounts[0]});
        assert.equal(result, 35);
    });

    it("divide a given value to the stored value", async () => {
        await calculator.setValueByOwner(7, {from: accounts[0]});
        let result = await calculator.divideStoredValue(7, {from: accounts[0]});
        assert.equal(result, 1);
    });

    it("emits an event when a value is stored", async () => {
        let tx = await calculator.setValueByOwner(18, {from: accounts[0]});
        TruffleAssert.eventEmitted(tx, 'onSetValue', (e) => {
            return e.value == 18;
        });
    });
});