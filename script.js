const Swap = artifacts.require("Swap");
const SwapRouter = artifacts.require("SwapRouter");
const IERC20 = require("@openzeppelin/contracts/build/contracts/IERC20.json");



module.exports = async function(callback) {

	try{
		const accounts = await web3.eth.getAccounts();

		const owner = accounts[0]

		const trader = accounts[1]

		console.log(owner);

		const swap = await Swap.new('0xE592427A0AEce92De3Edee1F18E0157C05861564');
		const swapRouter = await SwapRouter.new('0x1F98431c8aD98523631AE4a59f267346ea31F984', '0xc778417E063141139Fce010982780140Aa0cD5Ab',{from: owner});
		
		const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
		const WETH9 = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
		const amountIn = 20;

		const token = new web3.eth.Contract(IERC20.abi, DAI);

		const tx = await token.methods.approve(swap.address, amountIn).send({ from: trader, gas: 50000, gasPrice: 0 });

  	console.log(tx);

		const test = await swap.swap(Dai, WETH9, amountIn);
		console.log(test);
	}

	catch(error){
		console.log(error);
	}

	callback();
}