import { Router } from 'express';
const router = Router();
import Wallet from './models/Wallet.js'

router.get('/', async (req, res) => {
 try {
    const wallets = await Wallet.find({});
    // console.log(wallets)
    //const result = await wallets.json()
    res.status(200).json({ success: true, result: wallets });
 } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching wallets' });
 }
});

export default router;
