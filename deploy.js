const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/HOAFactory.json');

const mnemonic = "yellow stool wagon cage gate mixed fiction pumpkin runway like velvet planet";
const infura = "https://rinkeby.infura.io/IM8GjYmXlQZCY3LMWaqm";
const provider = new HDWalletProvider(mnemonic, infura);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();