import Dexie, { Table } from 'dexie';

export interface UploadChunk {
  id?: number;
  trackId: string;
  chunkIndex: number;
  blob: Blob;
  status: 'pending' | 'uploaded' | 'failed';
  createdAt: number;
}

export class RecoraLocalDB extends Dexie {
  chunks!: Table<UploadChunk>;

  constructor() {
    super('RecoraLocalDB');
    // Schema defines primary key and indexed properties
    this.version(1).stores({
      chunks: '++id, trackId, chunkIndex, status' 
    });
  }
}

export const localDb = new RecoraLocalDB();
