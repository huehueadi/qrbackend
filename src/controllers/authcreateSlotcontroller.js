import Qr from "../models/qrModel.js";
export const createSlot = async(req, res)=>{
    const { qrCodeId, redirectUrl, startTime, endTime } = req.body;

    try {
        const qrCode = await Qr.findOne({ qrCodeId });
        if (!qrCode) {
            return res.status(404).json({ message: 'QR Code not found.' });
        }

        qrCode.slots.push({ redirectUrl, startTime, endTime });
        await qrCode.save();
        res.status(200).json({ message: 'Time slot booked successfully.' });
    } catch (error) {
        console.error('Error booking time slot:', error);
        res.status(500).json({ message: 'Error booking time slot.' });
    }
};


