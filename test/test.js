const assert = require('assert');
const { ethers } = require('hardhat');

describe('AleCoin', () => {
  let AleCoin;

  let owner, user;

  const totalSupply = ethers.utils.parseEther('100000000');

  before('identify signers', async () => {
    [owner, user] = await ethers.getSigners();
  });

  before('deploy', async () => {
    const factory = await ethers.getContractFactory('AleCoin');
    AleCoin = await factory.deploy(owner.address);
  });

  it('minted the correct supply to the owner', async () => {
    assert.deepEqual(
      await AleCoin.balanceOf(owner.address),
      totalSupply
    );
  });

  describe('when the owner transfers tokens', () => {
    const amount = 10000;

    before('transfer', async () => {
      const tx = await AleCoin.connect(owner).transfer(user.address, ethers.utils.parseEther(`${amount}`));
      await tx.wait();
    });

    it('shows that the user got the tokens', async () => {
      assert.deepEqual(
        await AleCoin.balanceOf(user.address),
        ethers.utils.parseEther(`${amount}`)
      );
    });

    it('shows that the owner lost the tokens', async () => {
      assert.deepEqual(
        await AleCoin.balanceOf(owner.address),
        totalSupply.sub(ethers.utils.parseEther(`${amount}`))
      );
    });
  });
});
