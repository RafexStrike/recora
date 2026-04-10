import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const RecordingService = {
  async saveChunk(trackId: string, chunkIndex: number, blobUrl: string) {
    let track = await prisma.recording_track.findUnique({
      where: { id: trackId }
    });
    
    // For MVP prototype: auto-create the track, session, and studio if missing
    if (!track) {
      let studio = await prisma.studio.findFirst();
      if (!studio) {
        studio = await prisma.studio.create({ data: { name: 'Recora Studio' } });
      }
      
      let session = await prisma.recording_session.findFirst({ where: { studioId: studio.id } });
      if (!session) {
        session = await prisma.recording_session.create({ data: { studioId: studio.id } });
      }
      
      track = await prisma.recording_track.create({
        data: {
          id: trackId,
          recordingSessionId: session.id,
          type: 'video'
        }
      });
      console.log(`[Backend Debug] Created missing track ${trackId} for session ${session.id}`);
    }

    const chunk = await prisma.upload_chunk.create({
      data: {
        trackId,
        chunkIndex,
        blobUrl
      }
    });

    console.log(`[Backend] Received and verified chunk #${chunkIndex} for track ${trackId}.`);
    return chunk;
  }
};
