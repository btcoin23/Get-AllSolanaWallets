import { Connection } from '@solana/web3.js';
import { connect } from 'mongoose';
import Wallet from './models/Wallet.js'
import getAll from './getAll.js'

import express, { json } from 'express';
import cors from 'cors';

const CUSTOM_RPC_URL = 'https://white-neat-pool.solana-mainnet.quiknode.pro/cfe67fec23b12040'; // Replace with your custom RPC URL
const MONGO_URL = 'mongodb+srv://innovativetech0926:twhPbLJUxWHXB8Vx@innotech.5svyawa.mongodb.net/Wallets'
const connection = new Connection(CUSTOM_RPC_URL)
const app = express();
const PORT = 5000;


let preBlockHash;
const getWallets = async () => {
    try{
        const slot = await connection.getSlot();
        const block = await connection.getBlock(slot, {maxSupportedTransactionVersion: 0}, "confirmed")
        if(block.blockhash !== preBlockHash){
            console.log(block.blockhash, block.parentSlot)
            if(block && block.transactions){
                block.transactions.forEach(tx => {
                    tx.transaction.message?.accountKeys?.forEach(async(i) => {
                        if(i.toString().length == 44){
                            // console.log(i.toString())
                            const exist = await Wallet.findOne({address: i.toString()})
                            if(!exist){
                                const wallet = new Wallet({
                                  address: i.toString()
                                });
                                await wallet.save();
                            }
                        }
                    })
                });
            }
        }
        preBlockHash = block.blockhash;
    }catch(e){
        console.log(e)
    }
    setTimeout(getWallets, 1000 * 60);
}

connect(MONGO_URL);
console.log('Connected to MongoDB...');    
app.use(json());
app.use(cors());
app.get('/',  (req, res) => {res.send('All is working');});
app.use('/api/all', getAll);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
getWallets()