import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    qrCodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Qr' },
    brandName: String,
    startTime: Date,
    endTime: Date,
    redirectUrl: String,
});

const Slot = mongoose.model("Slot", slotSchema)

export default Slot