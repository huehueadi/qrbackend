import Qr from "../models/qrModel.js";
import Slot from "../models/slotmodel.js";
export const createSlot = async (req, res) => {
  const { qrCodeId, startTime, endTime, redirectionUrl } = req.body;

  if (!qrCodeId || !startTime || !endTime || !redirectionUrl) {
    return res.status(400).json({
      message: 'qrCodeId, startTime, endTime, and redirectionUrl are required.',
    });
  }

  try {
    // Find the QR code to ensure it exists
    const qrCode = await Qr.findOne({ qrCodeId });
    if (!qrCode) {
      return res.status(404).json({ message: 'QR Code not found' });
    }

    // Validate start and end time
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    // Create new slot
    const newSlot = new Slot({
      qrCodeId,
      startTime: start,
      endTime: end,
      redirectionUrl,
    });

    await newSlot.save();
    res.status(201).json({ message: 'Slot created successfully', newSlot });
  } catch (err) {
    console.error('Error creating slot:', err);
    res.status(500).json({ message: 'Error creating slot' });
  }
};

export const updateSlot = async(req, res)=>{
    try {
        const {slotId} = req.params

        const existSlot = await Slot.findById(slotId)
        if(!existSlot){
            res.status(400).json({
                message:"Slot is not existed",
                sucess:true
            })
        }
        const slotUpdate = await Slot.findByIdAndUpdate(slotId)

        res.status(202).json({
            message:"Slot updated Successfully",
            sucess:true,
            slotUpdate
        })
    } catch (error) {
        res,status(501).json({
            message:"Internal Server error",
            sucess:false
        })
    }
} 
