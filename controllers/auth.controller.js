import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';                              {/*For password hashing*/}
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'; 

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    // error.code === 11000 → MongoDB's duplicate key error.
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]; // 'username' or 'email'
      const message =
        field === 'email'
          ? 'An account with this email already exists.'
          : 'Username is already taken.';
      return next(errorHandler(400, message));
    }

    // Generic error fallback
    next(error);
  }
};


export const signin = async(req, res, next)=>{     {/*async for making it asynchronous, becoz have to save user*/}
  
const {email, password} = req.body;

    try {
        const user = await User.findOne({email});   {/*findOne is used to find a single user by email*/}
        if(!user) return next(errorHandler(404, 'User not found!'));  {/*if user not found, return error*/}

        const isPasswordCorrect = bcryptjs.compareSync(password, user.password);  {/*compareSync is used to compare the password with hashed password*/}
        if(!isPasswordCorrect) return next(errorHandler(400, 'Wrong credentials!'));  {/*if password is incorrect, return error*/}

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);  {/*signing the token with user id and secret key*/}
        
        // Remove password from user object before sending
        const { password: pass, ...rest } = user._doc;
        
        res.cookie('access_token', token, { httpOnly: true, })
           .status(200)
           .json({ ...rest, token });  {/*return user data and token*/}
    } 
    catch (error) {
        next(error);    {/*send error using middleware, in index.js*/}
    }
   
}

