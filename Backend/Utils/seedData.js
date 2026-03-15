import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../Models/User.model.js';
import Planner from '../Models/Planner.model.js';
import Vendor from '../Models/Vendor.model.js';
import Booking from '../Models/Booking.model.js';
import Destination from '../Models/Destination.model.js';
import Package from '../Models/Package.model.js';
import Review from '../Models/Review.model.js';
import Gallery from '../Models/Gallery.model.js';
import Checklist from '../Models/Checklist.model.js';

const seedData = async () => {
  try {
    // Connect to DB if not already
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    }

    console.log('🌱 Seeding realistic production-like data...');

    // Clear existing data (optional)
    // await Promise.all([User.deleteMany(), Planner.deleteMany(), Vendor.deleteMany()]);

    // Hash passwords
    const hashPassword = async (pass) => await bcrypt.hash(pass, 12);

    // 1. USERS (Brides/Grooms - main customers)
    const users = await User.insertMany([
      {
        username: 'sarahwedding2024',
        email: 'sarah@example.com',
        password: await hashPassword('password123'),
        role: 'user',
        profileComplete: true,
        weddingDate: new Date('2024-12-15'),
        budget: 50000,
        guestCount: 120,
        createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000), // 100 days ago
      },
      {
        username: 'john_doe_wedding',
        email: 'john@example.com',
        password: await hashPassword('password123'),
        role: 'user',
        profileComplete: true,
        weddingDate: new Date('2024-10-20'),
        budget: 35000,
        guestCount: 80,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
      },
      {
        username: 'emma_and_mike',
        email: 'emma@example.com',
        password: await hashPassword('password123'),
        role: 'user',
        profileComplete: true,
        weddingDate: new Date('2024-11-10'),
        budget: 75000,
        guestCount: 200,
        createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000), // 200 days ago
      },
    ]);

    // 2. PLANNERS (Experts)
    const planners = await Planner.insertMany([
      {
        plannerName: 'Elite Wedding Planners',
        email: 'eliteplanners@gmail.com',
        password: await hashPassword('planner123'),
        role: 'planner',
        status: 'approved',
        experienceYears: 12,
        specializations: ['destination', 'luxury', 'beach'],
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
      },
      {
        plannerName: 'Dream Destination Events',
        email: 'dreamdest@gmail.com',
        password: await hashPassword('planner123'),
        role: 'planner',
        status: 'approved',
        experienceYears: 8,
        specializations: ['maldives', 'bali', 'europe'],
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
      },
    ]);

    // 3. VENDORS (Photographers, venues, catering)
    const vendors = await Vendor.insertMany([
      {
        businessName: 'Maldives Paradise Photography',
        email: 'maldivesphoto@gmail.com',
        password: await hashPassword('vendor123'),
        role: 'vendor',
        status: 'approved',
        servicesOffered: ['photography', 'videography'],
        experienceYears: 15,
        portfolioUrl: 'https://example.com/portfolio',
        createdAt: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000), // 1.5 years ago
      },
      {
        businessName: 'Bali Beach Venues',
        email: 'balivenues@gmail.com',
        password: await hashPassword('vendor123'),
        role: 'vendor',
        status: 'approved',
        servicesOffered: ['venue', 'decoration'],
        experienceYears: 10,
        portfolioUrl: 'https://example.com/bali',
        createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000), // 10 months ago
      },
      {
        businessName: 'Exotic Chef Catering',
        email: 'exoticchef@gmail.com',
        password: await hashPassword('vendor123'),
        role: 'vendor',
        status: 'approved',
        servicesOffered: ['catering', 'bartending'],
        experienceYears: 7,
        portfolioUrl: 'https://example.com/chef',
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
      },
    ]);

    // 4. Sample Destinations
    const destinations = await Destination.insertMany([
      {
        name: 'Maldives Paradise',
        location: 'Maldives',
        country: 'Maldives',
        description: 'Ultimate beach wedding destination',
        images: ['/images/maldives1.jpg', '/images/maldives2.jpg'],
        featured: true,
        createdAt: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000),
      },
      {
        name: 'Bali Bliss',
        location: 'Ubud, Bali',
        country: 'Indonesia',
        description: 'Rice terrace luxury weddings',
        images: ['/images/bali1.jpg'],
        featured: true,
        createdAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000),
      },
    ]);

    // 5. Packages
    const packages = await Package.insertMany([
      {
        title: 'Maldives Ultimate Package',
        destinationId: destinations[0]._id,
        basePrice: 45000,
        guestCapacity: 150,
        durationDays: 5,
        includes: ['venue', 'planner', 'photography', 'catering'],
        createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000),
      },
    ]);

    // 6. Bookings (activity)
    const bookings = await Booking.insertMany([
      {
        userId: users[0]._id,
        destinationId: destinations[0]._id,
        packageId: packages[0]._id,
        plannerId: planners[0]._id,
        status: 'confirmed',
        guestCount: 120,
        budget: 50000,
        weddingDate: new Date('2024-12-15'),
        createdAt: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id,
        destinationId: destinations[1]._id,
        packageId: packages[0]._id,
        status: 'pending',
        guestCount: 80,
        budget: 35000,
        weddingDate: new Date('2024-10-20'),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    ]);

    // 7. Reviews (social proof)
    await Review.insertMany([
      {
        userId: users[0]._id,
        targetId: vendors[0]._id,
        targetType: 'vendor',
        rating: 5,
        reviewText: 'Amazing photography in Maldives! Highly recommend!',
        createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
      },
    ]);

    // 8. Sample Checklist
    await Checklist.create({
      bookingId: bookings[0]._id,
      title: 'Sarah\'s Maldives Wedding Checklist',
      items: [
        { text: 'Book venue', completed: true, dueDate: new Date('2024-09-01') },
        { text: 'Confirm catering', completed: false },
        { text: 'Finalize guest list', completed: true },
        { text: 'Schedule photography', completed: false },
      ],
      createdBy: planners[0]._id,
      createdByModel: 'Planner',
    });

    // 9. Gallery
    await Gallery.create({
      title: 'Maldives Paradise Gallery',
      type: 'destination',
      entityId: destinations[0]._id,
      entityType: 'Destination',
      images: [
        { url: '/uploads/gallery/sample-maldives1.jpg', alt: 'Maldives beach' },
        { url: '/uploads/gallery/sample-maldives2.jpg', alt: 'Sunset wedding' },
      ],
    });

    console.log('✅ Seeded 3 users, 2 planners, 3 vendors, 2 destinations, 1 package, 2 bookings, reviews, checklist, gallery!');
    console.log('👥 Users: sarah@example.com / john@example.com');
    console.log('💼 Planner: eliteplanners@gmail.com');
    console.log('🏪 Vendor: maldivesphoto@gmail.com');
    console.log('🔑 Passwords: password123 / planner123 / vendor123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

export default seedData;
