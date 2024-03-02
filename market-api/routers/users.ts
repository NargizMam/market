import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      phoneNumber: req.body.phoneNumber
    });
    user.generateToken();
    await user.save();
    return res.send({message: 'User is register!', user});
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});
usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(422).send({ error: 'Логин или пароль введен неверно!' });
    }
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Логин или пароль введен неверно!' });
    }
    user.generateToken();
    await user.save();
    return res.send({ message: 'Логин и пароль верны!', user });
  } catch (e) {
    next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try{
    const headerValue = req.get('Authorization');
    const successMessage = {message: 'Success!'};
    if(!headerValue){
      return res.status(401).send({error: 'No authorization header present!'});
    }
    const [_bearer, token] = headerValue.split(' ');
    if(!token){
      return res.send(successMessage);
    }
    const user = await User.findOne({token});
    if(!user){
      return res.send(successMessage);
    }
    user.generateToken();
    await user.save();

    return res.send(successMessage);
  }
  catch (e) {
    return next(e);
  }
});

export default usersRouter;
