import geoip from "geoip-lite";
import QRCode from "qrcode";
import Qr from "../models/qrModel.js";
import Analytics from "../models/scanAnalytics.js";

// Generate QR Code
export const generateQrCode = async (req, res) => {
  const { qrCodeId, url } = req.body;

  if (!qrCodeId || !url) {
    return res.status(400).json({ message: 'qrCodeId and url are required' });
  }

  try {
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
// export const redirectQrCode = async (req, res) => {
//   const { qrCodeId } = req.params;

//   try {
//     console.log('Received QR Code ID:', qrCodeId); 

//     // Find the QR code by its ID
//     const qrCode = await Qr.findOne({ qrCodeId });
//     console.log('Database Query Result:', qrCode);

//     if (!qrCode) {
//       return res.status(404).json({ message: 'QR code not found' });
//     }

//     // Redirect to the stored URL
//     res.redirect(qrCode.url);
//   } catch (err) {
//     console.error('Error processing redirection:', err);
//     res.status(500).json({ message: 'Error processing redirection' });
//   }
// };


export const redirectQrCode = async (req, res) => {
  const { qrCodeId } = req.params; 
  const userAgent = req.get('User-Agent');  
  const ip = req.ip;  
  const geo = geoip.lookup(ip);  
  try {
   
    const qrCodeData = await Qr.findOne({ qrCodeId });

    if (!qrCodeData) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    const analyticsData = new Analytics({
      qrCodeId,
      scan_time: new Date(),  
      device_type: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',  
      ip_address: ip,  
      location: geo ? { country: geo.country, city: geo.city } : { country: 'Unknown', city: 'Unknown' }, 
      redirection_link: qrCodeData._id,  
    });

    await analyticsData.save(); 
    console.log('Analytics saved:', analyticsData);  

    // Redirect the user to the URL associated with the QR code
    res.redirect(qrCodeData.url);

  } catch (err) {
    console.error('Error processing redirection:', err);
    res.status(500).json({ message: 'Error processing redirection', error: err.message });
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
