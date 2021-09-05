const fs = require('fs');
const hre = require('hardhat');
const { ethers } = hre;

const DEPLOYMENT_SCHEMA = {
  token: ''
};

const PARAMETERS = {
  owner: '0x45a10F35BeFa4aB841c77860204b133118B7CcAE',
}

const OVERRIDES = {
  gasPrice: ethers.utils.parseUnits('10', 'gwei'),
  gasLimit: 2000000,
}

async function main() {
  const deploymentPath = `./deployments/${hre.network.name}.json`;

  const data = _loadOrCreateDeploymentFile(deploymentPath);

  if (hre.network.name !== 'local' && data.token !== '') {
    throw new Error(`Token already exists at ${data.token}`);
  }

  const AleCoin = await _deployContract();
  console.log(`AleCoin token deployed at ${AleCoin.address}`);

  data.token = AleCoin.address;
  fs.writeFileSync(deploymentPath, JSON.stringify(data, null, 2));
}

async function _deployContract() {
  const factory = await ethers.getContractFactory('AleCoin');
  const AleCoin = await factory.deploy(...Object.values(PARAMETERS), OVERRIDES);
  console.log('Submitted transaction:', AleCoin.deployTransaction);

  const receipt = await AleCoin.deployTransaction.wait();
  console.log('Deployment receipt:', receipt);

  return AleCoin;
}

function _loadOrCreateDeploymentFile(filepath) {
  if (fs.existsSync(filepath)) {
    return JSON.parse(fs.readFileSync(filepath));
  } else {
    return DEPLOYMENT_SCHEMA;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
