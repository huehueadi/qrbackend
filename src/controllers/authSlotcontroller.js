import Qr from "../models/qrModel.js";
import Slot from "../models/slotmodel.js";

export const createSlot = async (req, res) => {
    const { qrCodeId, startTime, endTime, defaultLink, durationInMinutes } = req.body;
  
    // Validate the required fields
    if (!qrCodeId || !startTime || !endTime || !defaultLink || !durationInMinutes) {
      return res.status(400).json({ message: 'qrCodeId, startTime, endTime, defaultLink, and durationInMinutes are required' });
    }
  
    try {
      // Validate that the QR Code exists
      const existingQrCode = await Qr.findOne({ qrCodeId });
      if (!existingQrCode) {
        return res.status(404).json({ message: 'QR Code not found' });
      }
  
      // Convert startTime and endTime to Date objects
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);
  
      // Validate that the end time is after the start time
      if (endDate <= startDate) {
        return res.status(400).json({ message: 'End time must be after start time.' });
      }
  
      // Create a new slot object
      const newSlot = new Slot({
        qrCodeId,
        startTime: startDate,  // Store as Date object
        endTime: endDate,  // Store as Date object
        defaultLink,
        durationInMinutes,
      });
  
      // Save the new slot to the database
      await newSlot.save();
  
      // Respond with success message and slot details
      res.status(201).json({
        message: 'Slot created successfully!',
        slot: newSlot,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating slot', error: err.message });
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
