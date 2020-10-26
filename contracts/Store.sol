pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Devices.sol";

pragma experimental ABIEncoderV2;

contract Store is Ownable {
    using SafeMath for uint256;

    Devices device;
    ERC20 iPhone;

    constructor(address deviceContractAddress, address iPhoneContractAddress)
        public
    {
        device = Devices(deviceContractAddress);
        iPhone = ERC20(iPhoneContractAddress);
    }

    function buyDevices(
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public returns (bool) {
        require(id < device.getCurrentTokenId(), "Device does not exist");
        require(
            device.totalSupply(id) < device.maxSupply(id),
            "Max supply reached"
        );

        uint256 price = device.getSpecsById(id).price;
        uint256 totalAmount = price.mul(amount);
        require(
            totalAmount <= iPhone.balanceOf(msg.sender),
            "Not enough iPhone"
        );

        bool transferSuccess = iPhone.transferFrom(
            msg.sender,
            address(this),
            totalAmount
        );

        if (transferSuccess) {
            device.mint(msg.sender, id, amount, data);
            device.increaseTotalSupply(id, amount);
        } else {
            return false;
        }

        return true;
    }

    function withdraw(uint256 amount) public onlyOwner {
        uint256 balance = iPhone.balanceOf(address(this));
        require(amount <= balance, "Not enough balance");

        iPhone.transfer(owner(), amount);
    }

    fallback() external {
        revert();
    }
}
