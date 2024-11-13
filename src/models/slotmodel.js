import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  qrCodeId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectionUrl: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Slot = mongoose.model('Slot', SlotSchema);
export default Slot;
