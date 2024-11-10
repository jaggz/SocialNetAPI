import { Router } from 'express';
const router = Router();
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getAllUser).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  // /api/users/:userId/friends/friendId
  router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);
  

export { router as userRouter };
