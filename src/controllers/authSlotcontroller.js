import Slot from "../models/slotmodel.js";

export const createSlot = async (req, res) => {
    const { qrCodeId, startTime, endTime, defaultLink } = req.body; 

    try {
       
        if (!qrCodeId || !startTime || !endTime || !defaultLink) {
            return res.status(400).json({
                 message: "Slot Data fields are required",
                 success:false 
                });
        }

        const newSlot = new Slot({
            qrCodeId,
            startTime,
            endTime,
            defaultLink,
        });

        await newSlot.save();

        res.status(201).json({ message: "Slot created successfully", slot: newSlot });
    } catch (error) {
        console.error("Error creating slot:", error);
        res.status(500).json({ message: "Error creating slot", error });
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
