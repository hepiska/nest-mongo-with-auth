import { model, Model, Schema } from 'mongoose';
import { IUserDocument } from './user.types';
import * as bcrypt from 'bcryptjs';
import { config } from '../config/env.config';

const $ = {
  name: 'user',
  schema: new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
  }),
};

function saltPassword(next) {
  // eslint-disable-next-line no-invalid-this
  const pswdHashed = bcrypt.hashSync(this.password, config.saltRounds);

  // eslint-disable-next-line no-invalid-this
  this.password = pswdHashed;
  return next();
}

$.schema.pre('save', saltPassword);

export const $model = model<IUserDocument, Model<IUserDocument>>(
  $.name,
  $.schema,
);

export default $;
