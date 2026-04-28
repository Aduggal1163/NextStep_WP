import { Router } from 'express';
import { requireSignIn } from '../Middlewares/auth.middleware.js';
import {
  getRecommendations,
} from '../Controller/Recommendation.controller.js';

const router = Router();

// Get personalized recommendations for user/booking
router.get('/my-recommendations', requireSignIn, getRecommendations);

// Get recommendations for booking
router.get('/:bookingId', requireSignIn, getRecommendations);

export default router;
