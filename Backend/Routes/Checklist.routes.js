import { Router } from 'express';
import { requireSignIn } from '../Middlewares/auth.middleware.js';
import {
  getChecklists,
  createChecklist,
  updateChecklist,
} from '../Controller/Checklist.controller.js';

const router = Router({ mergeParams: true });

// Get checklists for booking
router.get('/:bookingId', requireSignIn, getChecklists);

// Create new checklist for booking
router.post('/:bookingId', requireSignIn, createChecklist);

// Update checklist item
router.put('/:checklistId', requireSignIn, updateChecklist);

export default router;
