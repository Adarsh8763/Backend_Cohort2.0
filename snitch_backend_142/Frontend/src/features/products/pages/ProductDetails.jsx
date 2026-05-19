import { useParams, useNavigate } from "react-router";
import { useProduct } from "../hooks/useProduct.jsx";
import { useEffect, useState, useRef } from "react";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductDetails } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToBag, setAddedToBag] = useState(false);
  const sliderRef = useRef(null);

  async function fetchProductDetails() {
    setLoading(true);
    const data = await handleGetProductDetails(productId);
    setProduct(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleAddToBag = () => {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleScroll = (e) => {
    if (!sliderRef.current) return;
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== selectedImage) {
      setSelectedImage(newIndex);
    }
  };

  const scrollToImage = (idx) => {
    setSelectedImage(idx);
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({ left: width * idx, behavior: "smooth" });
    }
  };

  return (
    <div className="text-[#33302c] antialiased min-h-screen flex flex-col bg-[#fcfaf8] font-['Inter',sans-serif]">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ── Navigation ── */}
      <nav className="bg-[#fcfaf8]/90 backdrop-blur-sm border-b border-[#e0d7c6]/50 w-full z-50 sticky top-0">
        <div className="flex justify-between items-center w-full px-5 md:px-20 py-2 max-w-[1440px] mx-auto h-[80px]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#736e68] hover:text-[#8c6b4a] transition-colors duration-300 group"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-0.5 transition-transform duration-300"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>

          <a
            className="font-['Playfair_Display',serif] text-2xl tracking-[0.15em] text-[#8c6b4a] uppercase"
            href="/"
          >
            SNITCH
          </a>

          <div className="flex items-center gap-6">
            <a
              className="hidden md:block text-[12px] uppercase tracking-widest text-[#736e68] hover:text-[#8c6b4a] transition-colors duration-300"
              href="/login"
            >
              Account
            </a>
            <a
              className="relative text-[#8c6b4a] text-xs uppercase tracking-widest hover:text-[#6b5035] transition-colors duration-300"
              href="#"
            >
              Bag (0)
            </a>
          </div>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-20 py-8 md:py-12">

        {/* ── Loading State ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="w-8 h-8 border border-[#8c6b4a]/30 border-t-[#8c6b4a] rounded-full animate-spin" />
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#b0a184]">
              Loading
            </p>
          </div>
        )}

        {/* ── Not Found State ── */}
        {!loading && !product && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
            <p className="font-['Playfair_Display',serif] text-3xl text-[#33302c]">
              Product not found.
            </p>
            <p className="text-sm text-[#736e68]">
              This item may have been removed from the collection.
            </p>
            <button
              onClick={() => navigate("/")}
              className="text-[11px] uppercase tracking-[0.15em] text-[#8c6b4a] border border-[#8c6b4a] px-8 py-3 hover:bg-[#8c6b4a] hover:text-white transition-all duration-500"
            >
              Return to Collection
            </button>
          </div>
        )}

        {/* ── Product Detail Layout ── */}
        {!loading && product && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28 items-start">

            {/* ── LEFT: Image Section (Sticky) ── */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-[120px] lg:h-max">
              {/* Main Image Slider */}
              <div className="relative w-full aspect-[4/5] bg-[#ebe5d9] overflow-hidden group">
                <div
                  ref={sliderRef}
                  onScroll={handleScroll}
                  className="flex w-full h-full overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth"
                >
                  {product.images?.length > 0 ? (
                    product.images.map((img, idx) => (
                      <div key={img._id || idx} className="w-full h-full flex-shrink-0 snap-center relative">
                        <img
                          src={img.url}
                          alt={`${product.title} - View ${idx + 1}`}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-full flex-shrink-0 snap-center relative">
                      <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                        alt={product.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                </div>

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-[#4a3520]/0 group-hover:bg-[#4a3520]/5 transition-colors duration-700 pointer-events-none" />

                {/* Image counter badge */}
                {product.images?.length > 1 && (
                  <div className="absolute bottom-5 right-5 bg-[#fcfaf8]/80 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#736e68]">
                      {selectedImage + 1} / {product.images.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {product.images?.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                  {product.images.map((img, idx) => (
                    <button
                      key={img._id || idx}
                      onClick={() => scrollToImage(idx)}
                      className={`flex-shrink-0 w-20 aspect-square bg-[#ebe5d9] overflow-hidden transition-all duration-300 ${
                        selectedImage === idx
                          ? "ring-1 ring-[#8c6b4a] opacity-100 shadow-sm"
                          : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT: Product Info (Scrollable naturally) ── */}
            <div className="flex flex-col justify-start pb-12 lg:pb-24">

              {/* Category Breadcrumb */}
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#b0a184] mb-4">
                Collection · New Arrival
              </p>

              {/* Product Title */}
              <h1 className="font-['Playfair_Display',serif] text-3xl md:text-4xl lg:text-[42px] text-[#33302c] leading-tight mb-5">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-['Playfair_Display',serif] text-2xl md:text-3xl text-[#8c6b4a]">
                  {product.price?.currency === "INR" ? "₹" : product.price?.currency}{" "}
                  {product.price?.amount?.toLocaleString("en-IN") ?? product.price}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#b0a184]">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#e0d7c6] mb-8" />

              {/* Description */}
              {product.description && (
                <div className="mb-10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#b0a184] mb-3">
                    About
                  </p>
                  <p className="text-[15px] text-[#736e68] leading-[1.8] font-light">
                    {product.description}
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 mb-10">
                <button
                  id="add-to-bag-btn"
                  onClick={handleAddToBag}
                  className={`w-full py-4 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-500 shadow-sm ${
                    addedToBag
                      ? "bg-[#5a7a3a] text-white"
                      : "bg-[#3b3834] text-white hover:bg-[#8c6b4a] hover:shadow-md"
                  }`}
                >
                  {addedToBag ? "✓ Added to Bag" : "Add to Bag"}
                </button>

                <button
                  id="wishlist-btn"
                  className="w-full py-4 text-[11px] font-medium tracking-[0.2em] uppercase border border-[#c2baad] text-[#736e68] hover:border-[#8c6b4a] hover:text-[#8c6b4a] transition-all duration-300"
                >
                  Save to Wishlist
                </button>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#e0d7c6] mb-8" />

              {/* Product Meta */}
              <div className="flex flex-col gap-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#b0a184] mb-1">
                  Details
                </p>

                <div className="flex justify-between items-start py-3 border-b border-[#ebe5d9]">
                  <span className="text-[12px] uppercase tracking-[0.1em] text-[#b0a184]">
                    SKU
                  </span>
                  <span className="text-[12px] text-[#736e68] font-light text-right max-w-[60%] break-all">
                    {product._id}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-[#ebe5d9]">
                  <span className="text-[12px] uppercase tracking-[0.1em] text-[#b0a184]">
                    Seller
                  </span>
                  <span className="text-[12px] text-[#736e68] font-light">
                    Verified Seller
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-[#ebe5d9]">
                  <span className="text-[12px] uppercase tracking-[0.1em] text-[#b0a184]">
                    Listed
                  </span>
                  <span className="text-[12px] text-[#736e68] font-light">
                    {formatDate(product.createdAt)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-[12px] uppercase tracking-[0.1em] text-[#b0a184]">
                    Delivery
                  </span>
                  <span className="text-[12px] text-[#5a7a3a] font-medium">
                    Free · 3–5 Business Days
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#e0d7c6] mt-8 mb-8" />

              {/* Policies */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: (
                      <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                    ),
                    label: "Secure Payment",
                    desc: "256-bit SSL encryption",
                  },
                  {
                    icon: (
                      <>
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </>
                    ),
                    label: "Easy Returns",
                    desc: "30-day hassle-free returns",
                  },
                  {
                    icon: (
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    ),
                    label: "Authenticity Guaranteed",
                    desc: "100% genuine products",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8c6b4a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 flex-shrink-0"
                    >
                      {item.icon}
                    </svg>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.1em] text-[#33302c] font-medium">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-[#b0a184] mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#fcfaf8] border-t border-[#e0d7c6]/50 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-5 md:px-20 py-12 max-w-[1440px] mx-auto gap-8 md:gap-0">
          <div className="font-['Playfair_Display',serif] text-[24px] tracking-[0.15em] text-[#8c6b4a] uppercase">
            SNITCH
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {["Journal", "Privacy", "Terms", "Shipping"].map((link) => (
              <a
                key={link}
                className="text-[11px] uppercase tracking-[0.15em] text-[#736e68] hover:text-[#8c6b4a] transition-all"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="text-[11px] uppercase tracking-[0.15em] text-[#736e68] text-center md:text-right">
            © 2026 SNITCH. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetails;

