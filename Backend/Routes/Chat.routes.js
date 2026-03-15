import { Router } from 'express';
import { requireSignIn } from '../Middlewares/auth.middleware.js';
import {
  getChatHistory,
  sendMessage,
  getUserChats,
} from '../Controller/Chat.controller.js';

const router = Router({ mergeParams: true });

// Get user's chat list
router.get('/my-chats', requireSignIn, getUserChats);

// Get chat history for specific chat room
router.get('/history', requireSignIn, getChatHistory);

// Send message (fallback for non-realtime)
router.post('/send', requireSignIn, sendMessage);

export default router;
