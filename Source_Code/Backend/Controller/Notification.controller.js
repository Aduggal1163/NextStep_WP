import Notification from '../Models/Notification.model.js';
import nodemailer from 'nodemailer';

// Get user notifications
export const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, read = null } = req.query;
    const userId = req.user._id;

    const filter = { userId };
    if (read !== null) {
      filter.read = read === 'true';
    }

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Update read status
    if (read !== 'false') {
      await Notification.updateMany({ userId, read: false }, { read: true });
    }

    const unreadCount = await Notification.countDocuments({ userId, read: false });

    res.status(200).json({
      message: 'Notifications retrieved',
      notifications,
      unreadCount,
      hasMore: notifications.length === limit * 1,
    });
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark as read
export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    res.status(200).json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Send notification to user/group
export const sendNotification = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin only' });
    }

    const { userId, title, message, type = 'general', relatedId } = req.body;

    const notification = new Notification({
      userId,
      title,
      message,
      type,
      relatedId,
      sentBy: req.user._id,
      sentByModel: 'Admin',
    });
    await notification.save();

    // Send email
    await sendEmailNotification(userId, title, message);

    res.status(201).json({ message: 'Notification sent', notification });
  } catch (error) {
    console.error('Send notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const sendEmailNotification = async (userId, title, message) => {
  try {
    // Fetch user email
    const User = require('../Models/User.model.js').default;
    const user = await User.findById(userId).select('email');
    if (!user) return;

    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: `NextStep WP - ${title}`,
      html: `<div><h2>${title}</h2><p>${message}</p></div>`,
    });
  } catch (error) {
    console.error('Email notification error:', error);
  }
};
