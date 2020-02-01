const assert  = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const {interface,bytecode} = require('../compile')
let accounts
let Inbox

beforeEach(async()=>{
    // get one those account
    accounts = await web3.eth.getAccounts()
    Inbox = await new web3.eth.Contract(interface) /// abi of contract
    .deploy({data: bytecode,arguments:["InitHello"]})
    .send({from:accounts[0],gas:'1000000'})
})

describe('Inbox',()=>{
    it('Deployed',()=>{
        // console.log(accounts)
        assert.ok(Inbox.options.address)
    })
    it('DefaultMesg',async ()=>{
        const message = await Inbox.methods.message().call() // call will contain  sender address gass limit
        assert.equal(message,'InitHello')
    })
    it('SetMesg', async ()=>{
         const tx = await Inbox.methods.setMessage('second message').send({
            from:accounts[0]
        })
        const message = await Inbox.methods.message().call()
        console.log(tx.transactionHash)
        assert.equal(message,'second message')
    })
})