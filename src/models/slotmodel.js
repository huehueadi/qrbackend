// models/slotmodel.js (example update to Slot schema)
import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  qrCodeId: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  redirectionUrl: { type: String, required: true },
});

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;
