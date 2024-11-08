import geoip from "geoip-lite";
import Qr from "../models/qrModel.js";
import Analytics from "../models/scanAnalytics.js";

export const trackScan = async (req, res) => {
  const { qrCodeId } = req.params; 
  const userAgent = req.get('User-Agent');  
  const ip = req.ip; 

  const geo = geoip.lookup(ip);

  try {
    
    const qrCodeData = await Qr.findOne({ qrCodeId });

    if (!qrCodeData) {
      return res.status(404).json({ message: 'QR code not found' });
    }
    const existingScan = await Analytics.findOne({
      qrCodeId,
      ip_address: ip,
    });

    if (!existingScan) {
      
      const analyticsData = new Analytics({
        qrCodeId,
        scan_time: new Date(), 
        device_type: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',  
        ip_address: ip,
        location: geo ? { country: geo.country, city: geo.city } : { country: 'Unknown', city: 'Unknown' },  // Use geoip for location
        redirection_link: qrCodeData._id,  // Link to the QR code document
      });

      await analyticsData.save();  // Save to the database
      console.log('Analytics saved:', analyticsData);  // Log for debugging
    }

    // Redirect to the associated URL
    res.redirect(qrCodeData.url);

  } catch (err) {
    console.error('Error processing redirection:', err);
    res.status(500).json({ message: 'Error processing redirection' });
  }
};
