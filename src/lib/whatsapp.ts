export function getWhatsAppLink(message: string, phoneNumber?: string): string {
  // Default WhatsApp number atau gunakan yang diberikan
  const whatsapp = phoneNumber || "6285646420488";
  
  // Encode message untuk URL
  const encodedMessage = encodeURIComponent(message);
  
  // Format: https://wa.me/[number]?text=[message]
  return `https://wa.me/${whatsapp}?text=${encodedMessage}`;
}

export function openWhatsApp(message: string, phoneNumber?: string) {
  window.open(getWhatsAppLink(message, phoneNumber), '_blank');
}
