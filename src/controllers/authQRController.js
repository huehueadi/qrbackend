import QRCode from "qrcode";
import Qr from "../models/qrModel.js";

// Generate QR Code
export const generateQrCode = async (req, res) => {
  const { qrCodeId, url } = req.body;

  // Check if qrCodeId and url are provided
  if (!qrCodeId || !url) {
    return res.status(400).json({ message: 'qrCodeId and url are required' });
  }

  try {
    // Check if QR Code with the same ID already exists
    const existingQrCode = await Qr.findOne({ qrCodeId });
    if (existingQrCode) {
      return res.status(400).json({ message: 'QR Code ID already exists' });
    }

    // Save new QR Code entry to database
    const newQrCode = new Qr({ qrCodeId, url });
    await newQrCode.save();

    // Generate QR Code image URL pointing to the redirect URL
    QRCode.toDataURL(`https://qrbackend-aio3.onrender.com/api/redirect/${qrCodeId}`, (err, qrCodeUrl) => {
      if (err) {
        return res.status(500).json({ message: 'Error generating QR code' });
      }

      res.json({
        message: 'QR code generated successfully!',
        qrCodeUrl,
        qrCodeId
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating QR code' , error: err.message || err,});
  }
};

// Redirect to the stored URL when QR code is scanned
export const redirectQrCode = async (req, res) => {
  const { qrCodeId } = req.params;

  try {
    console.log('Received QR Code ID:', qrCodeId); 

    // Find the QR code by its ID
    const qrCode = await Qr.findOne({ qrCodeId });
    console.log('Database Query Result:', qrCode);

    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    // Redirect to the stored URL
    res.redirect(qrCode.url);
  } catch (err) {
    console.error('Error processing redirection:', err);
    res.status(500).json({ message: 'Error processing redirection' });
  }
};

// Update the URL associated with a QR code
export const updateQrCodeUrl = async (req, res) => {
  const { qrCodeId } = req.params;
  const { newUrl } = req.body;

 
  if (!newUrl) {
    return res.status(400).json({ message: 'New URL is required' });
  }

  try {
   
    const qrCode = await Qr.findOne({ qrCodeId });

    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    // Update the URL
    qrCode.url = newUrl;
    await qrCode.save();

    res.json({ message: 'QR code URL updated successfully!' });
  } catch (err) {
    console.error('Error updating QR code URL:', err);
    res.status(500).json({ message: 'Error updating QR code URL' });
  }
};
