// Edition model

import mongoose, { Schema, Document } from 'mongoose';

export interface IEdition extends Document {
  _id: string;
  edition: number;
  year: number;
  month: number;
  winner_id: string;
}

const EditionSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  edition: { type: Number, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  winner_id: { type: String, required: false },
});

export default mongoose.model<IEdition>('Edition', EditionSchema, 'hg_edition');
