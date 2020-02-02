 
const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname,"contract","lottery.sol")
const source = fs.readFileSync(inboxPath,'UTF-8')
const obj = solc.compile(source,1)
const contract = obj.contracts[':Lottery']
module.exports = contract