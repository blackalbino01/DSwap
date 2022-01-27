const Swap = artifacts.require("Swap");
const IERC20 = require("@openzeppelin/contracts/build/contracts/IERC20.json");



module.exports = async function(callback) {

	try{
		const accounts = await web3.eth.getAccounts();
		const owner = accounts[1]
		const trader = accounts[0]

		const swapTokens = await Swap.new('0xE592427A0AEce92De3Edee1F18E0157C05861564', {from: owner})

		const DAI = '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735'
		const WETH = '0xc778417E063141139Fce010982780140Aa0cD5Ab'
		const amountIn = web3.utils.toWei('4000000','ether')

		const token = new web3.eth.Contract(IERC20.abi, DAI, {from: owner})

		await token.methods.approve(swapTokens.address, amountIn).send({from: trader})

		const test = await swapTokens.swap(DAI, WETH, amountIn, {from: trader})

		console.log(test.receipt.status)
	}

	catch(error){
		console.log(error);
	}

	callback();
}