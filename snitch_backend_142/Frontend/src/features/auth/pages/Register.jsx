import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    isSeller: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = formData.fullName && formData.email && formData.contactNumber && formData.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    // console.log("Form submitted:", formData);
    const data = {
      fullname: formData.fullName,
      email: formData.email,
      password: formData.password,
      contact: formData.contactNumber,
      isSeller: formData.isSeller,
    };
    await handleRegister(data);
    if(formData.isSeller){
      navigate("/seller/dashboard")
    }
    else{
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#fcfaf8] flex font-['Inter',sans-serif] text-[#33302c]">
      {/* ── LEFT PANEL (Image Section) ── */}
      <div className="hidden lg:block lg:w-[45%] relative bg-[#e0d7c6]">
        <img
          src="/fashion-model.png"
          alt="Luxury fashion editorial"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-[2000ms] ease-out"
        />
        {/* Soft overlay for elegance */}
        <div className="absolute inset-0 bg-[#4a3520]/10 mix-blend-multiply transition-opacity duration-1000 hover:opacity-50" />

        {/* Brand Name */}
        <div className="absolute top-10 left-10 z-10">
          <h1 className="font-['Playfair_Display',serif] text-white text-3xl tracking-[0.15em] uppercase drop-shadow-md">
            Snitch
          </h1>
        </div>
        
        {/* Tagline */}
        <div className="absolute bottom-10 left-10 z-10">
          <p className="text-white/90 text-xs tracking-[0.1em] font-light uppercase drop-shadow-md">
            The New Standard of Elegance
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL (Form Section) ── */}
      <div className="flex-1 flex px-6 py-8 lg:px-12 h-full overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-[360px] m-auto">
          {/* Mobile-only brand name */}
          <h1 className="lg:hidden font-['Playfair_Display',serif] text-[#8c6b4a] text-2xl tracking-[0.15em] uppercase mb-4 text-center">
            Snitch
          </h1>

          <div className="mb-5 text-center lg:text-left">
            <h2 className="font-['Playfair_Display',serif] text-[#33302c] text-2xl mb-1">
              Create Account
            </h2>
            <p className="text-[#736e68] text-xs font-light tracking-wide">
              Join our exclusive community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            {/* Full Name */}
            <div className="space-y-1.5 group">
              <label htmlFor="fullName" className="block text-[10px] font-medium text-[#b0a184] uppercase tracking-[0.12em] group-focus-within:text-[#8c6b4a] transition-colors">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
                className="w-full bg-white border border-[#e0d7c6] text-[#4a4742] placeholder-[#d1c8b8] px-3 py-1.5 text-[13px] font-light focus:outline-none focus:border-[#8c6b4a] focus:ring-1 focus:ring-[#8c6b4a] transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5 group">
              <label htmlFor="email" className="block text-[10px] font-medium text-[#b0a184] uppercase tracking-[0.12em] group-focus-within:text-[#8c6b4a] transition-colors">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
                className="w-full bg-white border border-[#e0d7c6] text-[#4a4742] placeholder-[#d1c8b8] px-3 py-1.5 text-[13px] font-light focus:outline-none focus:border-[#8c6b4a] focus:ring-1 focus:ring-[#8c6b4a] transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-1.5 group">
              <label htmlFor="contactNumber" className="block text-[10px] font-medium text-[#b0a184] uppercase tracking-[0.12em] group-focus-within:text-[#8c6b4a] transition-colors">
                Contact Number
              </label>
              <input
                id="contactNumber"
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                required
                className="w-full bg-white border border-[#e0d7c6] text-[#4a4742] placeholder-[#d1c8b8] px-3 py-1.5 text-[13px] font-light focus:outline-none focus:border-[#8c6b4a] focus:ring-1 focus:ring-[#8c6b4a] transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5 group">
              <label htmlFor="password" className="block text-[10px] font-medium text-[#b0a184] uppercase tracking-[0.12em] group-focus-within:text-[#8c6b4a] transition-colors">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white border border-[#e0d7c6] text-[#4a4742] placeholder-[#d1c8b8] pl-3 pr-9 py-1.5 text-[13px] font-light focus:outline-none focus:border-[#8c6b4a] focus:ring-1 focus:ring-[#8c6b4a] transition-all duration-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d1c8b8] hover:text-[#8c6b4a] transition-colors"
                >
                  {showPassword ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07l14.14 14.14" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* isSeller Toggle */}
            <div className="pt-1 flex items-center justify-between">
              <div>
                <p className="text-[#4a4742] text-xs font-medium">Register as Seller</p>
                <p className="text-[#b0a184] text-[10px] mt-0.5">Start selling your clothes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-[#ebe5d9] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#c2baad] after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#8c6b4a]"></div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full bg-[#3b3834] text-white py-2.5 mt-2 text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 shadow-md ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#8c6b4a] hover:shadow-lg'}`}
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center py-1">
              <div className="flex-1 border-t border-[#ebe5d9]"></div>
              <span className="px-3 text-[#b0a184] text-[9px] uppercase tracking-[0.1em]">or continue with</span>
              <div className="flex-1 border-t border-[#ebe5d9]"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={() => { window.location.href = "/api/auth/google" }}
              className="w-full bg-white border border-[#e0d7c6] text-[#4a4742] py-2 text-[12px] font-light flex items-center justify-center gap-2 hover:bg-[#f5f2eb] hover:border-[#c2baad] transition-all duration-300 shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.9c1.69 0 3.21.6 4.4 1.58l3.27-3.27A11.94 11.94 0 0 0 12 .9C8.07.9 4.7 3.05 2.9 6.24l2.37 3.52z"/>
                <path fill="#34A853" d="M16.04 18.01A7.06 7.06 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.84L2.9 17.76C4.7 20.95 8.07 23.1 12 23.1c2.96 0 5.67-1.08 7.72-2.86l-3.68-2.23z"/>
                <path fill="#FBBC05" d="M19.72 20.24A11.93 11.93 0 0 0 23.1 12c0-.77-.07-1.52-.2-2.24H12v4.25h6.24a5.3 5.3 0 0 1-2.2 3.49l3.68 2.74z"/>
                <path fill="#4285F4" d="M5.28 14.26A7.08 7.08 0 0 1 4.9 12c0-.8.14-1.57.38-2.24L2.9 6.24A11.93 11.93 0 0 0 .9 12c0 1.95.47 3.79 1.3 5.42l3.08-3.16z"/>
              </svg>
              Google
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-[#736e68] text-[11px] mt-4 tracking-wide">
            Already have an account?{" "}
            <a href="/login" className="text-[#8c6b4a] font-medium border-b border-transparent hover:border-[#8c6b4a] pb-0.5 transition-colors duration-300">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
