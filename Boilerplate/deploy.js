const Hdwallet = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {interface,bytecode} = require('./compile')

const provider= new Hdwallet(
    'foot alone....' , 'https://rinkeby....'
)
const web3 = new Web3(provider)

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0])
    const bal = await web3.eth.getBalance(accounts[0])
    console.log(bal)
    Inbox = await new web3.eth.Contract(interface) /// abi of contract
    .deploy({data: bytecode,arguments:["InitHello"]})
    .send({from:accounts[0],gas:'8000000'})
    // console.log(Inbox)
    console.log(`contract address: ${Inbox.options.address}`)
}

deploy()