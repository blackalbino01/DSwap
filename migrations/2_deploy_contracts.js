const Swap = artifacts.require("Swap");
const SwapRouter = artifacts.require("SwapRouter");


module.exports = async function (deployer) {

  // Deploy Swap
  await deployer.deploy(Swap, '0xE592427A0AEce92De3Edee1F18E0157C05861564');
  await Swap.deployed();

  // Deploy SwapRouter
  await deployer.deploy(SwapRouter, '0x1F98431c8aD98523631AE4a59f267346ea31F984', '0xc778417E063141139Fce010982780140Aa0cD5Ab');
  await SwapRouter.deployed();
};
