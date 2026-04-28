import { Router } from 'express';
import { requireSignIn } from '../Middlewares/auth.middleware.js';
import {
  createGallery,
  getGalleries,
  getGallery,
  updateGallery,
} from '../Controller/Gallery.controller.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/gallery/';
    if (!require('fs').existsSync(uploadPath)) {
      require('fs').mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

const router = Router();

// Get all galleries or filtered
router.get('/', getGalleries);

// Get single gallery
router.get('/:galleryId', getGallery);

// Create gallery (admin/planner/vendor)
router.post('/', requireSignIn, upload.array('images', 10), createGallery);

// Add images to gallery
router.put('/:galleryId', requireSignIn, upload.array('images', 10), updateGallery);

export default router;
