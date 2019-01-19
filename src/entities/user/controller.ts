import * as express from 'express';

import { User } from '../';
import { throwError } from '../../util';

export const registerUser = async (req, res): Promise<express.Response> => {
  try {
    const { phoneNumber, name } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (user) { // user with number already exists
      return throwError(
        res,
        null,
        { error: 'User already exists', payload: req.body },
        400
      );
    }

    const newUser = new User();
    Object.assign(newUser, { name, phoneNumber });
    await newUser.save();

    return res.json({ name, phoneNumber, id: newUser.id });
  } catch (err) {
    return throwError(res, err);
  }
};
