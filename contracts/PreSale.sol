// SPDX-License-Identifier: BoomerTeam
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PhoneToken.sol";

contract PreSale is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for PhoneToken;

    // The PHONE token!
    PhoneToken public phone;
    // Rate of token with ETH
    uint256 public rate;
    // lock presale
    bool public lock;

    // Constructor
    constructor(PhoneToken _phone) public {
        phone = _phone;
        rate = 1000;
        lock = false;
    }

    // Functions
    function lockIn() public onlyOwner {
        lock = true;
    }

    function unlock() public onlyOwner {
        lock = false;
    }

    /**
     * @dev change rate of token PHONE
     * @param _newRate is new rate of token PHONE with ETH
     */
    function changeRate(uint256 _newRate) public onlyOwner {
        require(_newRate > 0, "_newRate must be greater than 0");
        rate = _newRate;
    }

    event BuyToken(address indexed buyer, uint256 phoneAmount, uint256 rate);

    /**
     * @dev function buy token PHONE
     */
    function buyTokenPhone() public payable {
        require(!lock, "not in lock state");
        uint256 preSaleBal = phone.balanceOf(address(this));
        uint256 phoneAmount = (msg.value).mul(rate);
        require(
            phoneAmount <= preSaleBal,
            "total phone token purchased must be less than preSaleBal"
        );
        phone.safeTransfer(msg.sender, phoneAmount);
        emit BuyToken(msg.sender, phoneAmount, rate);
    }

    /**
     * @dev get balance ETH of contract
     */
    function getBalanceETH() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev get balanceOf PHONE token of contract
     */
    function getBalancePHONE() public view returns (uint256) {
        return phone.balanceOf(address(this));
    }

    /**
     * @dev function withdraw ETH to account owner
     * @param _amount is amount withdraw
     */
    function withdrawETH(uint256 _amount) public onlyOwner {
        require(_amount > 0, "_amount must be greater than 0");
        require(
            address(this).balance >= _amount,
            "_amount must be less than the ETH balance of the contract"
        );
        msg.sender.transfer(_amount);
    }

    /**
     * @dev function withdraw PHONE token to account owner
     * @param _amount is amount withdraw
     */
    function withdrawPHONE(uint256 _amount) public onlyOwner {
        require(_amount > 0, "_amount must be greater than 0");
        require(
            phone.balanceOf(address(this)) >= _amount,
            "_amount must be less than the PHONE token balanceOf the contract"
        );
        phone.safeTransfer(msg.sender, _amount);
    }

    event Received(address, uint256);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
