import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide task title'],
    trim: true,
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide a short description'],
    trim: true,
  },
  fullDescription: {
    type: String,
    required: [true, 'Please provide a full description'],
    trim: true,
  },
  budget: {
    type: Number,
    required: [true, 'Please provide budget amount'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Please provide task location'],
    default: 'Remote',
  },
  rating: {
    type: Number,
    default: 5.0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
  },
  clientName: {
    type: String,
    required: [true, 'Please provide client name'],
  },
  clientEmail: {
    type: String,
    required: [true, 'Please provide client email'],
  }
}, {
  timestamps: true,
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
