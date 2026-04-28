import Gallery from '../Models/Gallery.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Note: In production use cloud storage like Cloudinary/AWS S3
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createGallery = async (req, res) => {
  try {
    const { title, type, entityId, entityType } = req.body;
    
    const gallery = new Gallery({
      title,
      type,
      entityId,
      entityType,
      images: req.files ? req.files.map(file => ({
        url: `/uploads/gallery/${file.filename}`,
        alt: file.originalname,
      })) : [],
    });
    
    await gallery.save();
    
    const populated = await Gallery.findById(gallery._id)
      .populate('destination', 'name')
      .populate('vendor', 'businessName')
      .populate('package', 'title');
    
    res.status(201).json({
      message: 'Gallery created',
      gallery: populated,
    });
  } catch (error) {
    console.error('Gallery create error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getGalleries = async (req, res) => {
  try {
    const { type, entityId } = req.query;
    const filter = {};
    
    if (type) filter.type = type;
    if (entityId) filter.entityId = entityId;
    
    const galleries = await Gallery.find(filter)
      .populate('destination', 'name images')
      .populate('vendor', 'businessName servicesOffered');
    
    res.status(200).json({
      message: 'Galleries retrieved',
      galleries,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getGallery = async (req, res) => {
  try {
    const { galleryId } = req.params;
    const gallery = await Gallery.findById(galleryId)
      .populate('destination')
      .populate('vendor');
    
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    
    res.status(200).json({
      message: 'Gallery retrieved',
      gallery,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { galleryId } = req.params;
    const gallery = await Gallery.findById(galleryId);
    
    if (req.files && req.files.length > 0) {
      gallery.images.push(...req.files.map(file => ({
        url: `/uploads/gallery/${file.filename}`,
        alt: file.originalname,
      })));
    }
    
    await gallery.save();
    res.status(200).json({ message: 'Gallery updated', gallery });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
