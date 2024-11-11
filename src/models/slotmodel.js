// models/slotmodel.js (example update to Slot schema)
import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  qrCodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Qr' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  redirectionUrl: { type: String, required: true }, // New field for slot redirection
  defaultUrl: { type: String, required: true }, // New field for default URL
  durationInMinutes: { type: Number, required: true },
});

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;
