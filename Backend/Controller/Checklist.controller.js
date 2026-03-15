import Checklist from '../Models/Checklist.model.js';
import Booking from '../Models/Booking.model.js';
import Notification from '../Models/Notification.model.js';

// Get checklists for booking
export const getChecklists = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const checklists = await Checklist.find({ bookingId })
      .populate('createdBy', 'username')
      .populate('sharedWith', 'plannerName username');
    
    res.status(200).json({
      message: 'Checklists retrieved',
      checklists,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create checklist
export const createChecklist = async (req, res) => {
  try {
    const { bookingId, title, items } = req.body;
    const createdByModel = req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1);
    
    const checklist = new Checklist({
      bookingId,
      title,
      items: items || [],
      createdBy: req.user._id,
      createdByModel,
    });
    
    await checklist.save();
    
    // Notify booking owner and planner
    await Notification.create({
      userId: (await Booking.findById(bookingId)).userId,
      title: 'New Checklist Created',
      message: `A new checklist "${title}" has been created for your booking.`,
      type: 'checklist',
      relatedId: checklist._id,
    });
    
    const populated = await Checklist.findById(checklist._id).populate('createdBy');
    res.status(201).json({
      message: 'Checklist created',
      checklist: populated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update checklist item
export const updateChecklist = async (req, res) => {
  try {
    const { checklistId } = req.params;
    const { itemIndex, completed, notes } = req.body;
    
    const checklist = await Checklist.findById(checklistId);
    if (!checklist) {
      return res.status(404).json({ message: 'Checklist not found' });
    }
    
    // Anyone with access can update items
    if (itemIndex !== undefined && checklist.items[itemIndex]) {
      checklist.items[itemIndex].completed = completed !== undefined ? completed : checklist.items[itemIndex].completed;
      if (notes !== undefined) checklist.items[itemIndex].notes = notes;
    }
    
    // Recalculate progress
    const completedItems = checklist.items.filter(item => item.completed).length;
    checklist.progress = checklist.items.length > 0 ? (completedItems / checklist.items.length) * 100 : 0;
    
    await checklist.save();
    
    res.status(200).json({
      message: 'Checklist updated',
      checklist,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
