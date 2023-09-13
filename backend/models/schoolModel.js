import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    default: 'Calgary',
    required: true,
  },
  province: {
    type: String,
    default: 'Alberta',
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  faxNumber: {
    type: Number,
  },
  grades: {
    type: String,
  },
  postSecondary: {
    type: Boolean,
  },
  dataSource: {
    type: Boolean,
  },
  elementary: {
    type: Boolean,
  },
  juniorHigh: {
    type: Boolean,
  },
  seniorHigh: {
    type: Boolean,
  },
  longitude: {
    type: Number,
  },
  latitude: {
    type: Number,
  }
});

const School = mongoose.model('school', schoolSchema);

export default School;