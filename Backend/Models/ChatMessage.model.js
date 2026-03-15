import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  chatId: {
    type: String, // unique chat room ID like 'user_planner_booking123'
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'senderModel',
  },
  senderModel: {
    type: String,
    enum: ['User', 'Planner', 'Vendor', 'Admin'],
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'receiverModel',
  },
  receiverModel: {
    type: String,
    enum: ['User', 'Planner', 'Vendor', 'Admin'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'system'],
    default: 'text',
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    sparse: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for fast queries
ChatMessageSchema.index({ chatId: 1, createdAt: -1 });
ChatMessageSchema.index({ senderId: 1, receiverId: 1 });

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
export default ChatMessage;
