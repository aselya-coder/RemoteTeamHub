const sanitizeNumber = (num: string) => {
  const digits = (num || "").replace(/[^0-9]/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
};

export const getWhatsAppLink = (message: string, number?: string) => {
  const fallback = "6285646420488";
  const n = sanitizeNumber(number || fallback);
  const text = encodeURIComponent(message || "Halo");
  return `https://wa.me/${n}?text=${text}`;
};

