const Web3 = require('web3')
const web3 = new Web3(Web3.providers.givenProvider || 'wss://')

const account1 = '0x46C4505dA6d2fa93D006D2755E72e43C6c58CA0F'
const account2 = '0x0e9F4B99Dcd6D36B428c8c5222164Cd6c25A7aB1'
const account3 = '0x628254F7513e02865AD6cD4A407dea5B5Da55012'
const account4 = '0xC5873C20f52755ee6E7CeB5b5DE2CE2c57ecDb74'
const account5 = '0x550C6fEE60bEe6651aBe662ab86859571D266B77'

const txHash= ''


const tArray = []
async function saveTransactions(block,block1){
    for(i=block; i<=block1;i++){
        let tsCount = await web3.eth.getBlockTransactionCount(i)
        for(j=0;j<tsCount;j++){
            let transaction = await web3.eth.getTransactionFromBlock(i, j)
          
        tArray.push(transaction)
        
    }
    
    }
    console.log(tArray)
}
//saveTransactions(7592993,7592996)


async function getAccountTransactions(adress){
    let currentBlock =await web3.eth.getBlockNumber()
    let tc =await web3.eth.getTransactionCount(adress, currentBlock)
    let bal = await web3.eth.getBalance(adress, currentBlock)
    bal = web3.utils.fromWei(bal, 'ether')
    for(let i=currentBlock; i>= 0 && ( bal > 0); --i){
        let block =await web3.eth.getBlock(i,true)
        if(block && block.transactions){
            block.transactions.forEach(function(e){
                if(adress == e.from){
                    if(e.from !=e.to)
                        console.log("Block: "+i,"From: " +e.from,"To: " +e.to, "value: "+ web3.utils.fromWei(e.value, 'ether')) 
                        --currentBlock;   
                }    
                if(adress == e.to){
                    if(e.from !=e.to)
                        console.log("Block: "+i,"From: " +e.from,"To: " +e.to, "value: "+ web3.utils.fromWei(e.value, 'ether'))
                        --currentBlock;
                }
            })
        }

    }
}
//getAccountTransactions(account5)

//transaction checker
async function checkTransaction(txs) {
    let number = await web3.eth.getBlockNumber()
    for (i=number; i>=0 ;--i){
        let block = await web3.eth.getBlock(i);
        let transactions = block.transactions;
        if (block != null && block.transactions != null) {
            for (let txHash of block.transactions) {
                let tx = await web3.eth.getTransaction(txHash);
                if (txs == tx.hash) {
                    console.log("from: " + tx.from + " to: " + tx.to + " value: " + web3.utils.fromWei(tx.value, 'ether'));
                    quit()
            }
        }
    }   
    }
    
}
//checkTransaction(txHash)



