import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';//import Models

// get all Users
export const getAllUser = async(_req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

// get User by its Id
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).populate('friends');
      if(user) {
        res.json(user);
      } else {
        res.status(404).json({
          message: 'User not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

// Create New User
export const createUser = async (req: Request, res: Response) => {

    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

// update User with Id
export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No User with this id!' });
      }

      res.json(user)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

// Delete User with ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId});
      
      if(!user) {
        res.status(404).json({
          message: 'No User with that ID'
        });
      } else {
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and their Respective Thoughts deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
// Add Friend associate with User ID and push friendId to its friends field
export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        {  _id: req.params.userId  },
        { $push: { friends: req.params.friendId } },
        { new: true }
      ).populate('friends');
      
      if(!user) {
        res.status(404).json({
          message: 'No User or Friend with that ID'
        });
      } else {
    
        res.json({ message: 'User Friend added!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
  // Delete Friend for User and pull friendId from User's friends field
export const deleteFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        {  _id: req.params.userId  },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      ).populate('friends');
      
      if(!user) {
        res.status(404).json({
          message: 'No User with that ID'
        });
      } else {
    
        res.json({ message: 'User Friend Deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
