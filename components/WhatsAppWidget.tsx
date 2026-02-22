"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppWidget() {
  const phoneNumber = "919876543210";
  const message = encodeURIComponent(
    "Hi, I'd like to enquire about your textile processing services.",
  );

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:bg-[#20BA5C] flex items-center justify-center transition-all duration-200"
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
}
