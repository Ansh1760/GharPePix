import { CONFIG } from '../constants/config';

/**
 * Formats and triggers the WhatsApp API redirect for service booking.
 */
export const sendBookingToWhatsApp = (bookingDetails) => {
  const message = `🛠️ *New Service Booking* 🛠️
------------------------------
👤 *Name:* ${bookingDetails.name}
🔧 *Service:* ${bookingDetails.service}
📝 *Issue:* ${bookingDetails.description}
📍 *Address:* ${bookingDetails.address}
🏢 *Landmark:* ${bookingDetails.landmark || 'Not provided'}
📅 *Date:* ${bookingDetails.date}
⏰ *Time Slot:* ${bookingDetails.time}
------------------------------
🚀 _GharPeFix - Professional Home Services At Your Doorstep_`;

  triggerWhatsAppRedirect(message);
};

export const sendComplaintToWhatsApp = (complaintDetails) => {
  const message = `🚨 *New Complaint - GharPeFix* 🚨
------------------------------
👤 *Customer Name:* ${complaintDetails.name}
📱 *Mobile Number:* ${complaintDetails.mobile}
🏷️ *Booking ID:* ${complaintDetails.bookingId || 'Not provided'}
📁 *Complaint Category:* ${complaintDetails.category}
📝 *Complaint Description:* ${complaintDetails.description}
------------------------------
🚀 _GharPeFix Complaint Support Desk_`;

  triggerWhatsAppRedirect(message);
};

/**
 * Internal helper to encode text and redirect using WhatsApp web/mobile click-to-chat API.
 */
const triggerWhatsAppRedirect = (text) => {
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${CONFIG.ADMIN_WHATSAPP_NUMBER}?text=${encodedText}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};
