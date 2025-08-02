import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, collegeName, skills, linkedin, skillLinks } = req.body;
    
    // Validate required fields
    if (!name || !collegeName || !skills || !skillLinks || skillLinks.length === 0) {
      return next(errorHandler(400, 'All required fields must be provided'));
    }

    // Get user ID from the authenticated request
    const userId = req.user.id;

    // Update user with profile data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        collegeName,
        skills,
        linkedin,
        skillLinks,
        isRegistered: true
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser._doc;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    // Get user ID from the authenticated request
    const userId = req.user.id;

    const user = await User.findById(userId);
    
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user._doc;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const getBasicUserInfo = async (req, res, next) => {
  try {
    // Get user ID from the authenticated request
    const userId = req.user.id;

    const user = await User.findById(userId).select('username email isRegistered');
    
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      isRegistered: user.isRegistered || false
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRegisteredUsers = async (req, res, next) => {
  try {
    // Get all users who have completed their registration
    const users = await User.find({ isRegistered: true }).select('-password');
    
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUserProfile = async (req, res, next) => {
  try {
    // Get user ID from the authenticated request
    const userId = req.user.id;

    // Delete user from database
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    next(error);
  }
};