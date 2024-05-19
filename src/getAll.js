import { Router } from 'express';
const router = Router();
import Wallet from './models/Wallet.js'

router.get('/', async (req, res) => {
 try {
    let wallets = await Wallet.find({});
    const totalNum = wallets.length
    wallets = wallets.map(i => i.address)
    // console.log(wallets)
    //const result = await wallets.json()
    res.status(200).json({ success: true, total: totalNum, result: wallets });
 } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching wallets' });
 }
});

export default router;
