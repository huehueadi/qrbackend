import express from 'express';
import { generateQrCode, redirectQrCode, updateQrCodeUrl } from '../controllers/authQRController.js';

const router = express.Router()

router.post('/generate', generateQrCode);

router.get('/redirect/:qrCodeId', redirectQrCode);

router.put('/update/:qrCodeId', updateQrCodeUrl);

export default router