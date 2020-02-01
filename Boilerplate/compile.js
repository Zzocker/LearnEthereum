const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname,"contract","inbox.sol")
const source = fs.readFileSync(inboxPath,'UTF-8')
// console.log(source)
// console.log(solc.compile(source,1))

var input = {
    language: 'Solidity',
    sources: {
        'Inboc' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 
const obj = JSON.parse(solc.compile(JSON.stringify(input)))
// console.log(Object.keys(obj.contracts.Inboc['Inboc']['evm']))
// console.log(obj.contracts.Inboc['Inboc'].abi)
// module.exports= obj.contracts.Inboc['Inboc']['evm']['bytecode'].object
module.exports = {
    interface : obj.contracts.Inboc['Inboc'].abi ,
    bytecode : obj.contracts.Inboc['Inboc']['evm']['bytecode'].object
}
