const Calculator = artifacts.require("Calculator"); //Cargar Smart Contract

module.exports = function(deployer) {
    deployer.deploy(Calculator); // Desplegar Smart Contract
};
