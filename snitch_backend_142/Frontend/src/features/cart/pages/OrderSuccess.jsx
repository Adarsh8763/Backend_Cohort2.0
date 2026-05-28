import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../products/components/Navbar.jsx"; 

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="text-[#2a2724] antialiased min-h-screen flex flex-col bg-[#fcfaf8] font-['Inter',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>
      
      {/* ── Navbar ── */}
      <Navbar backButton={false} showSearch={false} cartCount={0} />

      {/* ── Main Content ── */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-16 lg:px-20 pt-10 pb-24 md:pt-16 md:pb-32 flex items-center justify-center">
        <div className="max-w-[760px] w-full bg-[#fcfaf8] border border-[#e8e2d8] p-10 md:p-16 lg:p-20 relative">
          
          {/* Subtle Corner Accents (Editorial touch) */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#8c6b4a] opacity-60" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#8c6b4a] opacity-60" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#8c6b4a] opacity-60" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#8c6b4a] opacity-60" />

          {/* Animated Success Icon */}
          <div className="flex justify-center mb-10">
            <div className="w-[64px] h-[64px] md:w-[84px] md:h-[84px] rounded-full border border-[#e8e2d8] flex items-center justify-center animate-in zoom-in duration-1000 bg-[#faf8f5]/50 shadow-[0_0_40px_rgba(140,107,74,0.06)] relative overflow-hidden">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8c6b4a"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[dash_1.5s_ease-out_forwards] [stroke-dasharray:100] [stroke-dashoffset:100]"
              >
                <polyline points="20 6 9 17 4 12" />
                <style>{`
                  @keyframes dash {
                    to { stroke-dashoffset: 0; }
                  }
                `}</style>
              </svg>
            </div>
          </div>

          {/* Thank You Headers */}
          <div className="text-center mb-14 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 fill-mode-both">
            <p className="text-[10px] uppercase tracking-[0.30em] text-[#8c8680] mb-4 font-semibold">
              Payment Complete
            </p>
            <h1 className="font-['Playfair_Display',serif] text-[36px] md:text-[52px] text-[#2a2724] leading-[1.1] mb-6">
              Thank You <br />
              <span className="italic text-[#8c6b4a]">for your order</span>
            </h1>
            <div className="w-12 h-px bg-[#d0c8b8] mx-auto mb-6" />
            <p className="text-[14px] text-[#6e6560] max-w-[420px] mx-auto leading-relaxed font-light">
              Your order has been received and is being processed with the utmost care. A confirmation email has been sent to your address.
            </p>
          </div>

          {/* Order Details Grid */}
          <div className="border-t border-b border-[#e8e2d8] py-8 mb-14 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both bg-[#faf7f3]/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
              <div className="text-center md:border-r border-[#e8e2d8]">
                <p className="text-[9.5px] uppercase tracking-[0.22em] text-[#8c8680] mb-2.5 font-semibold">
                  Order Number
                </p>
                <p className="font-['Playfair_Display',serif] text-[17px] text-[#2a2724] truncate px-2">
                  {orderId || "#SN-00000"}
                </p>
              </div>
              <div className="text-center md:border-r border-[#e8e2d8]">
                <p className="text-[9.5px] uppercase tracking-[0.22em] text-[#8c8680] mb-2.5 font-semibold">
                  Date
                </p>
                <p className="font-['Playfair_Display',serif] text-[17px] text-[#2a2724]">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="text-center md:border-r border-[#e8e2d8]">
                <p className="text-[9.5px] uppercase tracking-[0.22em] text-[#8c8680] mb-2.5 font-semibold">
                  Status
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8c6b4a] animate-pulse" />
                  <p className="font-['Playfair_Display',serif] text-[17px] text-[#2a2724] leading-none">
                    Confirmed
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[9.5px] uppercase tracking-[0.22em] text-[#8c8680] mb-2.5 font-semibold">
                  Delivery
                </p>
                <p className="font-['Playfair_Display',serif] text-[17px] text-[#2a2724]">
                  3–5 Days
                </p>
              </div>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both px-4 md:px-0">
            <button
              onClick={() => navigate("/")}
              className="py-4 px-10 bg-[#2a2724] text-white text-[10.5px] font-bold tracking-[0.26em] uppercase transition-all duration-500 hover:bg-[#8c6b4a] w-full sm:w-auto"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="py-4 px-10 bg-transparent text-[#2a2724] text-[10.5px] font-bold tracking-[0.26em] uppercase transition-all duration-500 hover:bg-[#faf7f3] border border-[#2a2724] w-full sm:w-auto"
            >
              View Orders
            </button>
          </div>
          
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#fcfaf8] border-t border-[#e8e2d8] mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-5 md:px-16 lg:px-20 py-11 max-w-[1440px] mx-auto gap-8 md:gap-0">
          <div className="font-['Playfair_Display',serif] text-[20px] tracking-[0.22em] text-[#8c6b4a] uppercase">
            SNITCH
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {["Journal", "Privacy", "Terms", "Shipping"].map((link) => (
              <a
                key={link}
                className="text-[10.5px] uppercase tracking-[0.16em] text-[#736e68] font-medium hover:text-[#8c6b4a] transition-all duration-300"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="text-[10.5px] uppercase tracking-[0.16em] text-[#736e68] font-medium text-center md:text-right">
            © 2026 SNITCH. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderSuccess;
