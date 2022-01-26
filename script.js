const Swap = artifacts.require("Swap");
const SwapRouter = require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json");
const IERC20 = require("@openzeppelin/contracts/build/contracts/IERC20.json");



module.exports = async function(callback) {

	try{
		const accounts = await web3.eth.getAccounts();

		const owner = accounts[1]

		const trader = accounts[0]


		const router = new web3.eth.Contract(SwapRouter.abi, '0xE592427A0AEce92De3Edee1F18E0157C05861564', {from: owner, data: SwapRouter.bytecode});
		
		const swapTokens = await Swap.new(router.options.address, {from: owner});

		const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
		const WETH9 = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
		const amountIn = web3.utils.toWei('0.1', 'ether');

		const token = new web3.eth.Contract(IERC20.abi, WETH9, {from: owner});

		await token.methods.approve(swapTokens.address, amountIn).send({ from: trader});

		const test = await swapTokens.swap(DAI, WETH9, amountIn, {from: trader});
		console.log(test);
	}

	catch(error){
		console.log(error);
	}

	callback();
}