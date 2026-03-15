import { Router } from 'express';
import { requireSignIn } from '../Middlewares/auth.middleware.js';
import {
  getNotifications,
  markAsRead,
  sendNotification,
} from '../Controller/Notification.controller.js';

const router = Router();

// Get my notifications
router.get('/my-notifications', requireSignIn, getNotifications);

// Mark single notification as read
router.put('/read/:notificationId', requireSignIn, markAsRead);

// Admin: Send notification
router.post('/send', requireSignIn, sendNotification);

export default router;
