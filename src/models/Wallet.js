import { Schema, model } from 'mongoose';

const walletSchema = new Schema({
  address: String
});

export default model('Wallet', walletSchema);
