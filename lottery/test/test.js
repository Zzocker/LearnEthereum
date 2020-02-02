const ganache = require('ganache-cli')
const Web3 = require('web3')
const assert = require('assert')
const {bytecode,interface} = require('../compile')
const web3 = new Web3(ganache.provider())

let accounts
let Lottery
beforeEach(async()=>{
    accounts = await web3.eth.getAccounts()
    Lottery = await new web3.eth.Contract(JSON.parse(interface)) /// abi of contract
    .deploy({data: bytecode})
    .send({from:accounts[0],gas:'1000000'})
})

describe('Lottery',()=>{
    it('gotAccounts',()=>{
        console.log(accounts)
    })
    it('Deployed',async()=>{
        console.log(Lottery.options.address)
        assert.ok(Lottery.options.address)
    })
    it('enter',async()=>{
        await Lottery.methods.enter()
        .send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether'),
        })
        await Lottery.methods.enter()
        .send({
            from: accounts[1],
            value: web3.utils.toWei('0.02','ether'),
        })
        await Lottery.methods.enter()
        .send({
            from: accounts[2],
            value: web3.utils.toWei('0.02','ether'),
        })
        await Lottery.methods.enter()
        .send({
            from: accounts[3],
            value: web3.utils.toWei('0.02','ether'),
        })
        player = await Lottery.methods.getAllPlayers().call()
        console.log(player)
        bal = await web3.eth.getBalance(Lottery.options.address)
        console.log(web3.utils.fromWei(bal,'ether'))
    })
    it('try-catch',async ()=>{
        try {
            await Lottery.methods.enter()
        .send({
            from: accounts[0],
            value: web3.utils.toWei('0.001','ether'),
        })
        assert(false)
        } catch (error) {
            console.log(error)
            assert(error)
        }
    })
    it('only manager', async()=>{
        try {
           const res =await Lottery.methods.pickWinner()
        .send({from:accounts[1]})
        } catch (error) {
            console.log(error)
        }
    })
    
})
