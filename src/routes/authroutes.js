import express from 'express';
import { generateQrCode, redirectQrCode, updateQrCodeUrl } from '../controllers/authQRController.js';
import { createSlot } from '../controllers/authSlotcontroller.js';

const router = express.Router()

router.post('/generate', generateQrCode);

router.get('/redirect/:qrCodeId', redirectQrCode);

router.put('/update/:qrCodeId', updateQrCodeUrl);

router.post('/create-slot', createSlot);


// router.get('/redirect/:qrCodeId', trackScan);

export default router