import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.model'
import { generateToken } from '../utils/generateToken'


//signup

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const exist = await User.findOne({ email })
    if (exist) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = generateToken(user._id.toString(), user.role)

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
      message: "Signup Successful",
      user
    })
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}


//login

export const login = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString(), user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


//logout

export const logout = async (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  })

  res.json({
    message: "Logged out successfully"
  })
}