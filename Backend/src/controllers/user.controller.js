import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js';

const signUp = async (req, res) => {
  try {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = await User.create({ ...req.body, password: hashedPassword });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if(!user) {
      return res.status(401).send("User does not exist");
    }
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
      return res.status(401).send("Incorrect password !");
    }
    return res.status(200).send("Successfully signed in");
  } catch (error) {
    return res.status(500).send(error);
  }
}

export { signIn, signUp };
