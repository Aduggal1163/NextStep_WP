import Booking from '../Models/Booking.model.js';
import Package from '../Models/Package.model.js';
import Vendor from '../Models/Vendor.model.js';
import Destination from '../Models/Destination.model.js';
import Review from '../Models/Review.model.js';

// Get personalized recommendations
export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookingId } = req.params || req.query;

    let booking;
    if (bookingId) {
      booking = await Booking.findById(bookingId).populate('destinationId packageId');
    } else {
      // Get user's latest booking
      booking = await Booking.findOne({ userId }).sort({ createdAt: -1 }).populate('destinationId packageId');
    }

    if (!booking) {
      return res.status(404).json({ message: 'No booking found for recommendations' });
    }

    const destId = booking.destinationId._id;
    const budgetRange = booking.budget;

    // Top packages for same destination (AI-like logic: popularity + matching budget)
    const packages = await Package.find({
      destinationId: destId,
      basePrice: { $gte: budgetRange * 0.7, $lte: budgetRange * 1.3 },
    })
    .populate('gallery')
    .sort({ bookingsCount: -1 })
    .limit(5);

    // Top vendors for destination + high ratings
    const vendors = await Vendor.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'targetId',
          as: 'reviews',
          pipeline: [{ $match: { targetType: 'vendor' } }]
        }
      },
      {
        $addFields: {
          avgRating: { $avg: '$reviews.rating' },
          reviewCount: { $size: '$reviews' }
        }
      },
      { $match: { servicesOffered: { $in: ['photography', 'catering', 'venue', 'decoration'] } } }, // destination wedding services
      { $sort: { avgRating: -1, reviewCount: -1 } },
      { $limit: 8 }
    ]);

    // Similar destinations
    const similarDestinations = await Destination.find({
      country: booking.destinationId.country,
      $expr: { $ne: ['$_id', destId] }
    }).limit(3);

    res.status(200).json({
      message: 'Recommendations generated',
      recommendations: {
        packages,
        vendors,
        destinations: similarDestinations,
        nextSteps: [
          'Review suggested packages',
          'Shortlist vendors',
          'Create wedding checklist',
          'Explore photo galleries'
        ]
      }
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ message: 'Server error generating recommendations' });
  }
};
