// import geoip from "geoip-lite";
// import QRCode from "qrcode";
// import Qr from "../models/qrModel.js";
// import Analytics from "../models/scanAnalytics.js";
// // Generate QR Code
// export const generateQrCode = async (req, res) => {
//   const { qrCodeId, url } = req.body;

//   if (!qrCodeId || !url) {
//     return res.status(400).json({ message: 'qrCodeId and url are required' });
//   }
//   try {
//     const existingQrCode = await Qr.findOne({ qrCodeId });
//     if (existingQrCode) {
//       return res.status(400).json({ message: 'QR Code ID already exists' });
//     }

//     // Save new QR Code entry to database
//     const newQrCode = new Qr({ qrCodeId, url });
//     await newQrCode.save();

//     // Generate QR Code image URL pointing to the redirect URL
//     QRCode.toDataURL(`https://qrbackend-aio3.onrender.com/api/redirect/${qrCodeId}`, (err, qrCodeUrl) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error generating QR code' });
//       }

//         res.json({
//         message: 'QR code generated successfully!',
//         qrCodeUrl,
//         qrCodeId
//       });
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error generating QR code' , error: err.message || err,});
//   }
// };

// // Redirect to the stored URL when QR code is scanned
// // export const redirectQrCode = async (req, res) => {
// //   const { qrCodeId } = req.params;

// //   try {
// //     console.log('Received QR Code ID:', qrCodeId); 

// //     // Find the QR code by its ID
// //     const qrCode = await Qr.findOne({ qrCodeId });
// //     console.log('Database Query Result:', qrCode);

// //     if (!qrCode) {
// //       return res.status(404).json({ message: 'QR code not found' });
// //     }

// //     // Redirect to the stored URL
// //     res.redirect(qrCode.url);
// //   } catch (err) {
// //     console.error('Error processing redirection:', err);
// //     res.status(500).json({ message: 'Error processing redirection' });
// //   }
// // };

// export const redirectQrCode = async (req, res) => {
//   const { qrCodeId } = req.params; 
//   const userAgent = req.get('User-Agent');  
//   const ip = req.ip;  
//   const geo = geoip.lookup(ip);  
//   try {
   
//     const qrCodeData = await Qr.findOne({ qrCodeId });

//     if (!qrCodeData) {
//       return res.status(404).json({ message: 'QR code not found' });
//     }

//     const analyticsData = new Analytics({
//       qrCodeId,
//       scan_time: new Date(),  
//       device_type: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',  
//       ip_address: ip,  
//       location: geo ? { country: geo.country, city: geo.city } : { country: 'Unknown', city: 'Unknown' }, 
//       redirection_link: qrCodeData._id,  
//     });

//     await analyticsData.save(); 
//     console.log('Analytics saved:', analyticsData);  
//     // Redirect the user to the URL associated with the QR code
//     res.redirect(qrCodeData.url);

//   } catch (err) {
//     console.error('Error processing redirection:', err);
//     res.status(500).json({ message: 'Error processing redirection', error: err.message });
//   }
// };

// // Update the URL associated with a QR code
// export const updateQrCodeUrl = async (req, res) => {
//   const { qrCodeId } = req.params;
//   const { newUrl } = req.body;

 
//   if (!newUrl) {
//     return res.status(400).json({ message: 'New URL is required' });
//   }

//   try {
   
//     const qrCode = await Qr.findOne({ qrCodeId });

//     if (!qrCode) {
//       return res.status(404).json({ message: 'QR code not found' });
//     }

//     // Update the URL
//     qrCode.url = newUrl;
//     await qrCode.save();

//     res.json({ message: 'QR code URL updated successfully!' });
//   } catch (err) {
//     console.error('Error updating QR code URL:', err);
//     res.status(500).json({ message: 'Error updating QR code URL' });
//   }
// };

// export const getQr = async (req, res)=>{
//   try {
//      const fetchQr = await Qr.find()
//      res.status(200).json({
//       message:"Qr fetch sucessfully",
//       success:true,
//       fetchQr
//      })
//   } catch (error) {
//     res.status(502).json({
//       message:"Internal server error while fetching Qr codes",
//       success:false
//     })
//   }
// }

// export const deleteQr = async(req, res)=>{
//   try {
    
//   } catch (error) {
    
//   }
// }

import geoip from 'geoip-lite';
import QRCode from 'qrcode';
import Qr from '../models/qrModel.js';
import Analytics from '../models/scanAnalytics.js';
import Slot from '../models/slotmodel.js';

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

    const newQrCode = new Qr({ qrCodeId, url });
    await newQrCode.save();

    // Generate the QR code as an image URL
    QRCode.toDataURL(`https://qrbackend-aio3.onrender.com/api/redirect/${qrCodeId}`, (err, qrCodeUrl) => {
      if (err) {
        return res.status(500).json({ message: 'Error generating QR code' });
      }
      res.json({
        message: 'QR code generated successfully!',
        qrCodeUrl,
        qrCodeId,
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating QR code' });
  }
};


export const redirectQrCode = async (req, res) => {
  const { qrCodeId } = req.params;  
  const userAgent = req.get("User-Agent"); 
  const ip = req.ip; 

  const geo = geoip.lookup(ip); // Lookup geolocation based on IP

  try {
    // Find the QR code data based on qrCodeId
    const qrCodeData = await Qr.findOne({ qrCodeId });
    if (!qrCodeData) {
      return res.status(404).json({ message: "QR code not found" });
    }

    // Find the associated slot for the QR code
    const slotData = await Slot.findOne({ qrCodeId });

    let redirectUrl = qrCodeData.url; // Default redirection URL
    if (slotData) {
      const currentTime = new Date(); // Get current time

      // Convert the slot start and end times to Date objects
      const slotStartTime = new Date(slotData.startTime);
      const slotEndTime = new Date(slotData.endTime);

      // If the current time is within the slot start and end times, use the QR code's URL
      if (currentTime >= slotStartTime && currentTime <= slotEndTime) {
        redirectUrl = qrCodeData.url;
      } else {
        // If slot has expired, use the default link from the slot
        redirectUrl = slotData.defaultLink;
      }
    }

    // Save analytics data with redirection link (pass the ObjectId of the Qr document)
    const analyticsData = new Analytics({
      qrCodeId,
      scan_time: new Date(),
      device_type: userAgent.includes("Mobile") ? "Mobile" : "Desktop",
      ip_address: ip,
      location: geo ? { country: geo.country, city: geo.city } : { country: "Unknown", city: "Unknown" },
      // Save the ObjectId of the Qr document as redirection_link
      redirection_link: qrCodeData._id // Assign the ObjectId here (NOT the URL)
    });

    await analyticsData.save(); // Save analytics data
    console.log("Analytics saved:", analyticsData); // Log for debugging

    // Redirect the user to the final redirection link (URL)
    res.redirect(redirectUrl);
  } catch (err) {
    console.error("Error processing redirection:", err);
    if (!res.headersSent) {
      res.status(500).json({ message: "Error processing redirection" });
    }
  }
};

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