import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or Admin/Planner/Vendor
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['booking', 'chat', 'review', 'status', 'reminder', 'promotion'],
    default: 'general',
  },
  read: {
    type: Boolean,
    default: false,
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId, // bookingId, chatId, etc.
    sparse: true,
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'sentByModel',
  },
  sentByModel: {
    type: String,
    enum: ['User', 'Planner', 'Vendor', 'Admin'],
  },
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
