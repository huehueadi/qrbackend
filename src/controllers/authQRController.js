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

// import fetch from 'node-fetch';
// import QRCode from 'qrcode';
// import Qr from '../models/qrModel.js';
// import Analytics from '../models/scanAnalytics.js';
// import Slot from '../models/slotmodel.js';


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

//     const newQrCode = new Qr({ qrCodeId, url });
//     await newQrCode.save();

//     QRCode.toDataURL(`https://qrbackend-aio3.onrender.com/api/redirect/${qrCodeId}`, (err, qrCodeUrl) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error generating QR code' });
//       }

//       res.json({
//         message: 'QR code generated successfully!',
//         qrCodeUrl, // URL for the generated QR code image
//         qrCodeId,  // The ID of the generated QR code
//       });
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error generating QR code' });
//   }
// };

// export const redirectQrCode = async (req, res) => {
//   const { qrCodeId } = req.params;
//   const userAgent = req.get("User-Agent");
//   const ip = req.ip;

//   const ipinfoUrl = `http://ipinfo.io/${ip}?token=eb327d51a73b1b`;

//   try {
//     // Fetch geo-location data
//     let location = { country: "Unknown", city: "Unknown" };
//     try {
//       const geoResponse = await fetch(ipinfoUrl);
//       const geo = await geoResponse.json();
//       if (geo && geo.country && geo.city) {
//         location = { country: geo.country, city: geo.city };
//       }
//     } catch (error) {
//       console.error("Geo-location fetch failed:", error);
//     }

//     // Find the QR code document
//     const qrCodeData = await Qr.findOne({ qrCodeId });
//     if (!qrCodeData) {
//       return res.status(404).json({ message: "QR code not found" });
//     }

//     // Find slot data associated with the QR code
//     const slotData = await Slot.findOne({ qrCodeId });

//     if (!slotData) {
//       return res.status(404).json({ message: 'Slot not found' });
//     }

//     // Determine the redirect URL (default or redirection based on time)
//     let redirectUrl = slotData.defaultUrl;  // Default URL for first 2 minutes

//     const currentTime = new Date();
//     const slotCreationTime = new Date(slotData.createdAt);
//     const twoMinutesInMillis = 2 * 60 * 1000; // 2 minutes in milliseconds
//     const timeElapsed = currentTime - slotCreationTime;

//     if (timeElapsed > twoMinutesInMillis) {
//       // After 2 minutes, use the redirection URL
//       redirectUrl = slotData.redirectionUrl;
//     }

//     // Save analytics data (for tracking purpose)
//     const analyticsData = new Analytics({
//       qrCodeId,
//       scan_time: new Date(),
//       device_type: userAgent.includes("Mobile") ? "Mobile" : "Desktop",
//       ip_address: ip,
//       location: location,
//       redirection_link: qrCodeData._id,
//     });

//     await analyticsData.save();

//     // Redirect user
//     res.redirect(redirectUrl);
//   } catch (err) {
//     console.error("Error processing redirection:", err);
//     res.status(500).json({ message: "Error processing redirection" });
//   }
// };
// export const updateQrCodeUrl = async (req, res) => {
//   const { qrCodeId } = req.params;
//   const { newUrl, redirectionUrl, defaultUrl } = req.body;

//   if (!newUrl || !redirectionUrl || !defaultUrl) {
//     return res.status(400).json({ message: 'New URL, Redirection URL, and Default URL are required' });
//   }

//   try {
//     // Find the QR code
//     const qrCode = await Qr.findOne({ qrCodeId });

//     if (!qrCode) {
//       return res.status(404).json({ message: 'QR code not found' });
//     }

//     // Update the QR code URL
//     qrCode.url = newUrl;
//     await qrCode.save();

//     // Find the associated slot
//     const slotData = await Slot.findOne({ qrCodeId });

//     if (slotData) {
//       // Update slot URLs
//       slotData.redirectionUrl = redirectionUrl;
//       slotData.defaultUrl = defaultUrl;
//       await slotData.save();

//       res.json({ message: 'QR code and slot URLs updated successfully!' });
//     } else {
//       res.status(404).json({ message: 'Slot not found for the QR code' });
//     }
//   } catch (err) {
//     console.error('Error updating QR code or slot URLs:', err);
//     res.status(500).json({ message: 'Error updating QR code or slot URLs' });
//   }
// };


import moment from 'moment-timezone';
import QRCode from 'qrcode';
import Qr from '../models/qrModel.js';
import Slot from '../models/slotmodel.js';


export const generateQrCode = async (req, res) => {
  const { qrCodeId, url } = req.body;

  if (!qrCodeId || !url) {
    return res.status(400).json({ message: 'QR Code ID and URL are required.' });
  }

  try {
    const existingQrCode = await Qr.findOne({ qrCodeId });
    if (existingQrCode) {
      return res.status(400).json({ message: 'QR Code ID already exists.' });
    }

    // Save the new QR code with the default URL
    const newQrCode = new Qr({ qrCodeId, url });
    await newQrCode.save();

    // Generate the QR code image URL
    QRCode.toDataURL(`https://qrbackend-aio3.onrender.com/api/redirect/${qrCodeId}`, (err, qrCodeUrl) => {
      if (err) {
        return res.status(500).json({ message: 'Error generating QR code.' });
      }
      res.json({
        message: 'QR code generated successfully!',
        qrCodeUrl,
        qrCodeId,
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating QR code.' });
  }
};


export const redirectQrCode = async (req, res) => {
  const { qrCodeId } = req.params;
  try {
    const qrCodeData = await Qr.findOne({ qrCodeId });
    if (!qrCodeData) {
      return res.status(404).json({ message: 'QR code not found.' });
    }
    const currentTime = moment.utc(); 

    const slotData = await Slot.findOne({ qrCodeId });

    let redirectUrl = qrCodeData.url; 

    console.log("Current Time (UTC):", currentTime.format('YYYY-MM-DD HH:mm:ss'));

    if (slotData) {
      const { startTime, endTime, redirectionUrl } = slotData;
     
      const slotStartTime = moment.utc(startTime); 
      const slotEndTime = moment.utc(endTime);  
      
      console.log("Slot Start Time (UTC):", slotStartTime.format('YYYY-MM-DD HH:mm:ss'));
      console.log("Slot End Time (UTC):", slotEndTime.format('YYYY-MM-DD HH:mm:ss'));

      if (currentTime.isBetween(slotStartTime, slotEndTime, null, '[]')) {
       
        redirectUrl = redirectionUrl;
      } else {
        console.log("Current time is out of slot time window.");
      }
    }
    console.log("Final redirectUrl:", redirectUrl);

    if (!redirectUrl) {
      throw new Error("Redirection URL is undefined or invalid.");
    }
    res.redirect(redirectUrl);

  } catch (err) {
    console.error('Error during redirection:', err);
    res.status(500).json({ message: 'Error processing redirection.' });
  }
};

export const updateQrCodeUrl = async (req, res) => {
    const { qrCodeId } = req.params;
    const { newUrl, redirectionUrl, defaultUrl } = req.body;
  
    if (!newUrl || !redirectionUrl || !defaultUrl) {
      return res.status(400).json({ message: 'New URL, Redirection URL, and Default URL are required' });
    }
  
    try {
      // Find the QR code
      const qrCode = await Qr.findOne({ qrCodeId });
  
      if (!qrCode) {
        return res.status(404).json({ message: 'QR code not found' });
      }
      
      qrCode.url = newUrl;
      await qrCode.save();
      
      const slotData = await Slot.findOne({ qrCodeId });
  
      if (slotData) {
       
        slotData.redirectionUrl = redirectionUrl;
        slotData.defaultUrl = defaultUrl;
        await slotData.save();
  
        res.json({ message: 'QR code and slot URLs updated successfully!' });
      } else {
        res.status(404).json({ message: 'Slot not found for the QR code' });
      }
    } catch (err) {
      console.error('Error updating QR code or slot URLs:', err);
      res.status(500).json({ message: 'Error updating QR code or slot URLs' });
    }
  };
  