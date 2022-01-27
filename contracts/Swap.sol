// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";


contract Swap {

    ISwapRouter public immutable swapRouter;


    // For this example, we will set the pool fee to 0.3%.    
    uint24 public constant poolFee = 3000;

    constructor(ISwapRouter _swapRouter) {        
        swapRouter = _swapRouter;    
    }

    function swap(address _tokenIn, address _tokenOut,uint256 amountIn) public returns (uint256 amountOut) {        
        // msg.sender must approve this contract

        // Transfer the specified amount of _tokenIn to this contract.        
        TransferHelper.safeTransferFrom(_tokenIn, msg.sender, address(this), amountIn);
        
        // Approve the router to spend tokenIn.        
        TransferHelper.safeApprove(_tokenIn, address(swapRouter), amountIn);

        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.        
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.        
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({                
            tokenIn: _tokenIn,                
            tokenOut: _tokenOut,                
            fee: poolFee,                
            recipient: msg.sender,                
            deadline: block.timestamp,                
            amountIn: amountIn,                
            amountOutMinimum: 0,                
            sqrtPriceLimitX96: 0              
            });
        // The call to `exactInputSingle` executes the swap.        
        amountOut = swapRouter.exactInputSingle(params);    
    }

    receive() payable external {}
}