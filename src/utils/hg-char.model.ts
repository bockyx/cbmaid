// HG Char model

import mongoose, { Schema, Document } from 'mongoose';

export interface IHGChar extends Document {
  _id: string;
  edition: number;
  name: string;
  winner: boolean;
}

const HGCharSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  edition: { type: Number, required: true },
  name: { type: String, required: true },
  winner: { type: Boolean, required: true },
});

export default mongoose.model<IHGChar>('HGChar', HGCharSchema, 'hg_char');
