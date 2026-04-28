import ChatMessage from '../Models/ChatMessage.model.js';
import Booking from '../Models/Booking.model.js';

// Get chat history for a chat room
export const getChatHistory = async (req, res) => {
  try {
    const { chatId, page = 1, limit = 50 } = req.query;
    if (!chatId) {
      return res.status(400).json({ message: 'chatId is required' });
    }

    const skip = (page - 1) * limit;
    const messages = await ChatMessage.find({ chatId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(skip * 1)
      .populate('senderId', 'username email profileImage')
      .populate('bookingId', 'title destinationId');

    // Mark as read for receiver
    if (req.user) {
      await ChatMessage.updateMany(
        { chatId, receiverId: req.user._id, read: false },
        { read: true }
      );
    }

    return res.status(200).json({
      message: 'Chat history retrieved',
      messages: messages.reverse(), // oldest first for UI
      count: messages.length,
    });
  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send message (used for initial save, real-time via socket)
export const sendMessage = async (req, res) => {
  try {
    const { chatId, message, messageType = 'text', bookingId } = req.body;
    const senderId = req.user._id;
    const senderModel = req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1);

    if (!chatId || !message) {
      return res.status(400).json({ message: 'chatId and message required' });
    }

    const chatMessage = new ChatMessage({
      chatId,
      senderId,
      senderModel,
      message,
      messageType,
      bookingId,
    });

    await chatMessage.save();
    const populated = await ChatMessage.findById(chatMessage._id)
      .populate('senderId', 'username profileImage')
      .populate('bookingId', 'title');

    return res.status(201).json({
      message: 'Message sent',
      chatMessage: populated,
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's chats list
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await ChatMessage.aggregate([
      { $match: { 
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }},
      {
        $group: {
          _id: '$chatId',
          lastMessage: { $last: '$message' },
          lastUpdated: { $last: '$createdAt' },
          partnerId: {
            $last: {
              $cond: [
                { $eq: ['$senderId', userId] },
                '$receiverId',
                '$senderId'
              ]
            }
          },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$receiverId', userId] },
                    { $eq: ['$read', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      { $sort: { lastUpdated: -1 } },
      { $limit: 20 }
    ]);

    // Populate partner details
    const partnerIds = chats.map(c => c.partnerId);
    // Note: In full impl, populate partner details here

    res.status(200).json({
      message: 'Chats retrieved',
      chats,
      count: chats.length,
    });
  } catch (error) {
    console.error('Get user chats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
