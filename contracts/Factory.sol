pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IPhoneToken.sol";

contract Factory is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct UserInfo {
        uint256 amount; // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        //
        // We do some fancy math here. Basically, any point in time, the amount of IPHONEs
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.amount * accIPhonePerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The pool's `accIPhonePerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }

    IERC20 phoneToken;
    uint256 public lastRewardBlock; // Last block number that IPHONEs distribution occurs.
    uint256 public accIPhonePerShare; // Accumulated IPHONEs per share, times 1e12. See below.

    IPhoneToken public iPhone;
    // Dev address.
    address public devaddr;
    // Block number when bonus IPHONE period ends.
    uint256 public bonusEndBlock;
    // PHONE tokens created per block.
    uint256 public iPhonePerBlock;
    // Bonus muliplier for early Iphone makers.
    uint256 public constant BONUS_MULTIPLIER = 10;

    // Info of each user that stakes Phone tokens.
    mapping(address => UserInfo) public userInfo;
    // The block number when IPHONE mining starts.
    uint256 public startBlock;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 amount);

    constructor(
        address _iPhoneTokenAddress,
        address _devaddr,
        uint256 _iPhonePerBlock,
        uint256 _startBlock,
        uint256 _bonusEndBlock
    ) public {
        iPhone = IPhoneToken(_iPhoneTokenAddress);
        devaddr = _devaddr;
        iPhonePerBlock = _iPhonePerBlock;
        bonusEndBlock = _bonusEndBlock;
        startBlock = _startBlock;
    }

    function setUp(address _phoneTokenAddress) public onlyOwner {
        uint256 _lastRewardBlock = block.number > startBlock
            ? block.number
            : startBlock;
        phoneToken = IERC20(_phoneTokenAddress);
        lastRewardBlock = _lastRewardBlock;
        accIPhonePerShare = 0;
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to)
        public
        view
        returns (uint256)
    {
        if (_to <= bonusEndBlock) {
            return _to.sub(_from).mul(BONUS_MULTIPLIER);
        } else if (_from >= bonusEndBlock) {
            return _to.sub(_from);
        } else {
            return
                bonusEndBlock.sub(_from).mul(BONUS_MULTIPLIER).add(
                    _to.sub(bonusEndBlock)
                );
        }
    }

    // View function to see pending IPHONEs on frontend.
    function pendingIPhone(address _user) external view returns (uint256) {
        UserInfo storage user = userInfo[_user];

        uint256 _accIPhonePerShare = accIPhonePerShare;
        uint256 phoneSupply = phoneToken.balanceOf(address(this));

        if (block.number > lastRewardBlock && phoneSupply != 0) {
            uint256 multiplier = getMultiplier(lastRewardBlock, block.number);
            uint256 iPhoneReward = multiplier.mul(iPhonePerBlock);
            _accIPhonePerShare = accIPhonePerShare.add(
                iPhoneReward.mul(1e12).div(phoneSupply)
            );
        }

        return
            user.amount.mul(_accIPhonePerShare).div(1e12).sub(user.rewardDebt);
    }

    // Update reward variables of the given pool to be up-to-date.
    function updateFactory() public {
        if (block.number <= lastRewardBlock) {
            return;
        }

        uint256 phoneSupply = phoneToken.balanceOf(address(this));

        if (phoneSupply == 0) {
            lastRewardBlock = block.number;
            return;
        }

        uint256 multiplier = getMultiplier(lastRewardBlock, block.number);
        uint256 iPhoneReward = multiplier.mul(iPhonePerBlock);

        iPhone.mint(devaddr, iPhoneReward.div(10));
        iPhone.mint(address(this), iPhoneReward);

        accIPhonePerShare = accIPhonePerShare.add(
            iPhoneReward.mul(1e12).div(phoneSupply)
        );

        lastRewardBlock = block.number;
    }

    // Deposit Phone tokens to Store for iphone.
    function deposit(uint256 _amount) public {
        UserInfo storage user = userInfo[msg.sender];

        updateFactory();

        if (user.amount > 0) {
            uint256 pending = user.amount.mul(accIPhonePerShare).div(1e12).sub(
                user.rewardDebt
            );
            if (pending > 0) {
                safeIphoneTransfer(msg.sender, pending);
            }
        }
        if (_amount > 0) {
            phoneToken.safeTransferFrom(
                address(msg.sender),
                address(this),
                _amount
            );
            user.amount = user.amount.add(_amount);
        }

        user.rewardDebt = user.amount.mul(accIPhonePerShare).div(1e12);
        emit Deposit(msg.sender, _amount);
    }

    // Withdraw phone tokens from Store.
    function withdraw(uint256 _amount) public {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= _amount, "withdraw: not good");
        updateFactory();
        uint256 pending = user.amount.mul(accIPhonePerShare).div(1e12).sub(
            user.rewardDebt
        );
        if (pending > 0) {
            safeIphoneTransfer(msg.sender, pending);
        }
        if (_amount > 0) {
            user.amount = user.amount.sub(_amount);
            phoneToken.safeTransfer(address(msg.sender), _amount);
        }
        user.rewardDebt = user.amount.mul(accIPhonePerShare).div(1e12);
        emit Withdraw(msg.sender, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw() public {
        UserInfo storage user = userInfo[msg.sender];
        phoneToken.safeTransfer(address(msg.sender), user.amount);
        emit EmergencyWithdraw(msg.sender, user.amount);
        user.amount = 0;
        user.rewardDebt = 0;
    }

    // Safe iphone transfer function, just in case if rounding error causes pool to not have enough IPHONEs.
    function safeIphoneTransfer(address _to, uint256 _amount) internal {
        uint256 iPhoneBal = iPhone.balanceOf(address(this));
        if (_amount > iPhoneBal) {
            iPhone.transfer(_to, iPhoneBal);
        } else {
            iPhone.transfer(_to, _amount);
        }
    }

    // Update dev address by the previous dev.
    function dev(address _devaddr) public {
        require(msg.sender == devaddr, "dev: wut?");
        devaddr = _devaddr;
    }
}
