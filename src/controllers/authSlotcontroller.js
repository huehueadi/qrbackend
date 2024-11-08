import Qr from "../models/qrModel.js";
import Slot from "../models/slotmodel.js";

export const createSlot = async (req, res) => {
    const { qrCodeId, startTime, endTime, defaultLink, durationInMinutes } = req.body;
  
    if (!qrCodeId || !startTime || !endTime || !defaultLink || !durationInMinutes) {
      return res.status(400).json({ message: 'qrCodeId, startTime, endTime, defaultLink, and durationInMinutes are required' });
    }
  
    try {
      // Validate that the QR Code exists
      const existingQrCode = await Qr.findOne({ qrCodeId });
      if (!existingQrCode) {
        return res.status(400).json({ message: 'QR Code not found' });
      }
  
      // Calculate duration in minutes
      const durationInMs = (new Date(endTime) - new Date(startTime)); // Duration in milliseconds
      if (durationInMs <= 0) {
        return res.status(400).json({ message: 'End time must be after start time.' });
      }
  
      // Create a new slot
      const newSlot = new Slot({
        qrCodeId,
        startTime,
        endTime,
        defaultLink,
        durationInMinutes,
      });
  
      await newSlot.save();
  
      res.status(201).json({
        message: 'Slot created successfully!',
        slot: newSlot,
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating slot',  error: err.message, });
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
