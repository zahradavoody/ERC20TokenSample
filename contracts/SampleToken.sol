pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SampleToken is ERC20, Ownable{
    uint256 public transferFeeRate = 10;
    uint256 public initialSupply = 10000;
    constructor(uint256 _initialSupply) ERC20("SampleToken", "SMP") {
        initialSupply = _initialSupply;
        _mint(msg.sender, initialSupply);
    }

    function setTransferFeeRate(uint256 _transferFeeRate) public onlyOwner {
        require(_transferFeeRate >=0 && _transferFeeRate <= 100 ,"wrong range: transferFeeRate is >=0 and <=100");
        transferFeeRate = _transferFeeRate;
    } 

    function transfer(address to, uint256 amount) public override returns (bool) {
        address tokenOwner = _msgSender();
        _transfer(tokenOwner, to, (100 - transferFeeRate) * amount / 100);
        _transfer(tokenOwner, owner(), transferFeeRate * amount / 100);
        return true;
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }


}