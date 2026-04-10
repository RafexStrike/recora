import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { RecordingController } from './recording.controller';

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, _file, cb) {
    const { trackId, chunkIndex } = req.body;
    cb(null, `${trackId}-chunk-${chunkIndex}-${Date.now()}.webm`);
  }
});

const upload = multer({ storage });

router.post('/upload-chunk', upload.single('blob'), RecordingController.uploadChunk);

export default router;
