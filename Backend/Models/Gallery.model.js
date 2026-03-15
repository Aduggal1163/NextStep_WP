import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'Wedding photo',
  },
  description: {
    type: String,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'uploadedByModel',
  },
  uploadedByModel: {
    type: String,
    enum: ['Vendor', 'Planner', 'Admin'],
  },
  tags: [{
    type: String,
  }],
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['destination', 'vendor', 'package', 'testimonial'],
    required: true,
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  images: [ImageSchema],
  public: {
    type: Boolean,
    default: true,
  },
  // Virtuals for polymorphic refs
  entityType: {
    type: String,
    enum: ['Destination', 'Vendor', 'Package'],
    required: true,
  },
}, { timestamps: true });

GallerySchema.virtual('destination', {
  ref: 'Destination',
  localField: 'entityId',
  foreignField: '_id',
  justOne: true,
});

GallerySchema.virtual('vendor', {
  ref: 'Vendor',
  localField: 'entityId',
  foreignField: '_id',
  justOne: true,
});

GallerySchema.virtual('package', {
  ref: 'Package',
  localField: 'entityId',
  foreignField: '_id',
  justOne: true,
});

GallerySchema.set('toJSON', { virtuals: true });
GallerySchema.set('toObject', { virtuals: true });

const Gallery = mongoose.model('Gallery', GallerySchema);
export default Gallery;
