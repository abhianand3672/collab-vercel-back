import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Profile fields
    name: {
      type: String,
      default: null,
    },
    collegeName: {
      type: String,
      default: null,
    },
    skills: {
      type: String,
      default: null,
    },
    linkedin: {
      type: String,
      default: null,
    },
    skillLinks: {
      type: [String],
      default: [],
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }   //time of creation and updation
);

const User = mongoose.model('User', userSchema);  

export default User;  //so that we can use it anywhere in the application