import mongoose from 'mongoose';

const ChecklistItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'assignedToModel',
    sparse: true,
  },
  assignedToModel: {
    type: String,
    enum: ['User', 'Planner', 'Vendor'],
    sparse: true,
  },
  notes: {
    type: String,
  },
});

const ChecklistSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: 'Wedding Checklist',
  },
  items: [ChecklistItemSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'createdByModel',
    required: true,
  },
  createdByModel: {
    type: String,
    enum: ['User', 'Planner', 'Admin'],
    required: true,
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'sharedWithModel',
  }],
  sharedWithModel: {
    type: String,
    enum: ['Planner', 'Vendor'],
  },
  progress: {
    type: Number,
    default: 0, // percentage complete
  },
}, { timestamps: true });

const Checklist = mongoose.model('Checklist', ChecklistSchema);
export default Checklist;
