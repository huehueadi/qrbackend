import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
  qrCodeId: { type: String, required: true, unique: true },
  url: { type: String, required: true },
});

const Qr = mongoose.model('QrCode', qrCodeSchema);

export default Qr
