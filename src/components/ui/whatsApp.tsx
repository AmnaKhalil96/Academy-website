"use client";
import { FaWhatsapp } from "react-icons/fa";

const Page = () => {
  const handleWhatsAppClick = () => {
    // Pakistani number format: +92 followed by the number without leading 0
    const phoneNumber = "+447523716075";
    // Include a default message (optional)
    const message = "Hello! I would like to know more about your courses.";
    // Create the WhatsApp URL with phone number and encoded message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div >
      {/* Main Content */}
      {/* <div className="container mx-auto px-4 py-12"> */}
        {/* <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Our Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help! Click the WhatsApp button to chat with us directly.
          </p>
        </div> */}
      {/* </div> */}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Page;

