import Qr from "../models/qrModel.js";
import Slot from "../models/slotmodel.js";
export const createSlot = async (req, res) => {
  const { qrCodeId, startTime, endTime, redirectionUrl } = req.body;

  if (!qrCodeId || !startTime || !endTime || !redirectionUrl) {
    return res.status(400).json({ message: 'QR Code ID, Start Time, End Time, and Redirection URL are required.' });
  }
  try {
   
    const qrCode = await Qr.findOne({ qrCodeId });
    if (!qrCode) {
      return res.status(404).json({ message: 'QR Code not found.' });
    }    
    const slot = new Slot({
      qrCodeId,
      startTime: new Date(startTime), 
      endTime: new Date(endTime),     
      redirectionUrl,
    });

    await slot.save();
    res.json({ message: 'Slot created successfully!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating slot.' });
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
