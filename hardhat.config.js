require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    local: {
      url: 'http://localhost:8545'
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.PROVIDER_KEY}`,
      accounts: [`${process.env.DEPLOYER_KEY}`],
    },
    kovan: {
      url: `https://mainnet.infura.io/v3/${process.env.PROVIDER_KEY}`,
      accounts: [`${process.env.DEPLOYER_KEY}`],
    }
  },
};
