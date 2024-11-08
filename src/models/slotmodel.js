import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  qrCodeId: { type: String, required: true, unique: true },  // Reference to the QR code
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  defaultLink: { type: String, required: true },  // The fallback URL after the slot expires
});

const Slot = mongoose.model('Slot', slotSchema);

export default Slot;
