const { expectRevert, time, expectEvent } = require('@openzeppelin/test-helpers');
const Factory = artifacts.require('Factory');
const PhoneToken = artifacts.require('PhoneToken');
const IPhoneToken = artifacts.require('IPhoneToken');
const BONUS_MULTIPLIER = 10;

contract('Factory', ([deployer, dev, alice, bob]) => {
  beforeEach(async () => {
    this.iPhonePerBlock = 1000;

    this.initAlicePhoneToken = '2000';
    this.initBobPhoneToken = '2000';
    this.aliceDeposit = '1000';
    this.bobDeposit = '1000';

    this.phoneToken = await PhoneToken.new({ from: deployer });
    this.iPhoneToken = await IPhoneToken.new({ from: deployer });
  });

  context('Deploy factory successfully!', () => {
    beforeEach(async () => {
      this.startBlock = 0;
      this.bonusEndBlock = 200;

      this.factory = await Factory.new(
        this.iPhoneToken.address,
        dev,
        this.iPhonePerBlock,
        this.startBlock,
        this.bonusEndBlock,
        { from: deployer }
      );
    });

    it('constructor should set correct state variables', async () => {
      let iPhoneToken = await this.factory.iPhone();
      let iPhoneTokenOwner = await this.iPhoneToken.owner();
      let iPhonePerBlock = await this.factory.iPhonePerBlock();
      let startBlock = await this.factory.startBlock();
      let bonusEndBlock = await this.factory.bonusEndBlock();
      let devaddr = await this.factory.devaddr();

      assert.equal(iPhoneToken.valueOf(), this.iPhoneToken.address);
      assert.equal(devaddr.valueOf(), dev);
      assert.equal(iPhoneTokenOwner.valueOf(), deployer);
      assert.equal(iPhonePerBlock, this.iPhonePerBlock);
      assert.equal(startBlock, this.startBlock);
      assert.equal(bonusEndBlock, this.bonusEndBlock);
    });

    it('Only deployer can call setUp() function and transferOwnership()', () => {
      expectRevert(
        this.factory.setUp(this.phoneToken.address, { from: alice }),
        'Ownable: caller is not the owner'
      );

      expectRevert(
        this.iPhoneToken.transferOwnership(alice, { from: alice }),
        'Ownable: caller is not the owner'
      );
    });

    it('Only dev can call dev() function', () => {
      expectRevert(this.factory.dev(alice, { from: alice }), 'dev: wut?');
    });
  });

  context('Constructor() and setUp() successfully!', () => {
    beforeEach(async () => {
      this.startBlock = 0;
      this.bonusEndBlock = 200;

      this.factory = await Factory.new(
        this.iPhoneToken.address,
        dev,
        this.iPhonePerBlock,
        this.startBlock,
        this.bonusEndBlock,
        { from: deployer }
      );

      await this.iPhoneToken.transferOwnership(this.factory.address, { from: deployer });
      await this.factory.setUp(this.phoneToken.address, { from: deployer });
      await this.phoneToken.mint(alice, this.initAlicePhoneToken, { from: deployer });
      await this.phoneToken.mint(bob, this.initBobPhoneToken, { from: deployer });
    });

    context('alice have not enough or not approve for Factory!', async () => {
      it('alice balance must equal initAlicePhoneToken', async () => {
        let aliceBalance = await this.phoneToken.balanceOf(alice);
        assert.equal(aliceBalance, this.initAlicePhoneToken);

        let accIPhonePerShare = await this.factory.accIPhonePerShare();
        assert.equal(accIPhonePerShare, 0);
      });

      it('Deposit fail because alice balance not enough', async () => {
        await expectRevert(
          this.factory.deposit((parseInt(this.initAlicePhoneToken) + 1).toString(), {
            from: alice
          }),
          'ERC20: transfer amount exceeds balance'
        );
      });

      it('Deposit fail because alice have not approved for Factory', async () => {
        await expectRevert(
          this.factory.deposit(this.aliceDeposit, { from: alice }),
          'ERC20: transfer amount exceeds allowance'
        );
      });
    });

    context(
      'alice have enough balance and approved for Factory and alice deposit first successfully',
      async () => {
        let aliceApprovalReceipt;
        let aliceDepositReceipt;
        let aliceDepositBlockNumber;

        beforeEach(async () => {
          aliceApprovalReceipt = await this.phoneToken.approve(
            this.factory.address,
            this.aliceDeposit,
            {
              from: alice
            }
          );

          aliceDepositReceipt = await this.factory.deposit(this.aliceDeposit, { from: alice });
          aliceDepositBlockNumber = aliceDepositReceipt.receipt.blockNumber;
        });

        it('Event format is valid', async () => {
          expectEvent(aliceApprovalReceipt, 'Approval', {
            owner: alice,
            spender: this.factory.address,
            value: this.aliceDeposit
          });
        });

        it('alice deposit first successfully!', async () => {
          let lastRewardBlock = await this.factory.lastRewardBlock();
          let aliceInfo = await this.factory.userInfo(alice);
          let accIPhonePerShare = await this.factory.accIPhonePerShare();
          let alicePendingIPhone = await this.factory.pendingIPhone(alice);
          let iPhoneReward = await this.iPhoneToken.balanceOf(this.factory.address);
          let devIPhone = await this.iPhoneToken.balanceOf(dev);

          expectEvent(aliceDepositReceipt, 'Deposit', { user: alice, amount: this.aliceDeposit });
          assert.equal(parseInt(lastRewardBlock), aliceDepositReceipt.receipt.blockNumber);
          assert.equal(parseInt(aliceInfo.amount), this.aliceDeposit);
          assert.equal(parseInt(aliceInfo.rewardDebt), 0);
          assert.equal(parseInt(accIPhonePerShare), 0);
          assert.equal(parseInt(alicePendingIPhone), 0);
          assert.equal(parseInt(iPhoneReward), 0);
          assert.equal(parseInt(devIPhone), 0);
        });

        it('depositBlock < bonusEndBlock and currentBlock <= bonusEndBlock', async () => {
          let phoneSupply = await this.phoneToken.balanceOf(this.factory.address);

          await time.advanceBlockTo(100);

          let alicePendingIPhone = await this.factory.pendingIPhone(alice);
          let currentBlock = await time.latestBlock();
          let expectPendingIPhone =
            ((currentBlock - aliceDepositBlockNumber) *
              BONUS_MULTIPLIER *
              this.iPhonePerBlock *
              this.aliceDeposit) /
            phoneSupply;

          assert.equal(expectPendingIPhone, parseInt(alicePendingIPhone));
        });

        it('depositBlock < bonusEndBlock and currentBlock > bonusEndBlock', async () => {
          let phoneSupply = await this.phoneToken.balanceOf(this.factory.address);
          await time.advanceBlockTo(210);
          let alicePendingIPhone = await this.factory.pendingIPhone(alice);
          let currentBlock = await time.latestBlock();

          let expectPendingIPhone =
            ((currentBlock -
              this.bonusEndBlock +
              (this.bonusEndBlock - aliceDepositBlockNumber) * BONUS_MULTIPLIER) *
              this.iPhonePerBlock *
              this.aliceDeposit) /
            phoneSupply;

          assert.equal(expectPendingIPhone, parseInt(alicePendingIPhone));
        });

        context('alice deposit first and bob depsoit second', async () => {
          let bobDepositReceipt;
          let bobDepositBlockNumber;
          let bobApprovalReceipt;

          let oldIPhonePerShare;
          let currentAccIPhonePerShare;

          beforeEach(async () => {
            bobApprovalReceipt = await this.phoneToken.approve(
              this.factory.address,
              this.bobDeposit,
              {
                from: bob
              }
            );

            bobDepositReceipt = await this.factory.deposit(this.bobDeposit, { from: bob });
            bobDepositBlockNumber = bobDepositReceipt.receipt.blockNumber;
            oldIPhonePerShare = await this.factory.accIPhonePerShare();
          });

          it('bob deposit after alice!', async () => {
            await time.advanceBlockTo(230);

            let lastRewardBlock = await this.factory.lastRewardBlock();

            let phoneSupply = await this.phoneToken.balanceOf(this.factory.address);
            currentAccIPhonePerShare = await this.factory.accIPhonePerShare();

            let currentBlock = await time.latestBlock();

            let bobPendingIphone = await this.factory.pendingIPhone(bob);

            let expectBobPendingIphone =
              ((currentBlock - bobDepositBlockNumber) * this.iPhonePerBlock * this.bobDeposit) /
              phoneSupply;

            let bobInfo = await this.factory.userInfo(bob);

            assert.equal(parseInt(lastRewardBlock), bobDepositBlockNumber);
            assert.equal(parseInt(bobPendingIphone), expectBobPendingIphone);
            assert.equal(parseInt(bobInfo.amount), this.bobDeposit);
            assert.equal(
              parseInt(bobInfo.rewardDebt),
              (parseInt(currentAccIPhonePerShare) * parseInt(bobInfo.amount)) / 1000000000000
            );
          });
          context('Alice withdraw', () => {
            beforeEach(async () => {
              this.aliceWithdraw = '500';
            });

            it('only alice withdraw fail!', async () => {
              let aliceInfoBefore = await this.factory.userInfo(alice);

              expectRevert(
                this.factory.withdraw(parseInt(aliceInfoBefore.amount) + 1, { from: alice }),
                'withdraw: not good'
              );
            });

            it('only alice withdraw successfully!', async () => {
              await time.advanceBlockTo(260);

              let aliceInfoBefore = await this.factory.userInfo(alice);

              let alicePendingIphone = parseInt(await this.factory.pendingIPhone(alice));

              let getAlicePendingBlock = parseInt(await time.latestBlock());

              let phoneSupply = parseInt(await this.phoneToken.balanceOf(this.factory.address));
              await time.advanceBlockTo(280);

              let aliceWithdrawReceipt = await this.factory.withdraw(
                parseInt(aliceInfoBefore.amount) - this.aliceWithdraw,
                {
                  from: alice
                }
              );

              let aliceWithdrawBlockNumber = aliceWithdrawReceipt.receipt.blockNumber;

              expectEvent(aliceWithdrawReceipt, 'Withdraw', {
                user: alice,
                amount: (parseInt(aliceInfoBefore.amount) - this.aliceWithdraw).toString()
              });

              let expectAliceIPhone =
                alicePendingIphone +
                ((aliceWithdrawBlockNumber - getAlicePendingBlock) *
                  this.iPhonePerBlock *
                  this.aliceDeposit) /
                  phoneSupply;

              let aliceIPhoneToken = await this.iPhoneToken.balanceOf(alice);
              let alicePhoneToken = await this.phoneToken.balanceOf(alice);
              let factoryPhoneToken = await this.phoneToken.balanceOf(this.factory.address);
              let aliceInfoAfter = await this.factory.userInfo(alice);

              assert.equal(
                parseInt(alicePhoneToken),
                Number(this.initAlicePhoneToken) -
                  Number(this.aliceDeposit) +
                  Number(this.aliceWithdraw)
              );
              assert.equal(parseInt(aliceInfoAfter.amount), this.aliceDeposit - this.aliceWithdraw);

              assert.equal(
                factoryPhoneToken,
                Number(this.bobDeposit) + Number(this.aliceDeposit) - Number(this.aliceWithdraw)
              );
              assert.equal(expectAliceIPhone, parseInt(aliceIPhoneToken));
            });

            it('alice call emergencyWithdraw()!', async () => {
              let withdrawReceipt = await this.factory.emergencyWithdraw({
                from: alice
              });

              expectEvent(withdrawReceipt, 'EmergencyWithdraw', {
                user: alice,
                amount: this.aliceDeposit
              });

              let alicePhoneToken = await this.phoneToken.balanceOf(alice);
              let factoryPhoneToken = await this.phoneToken.balanceOf(this.factory.address);
              let aliceInfoAfter = await this.factory.userInfo(alice);

              assert.equal(parseInt(alicePhoneToken), Number(this.initAlicePhoneToken));
              assert.equal(factoryPhoneToken, Number(this.bobDeposit));
              assert.equal(parseInt(aliceInfoAfter.amount), 0);
            });
          });
        });
      }
    );
  });
});
