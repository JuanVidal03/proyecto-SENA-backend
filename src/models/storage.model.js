import mongoose from 'mongoose';

const StorageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }
});

export const Storage = mongoose.model('Storage', StorageSchema);