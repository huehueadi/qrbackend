import mongoose from "mongoose";

const scanAnalyticsSchema = new mongoose.Schema({
    qrCodeId: { type: String, required: true },
  scan_time: { type: Date, required: true },
  device_type: { type: String, required: true },
  ip_address: { type: String, required: true },
  location: { type: Object, required: true },
  redirection_link: { type: mongoose.Schema.Types.ObjectId, ref: 'Qr', required: true },
})

const Analytics = mongoose.model("Analytics", scanAnalyticsSchema)

export default Analytics