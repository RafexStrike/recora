import { Request, Response } from 'express';
import { RecordingService } from './recording.service';

export const RecordingController = {
  async uploadChunk(req: Request, res: Response) {
    try {
      const { trackId, chunkIndex } = req.body;
      const file = req.file;

      if (!trackId || chunkIndex === undefined || !file) {
        return res.status(400).json({ error: 'Missing trackId, chunkIndex, or file.' });
      }

      // We use the file path or destination as blobUrl
      const blobUrl = file.path;
      const parsedIndex = parseInt(chunkIndex, 10);

      const chunk = await RecordingService.saveChunk(trackId, parsedIndex, blobUrl);

      return res.status(200).json({
        success: true,
        message: 'Chunk uploaded successfully',
        chunk
      });
    } catch (error: any) {
      console.error('[Backend Error] Error uploading chunk:', error.message);
      // Handle Prisma unique constraint failure (P2002) quietly or with 409 Conflict
      if (error.code === 'P2002') {
         return res.status(409).json({ error: 'Chunk already exists.' });
      }
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }
};
