import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate} from "react-router"

const Register = () => {
  const { handleRegister} = useAuth()
  const navigate = useNavigate()
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    await handleRegister({
      fullname: formData.fullName,
      email: formData.email,
      password: formData.password,
      contact: formData.contactNumber,
      isSeller: formData.isSeller
    })
    navigate("/")
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* ── LEFT PANEL (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden bg-[#0e0e0e]">
        {/* golden top-glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a017]/60 to-transparent" />
        {/* radial golden ambient */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-[#d4a017]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-16 select-none">
          {/* Brand wordmark */}
          <p
            className="text-[#d4a017] text-3xl font-bold tracking-[0.5em] uppercase mb-14"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            SNITCH
          </p>

          {/* Tagline */}
          <h1
            className="text-white text-5xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Wear the Story
          </h1>
          <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-xs mx-auto">
            Discover curated pieces that speak volumes.
            <br />
            Elevate your wardrobe with quiet luxury.
          </p>
        </div>

        {/* bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a017]/30 to-transparent" />
      </div>

      {/* ── RIGHT PANEL — FORM ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          {/* Mobile-only brand name */}
          <p className="lg:hidden text-[#d4a017] text-2xl font-bold tracking-[0.45em] uppercase mb-10 text-center">
            SNITCH
          </p>

          {/* Heading */}
          <div className="mb-10">
            <h2
              className="text-white text-3xl font-bold tracking-tight mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Create Account
            </h2>
            <p className="text-[#6b6b6b] text-sm">Join the Snitch community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* ── Full Name ── */}
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold text-[#9b8f7a] uppercase tracking-widest"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-[#4f4634] pointer-events-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  required
                  className="w-full bg-[#1a1a1a] text-white placeholder-[#3a3a3a] pl-11 pr-4 py-3.5 rounded-lg text-sm border border-transparent outline-none transition-all duration-200 focus:border-[#d4a017] focus:shadow-[0_0_0_3px_rgba(212,160,23,0.12)]"
                />
              </div>
            </div>

            {/* ── Email ── */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#9b8f7a] uppercase tracking-widest"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-[#4f4634] pointer-events-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                  className="w-full bg-[#1a1a1a] text-white placeholder-[#3a3a3a] pl-11 pr-4 py-3.5 rounded-lg text-sm border border-transparent outline-none transition-all duration-200 focus:border-[#d4a017] focus:shadow-[0_0_0_3px_rgba(212,160,23,0.12)]"
                />
              </div>
            </div>

            {/* ── Contact Number ── */}
            <div className="space-y-1.5">
              <label
                htmlFor="contactNumber"
                className="block text-xs font-semibold text-[#9b8f7a] uppercase tracking-widest"
              >
                Contact Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-[#4f4634] pointer-events-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 3.18 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <input
                  id="contactNumber"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full bg-[#1a1a1a] text-white placeholder-[#3a3a3a] pl-11 pr-4 py-3.5 rounded-lg text-sm border border-transparent outline-none transition-all duration-200 focus:border-[#d4a017] focus:shadow-[0_0_0_3px_rgba(212,160,23,0.12)]"
                />
              </div>
            </div>

            {/* ── Password ── */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#9b8f7a] uppercase tracking-widest"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-[#4f4634] pointer-events-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#1a1a1a] text-white placeholder-[#3a3a3a] pl-11 pr-12 py-3.5 rounded-lg text-sm border border-transparent outline-none transition-all duration-200 focus:border-[#d4a017] focus:shadow-[0_0_0_3px_rgba(212,160,23,0.12)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-4 flex items-center text-[#4f4634] hover:text-[#d4a017] transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* ── isSeller Toggle ── */}
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4 flex items-center justify-between gap-4 transition-all duration-200 hover:border-[#d4a017]/20">
              <div>
                <p className="text-white text-sm font-semibold mb-0.5">
                  Register as Seller
                </p>
                <p className="text-[#6b6b6b] text-xs leading-relaxed">
                  Start selling your clothes on Snitch
                </p>
              </div>

              {/* Toggle switch */}
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  id="isSeller"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2a2a2a] rounded-full peer peer-checked:bg-[#d4a017] transition-colors duration-300 relative">
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                      formData.isSeller ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </label>
            </div>

            {/* ── Submit CTA ── */}
            <button
              type="submit"
              className="w-full bg-[#d4a017] text-[#0a0a0a] font-bold text-sm py-4 rounded-lg tracking-wide uppercase transition-all duration-200 hover:bg-[#e6b020] hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#d4a017]/50 mt-2"
            >
              Create Account
            </button>

            {/* ── Divider ── */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-[#1f1f1f]" />
              <span className="text-[#3a3a3a] text-xs uppercase tracking-widest font-medium">
                or continue with
              </span>
              <div className="flex-1 h-px bg-[#1f1f1f]" />
            </div>

            {/* ── Social Buttons ── */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google */}
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 bg-[#111111] border border-[#1f1f1f] text-[#c8c6c5] text-sm font-medium py-3 rounded-lg transition-all duration-200 hover:border-[#d4a017]/30 hover:text-white focus:outline-none"
              >
                <svg width="17" height="17" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.27 9.76A7.08 7.08 0 0 1 12 4.9c1.69 0 3.21.6 4.4 1.58l3.27-3.27A11.94 11.94 0 0 0 12 .9C8.07.9 4.7 3.05 2.9 6.24l2.37 3.52z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 18.01A7.06 7.06 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.84L2.9 17.76C4.7 20.95 8.07 23.1 12 23.1c2.96 0 5.67-1.08 7.72-2.86l-3.68-2.23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M19.72 20.24A11.93 11.93 0 0 0 23.1 12c0-.77-.07-1.52-.2-2.24H12v4.25h6.24a5.3 5.3 0 0 1-2.2 3.49l3.68 2.74z"
                  />
                  <path
                    fill="#4285F4"
                    d="M5.28 14.26A7.08 7.08 0 0 1 4.9 12c0-.8.14-1.57.38-2.24L2.9 6.24A11.93 11.93 0 0 0 .9 12c0 1.95.47 3.79 1.3 5.42l3.08-3.16z"
                  />
                </svg>
                Google
              </button>

              {/* Apple */}
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 bg-[#111111] border border-[#1f1f1f] text-[#c8c6c5] text-sm font-medium py-3 rounded-lg transition-all duration-200 hover:border-[#d4a017]/30 hover:text-white focus:outline-none"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 814 1000"
                  fill="currentColor"
                >
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.8-57.3-155.5-127.4C46 373 1 211.5 1 155.3c0-180.5 117.4-275.8 232.6-275.8 62 0 113.4 40.8 150.7 40.8 36.5 0 94.3-43.4 165.3-43.4 26.3 0 108.2 2.6 162.5 99.5zm-156.9-120.4c-5.8-42.7 8.3-85.5 33.1-117.2 23.3-29.3 65.5-50.5 96.7-50.5 1.9 42.1-14.7 83.3-37.4 113.3-20.7 27.4-59.4 48.1-92.4 54.4z" />
                </svg>
                Apple
              </button>
            </div>
          </form>

          {/* ── Sign-in link ── */}
          <p className="text-center text-sm text-[#6b6b6b] mt-8">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#d4a017] font-semibold hover:text-[#e6b020] transition-colors duration-200"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
