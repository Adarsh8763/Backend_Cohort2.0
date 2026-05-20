import { useParams, useNavigate } from "react-router";
import { useProduct } from "../hooks/useProduct.jsx";
import { useEffect, useState, useRef } from "react";

const SellerProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductDetails, handleAddProductVariant } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [variantProduct, setVariantProduct] = useState([])
  const [selectedImage, setSelectedImage] = useState(0);
  const sliderRef = useRef(null);

  const [imageError, setImageError] = useState("");

  const [variantForm, setVariantForm] = useState({
    attributes: [{ key: "Color", value: "" }],
    stock: "",
    priceAmount: "",
    currency: "INR",
    images: [],
  });
  const [isDragging, setIsDragging] = useState(false);

  async function fetchProductDetails() {
    setLoading(true);
    const data = await handleGetProductDetails(productId);
    setProduct(data);
    setLoading(false);
  }

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    } else {
      setLoading(false);
    }
  }, [productId]);

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

  const handleAddAttribute = () => {
    setVariantForm((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { key: "", value: "" }],
    }));
  };

  const handleUpdateAttribute = (index, field, newValue) => {
    const newAttributes = [...variantForm.attributes];
    newAttributes[index][field] = newValue;
    setVariantForm((prev) => ({ ...prev, attributes: newAttributes }));
  };

  const handleRemoveAttribute = (index) => {
    const newAttributes = variantForm.attributes.filter((_, i) => i !== index);
    setVariantForm((prev) => ({ ...prev, attributes: newAttributes }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setVariantForm((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (variantForm.images.length === 0) {
      setImageError("This field is mandatory");
      return;
    }
    setImageError("");
    console.log({ ...variantForm });
    try {
      const formattedAttributes = {};

      variantForm.attributes.forEach((attr) => {
        formattedAttributes[attr.key] = attr.value;
      });
      const formData = new FormData();
      formData.append("attributes", JSON.stringify(formattedAttributes));
      formData.append("stock", variantForm.stock);
      formData.append("priceAmount", variantForm.priceAmount);
      formData.append("priceCurrency", variantForm.currency);
      variantForm.images.forEach((image, index) => {
        formData.append("images", image.file);
      });
      if (variantForm.images.length !== 0) {
        const prod = await handleAddProductVariant({ productId, formData })
        setVariantProduct((prev) => [...prev, prod]);
        // console.log("1first")
      }
      // console.log("hleleo")
    } catch (error) {
      console.log("error in creating variant", error);
    }
  };

  return (
    <div className="bg-[#fcfaf8] text-[#33302c] selection:bg-[#ebe5d9] min-h-screen font-['Inter',sans-serif] antialiased">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        input:focus { outline: none !important; box-shadow: none !important; }
      `}</style>

      {/* ── Navigation ── */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-16 h-20 bg-[#fcfaf8]/90 backdrop-blur-sm border-b border-[#e0d7c6]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#736e68] hover:text-[#33302c] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <span className="hidden md:block text-[11px] uppercase tracking-[0.2em] font-semibold mt-0.5">
              Back
            </span>
          </button>
          <nav className="hidden md:flex gap-8 ml-8">
            <a
              className="text-[13px] uppercase tracking-[0.15em] text-[#736e68] hover:text-[#33302c] transition-colors font-medium"
              href="#"
            >
              Collection
            </a>
            <a
              className="text-[13px] uppercase tracking-[0.15em] text-[#33302c] border-b border-[#33302c] pb-1 font-medium"
              href="#"
            >
              Inventory
            </a>
            <a
              className="text-[13px] uppercase tracking-[0.15em] text-[#736e68] hover:text-[#33302c] transition-colors font-medium"
              href="#"
            >
              Reports
            </a>
          </nav>
        </div>
        <div className="font-['Playfair_Display',serif] text-3xl tracking-tighter text-[#33302c]">
          L'ÉLÉGANCE
        </div>
        <div className="flex items-center gap-6 text-[#33302c]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </header>

      <main className="pt-20 pb-24 max-w-[1440px] mx-auto px-4 md:px-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="w-8 h-8 border border-[#8c6b4a]/30 border-t-[#8c6b4a] rounded-full animate-spin" />
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#b0a184]">
              Loading Inventory
            </p>
          </div>
        ) : !product ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
            <p className="font-['Playfair_Display',serif] text-3xl text-[#33302c]">
              Product not found.
            </p>
            <button
              onClick={() => navigate("/seller/inventory")}
              className="text-[11px] uppercase tracking-[0.15em] text-[#33302c] border border-[#33302c] px-8 py-3 hover:bg-[#33302c] hover:text-white transition-all duration-500"
            >
              Return to Inventory
            </button>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-32">
              {/* Cinematic Image Area */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="aspect-[3/4] border border-[#e0d7c6]/40 overflow-hidden relative group">
                  <div
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="flex w-full h-full overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth"
                  >
                    {product.images?.length > 0 ? (
                      product.images.map((img, idx) => (
                        <div
                          key={img._id || idx}
                          className="w-full h-full flex-shrink-0 snap-center relative p-3 md:p-4 flex items-center justify-center bg-[#fcfaf8]"
                        >
                          <img
                            src={img.url}
                            alt={`${product.title} - View ${idx + 1}`}
                            className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-full flex-shrink-0 snap-center relative p-3 md:p-4 flex items-center justify-center bg-[#fcfaf8]">
                        <img
                          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                          alt={product.title}
                          className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {product.images?.length > 1 && (
                  <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2">
                    {product.images.map((img, idx) => (
                      <div
                        key={img._id || idx}
                        onClick={() => scrollToImage(idx)}
                        className={`flex-none w-20 aspect-[3/4] overflow-hidden cursor-pointer transition-all duration-300 p-1.5 ${selectedImage === idx ? "border border-[#736e68]/40" : "border border-transparent hover:border-[#e0d7c6]/60"}`}
                      >
                        <img
                          src={img.url}
                          className={`w-full h-full object-cover ${selectedImage === idx ? "opacity-100 grayscale-0" : "opacity-70 grayscale-[0.3]"}`}
                          alt={`Thumbnail ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info Area */}
              <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-start">
                <div className="sticky top-40 space-y-12">
                  <div className="space-y-6">
                    <p className="text-[10px] font-semibold text-[#b0a184] uppercase tracking-[0.2em]">
                      {product.category || "Outerwear / AW24 Collection"}
                    </p>
                    <h1 className="font-['Playfair_Display',serif] text-3xl md:text-[48px] leading-tight text-[#33302c] tracking-[-0.02em]">
                      {product.title}
                    </h1>
                    <div className="flex justify-between items-end border-b border-[#e0d7c6] pb-6">
                      <span className="text-[16px] text-[#33302c]">
                        {product.price?.currency === "INR"
                          ? "₹"
                          : product.price?.currency || "$"}{" "}
                        {product.price?.amount?.toLocaleString() ??
                          product.price}
                      </span>
                      <span className="text-[10px] font-semibold text-[#736e68] uppercase tracking-[0.2em]">
                        {product.stock || 12} Units In Stock
                      </span>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <p className="text-[14px] text-[#736e68] leading-relaxed font-light">
                      {product.description ||
                        "Crafted from heavyweight virgin wool, this piece redefines the traditional overcoat with sharp lines and a structured collar. A testament to minimalist luxury, designed for the modern curator."}
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="rounded-xl p-5 bg-[#fcfaf8] border border-[#e0d7c6] min-w-0">
                        <span className="block text-[9px] font-semibold text-[#b0a184] uppercase tracking-[0.2em] mb-2">
                          SKU
                        </span>
                        <span
                          className="block text-[11px] font-medium tracking-[0.12em] text-[#736e68] uppercase truncate overflow-hidden"
                          title={product._id || "AWC-2024-BLK"}
                        >
                          {product._id || "AWC-2024-BLK"}
                        </span>
                      </div>
                      <div className="rounded-xl p-5 bg-[#fcfaf8] border border-[#e0d7c6] min-w-0">
                        <span className="block text-[9px] font-semibold text-[#b0a184] uppercase tracking-[0.2em] mb-2">
                          Status
                        </span>
                        <span className="text-[11px] font-medium tracking-[0.12em] text-[#8c8278] uppercase">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10">
                    <button className="w-full py-5 bg-[#3b3834] text-white text-[12px] font-medium uppercase tracking-[0.2em] hover:bg-[#33302c] hover:opacity-90 transition-opacity">
                      Edit Main Product Details
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-[#e0d7c6] my-24" />

            {/* Variants Section */}
            <section className="py-12">
              <div className="flex justify-between items-baseline mb-12">
                <h2 className="font-['Playfair_Display',serif] text-[32px] italic text-[#33302c]">
                  Existing Variants
                </h2>
                <span className="text-[11px] font-semibold text-[#736e68] uppercase tracking-[0.2em]">
                  3 Variations Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Mock Variant Cards */}
                {variantProduct.map((variant, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="aspect-square bg-[#ebe5d9] overflow-hidden mb-4 border border-[#e0d7c6] group-hover:border-[#33302c] transition-colors">
                      <img
                        className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105"
                        src={variant.images[0].url}
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[11px] font-semibold text-[#33302c] uppercase tracking-[0.2em]">
                          {variant.price.currency + variant.price.amount}
                        </p>
                      </div>
                      <span className="text-[10px] font-semibold bg-[#e0d7c6]/50 text-[#33302c] px-2 py-1 tracking-[0.2em]">
                        {variant.stock} LEFT
                      </span>
                    </div>
                  </div>
                ))}

                {/* Quick Add Placeholder */}
                <div
                  onClick={() =>
                    window.scrollTo({
                      top: document.getElementById("add-variant-form")
                        .offsetTop,
                      behavior: "smooth",
                    })
                  }
                  className="aspect-square border border-dashed border-[#e0d7c6] flex flex-col items-center justify-center group hover:bg-[#ebe5d9]/30 transition-colors cursor-pointer"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-[#736e68] mb-3 group-hover:text-[#33302c]"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <p className="text-[11px] font-semibold text-[#736e68] uppercase tracking-[0.2em] group-hover:text-[#33302c]">
                    Add Variant
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-[#e0d7c6] my-24" />

            {/* Add Variant Form Section */}
            <section
              id="add-variant-form"
              className="py-12 bg-white border border-[#e0d7c6] p-8 md:p-16 mb-16"
            >
              <div className="max-w-4xl mx-auto">
                <h3 className="font-['Playfair_Display',serif] text-[32px] text-[#33302c] mb-12">
                  Create New Variant
                </h3>

                <form className="space-y-12">
                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-[#e0d7c6] pb-4">
                      <label className="text-[10px] font-semibold text-[#33302c] uppercase tracking-[0.2em]">
                        Variant Specifications
                      </label>
                      <button
                        type="button"
                        onClick={handleAddAttribute}
                        className="text-[9px] font-semibold text-[#736e68] hover:text-[#33302c] uppercase tracking-[0.15em] transition-colors flex items-center gap-1"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Attribute
                      </button>
                    </div>

                    <div className="space-y-2">
                      {variantForm.attributes.map((attr, idx) => (
                        <div
                          key={idx}
                          className="flex gap-6 group relative items-center py-2"
                        >
                          <input
                            className="w-1/3 bg-transparent border-t-0 border-x-0 border-b border-transparent focus:border-[#e0d7c6] focus:ring-0 py-1 px-0 text-[11px] text-[#736e68] font-medium uppercase tracking-[0.15em] transition-all placeholder:text-[#b0a184]/50 hover:border-[#e0d7c6]/50"
                            placeholder="ATTRIBUTE (E.G. SIZE)"
                            type="text"
                            value={attr.key}
                            onChange={(e) =>
                              handleUpdateAttribute(idx, "key", e.target.value)
                            }
                          />
                          <span className="text-[#e0d7c6] font-light italic">
                            :
                          </span>
                          <input
                            className="flex-1 bg-transparent border-t-0 border-x-0 border-b border-transparent focus:border-[#33302c] focus:ring-0 py-1 px-0 text-[15px] text-[#33302c] transition-all placeholder:text-[#b0a184]/50 hover:border-[#e0d7c6]/50"
                            placeholder="Value (e.g. Medium)"
                            type="text"
                            value={attr.value}
                            onChange={(e) =>
                              handleUpdateAttribute(
                                idx,
                                "value",
                                e.target.value,
                              )
                            }
                          />
                          {variantForm.attributes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveAttribute(idx)}
                              className="opacity-0 group-hover:opacity-100 text-[#b0a184] hover:text-[#33302c] transition-all absolute right-0"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-semibold text-[#736e68] uppercase tracking-[0.2em] group-focus-within:text-[#33302c] transition-colors">
                        Initial Stock
                      </label>
                      <input
                        className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#e0d7c6] focus:border-[#33302c] focus:ring-0 py-3 px-0 text-[15px] text-[#33302c] transition-all placeholder:text-[#b0a184]"
                        placeholder="0"
                        type="number"
                        min="0"
                        value={variantForm.stock}
                        onChange={(e) =>
                          setVariantForm((prev) => ({
                            ...prev,
                            stock: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-semibold text-[#736e68] uppercase tracking-[0.2em] group-focus-within:text-[#33302c] transition-colors">
                        Price Amount
                      </label>
                      <div className="flex gap-4">
                        <select
                          className="bg-transparent border-t-0 border-x-0 border-b border-[#e0d7c6] focus:border-[#33302c] focus:ring-0 py-3 px-0 text-[15px] text-[#33302c] transition-all cursor-pointer"
                          value={variantForm.currency}
                          onChange={(e) =>
                            setVariantForm((prev) => ({
                              ...prev,
                              currency: e.target.value,
                            }))
                          }
                        >
                          <option value="INR">INR</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="JPY">JPY</option>
                          <option value="GBP">GBP</option>
                        </select>
                        <input
                          className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#e0d7c6] focus:border-[#33302c] focus:ring-0 py-3 px-0 text-[15px] text-[#33302c] transition-all placeholder:text-[#b0a184]"
                          placeholder="0.00"
                          type="number"
                          step="0.01"
                          value={variantForm.priceAmount}
                          onChange={(e) =>
                            setVariantForm((prev) => ({
                              ...prev,
                              priceAmount: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-semibold text-[#736e68] uppercase tracking-[0.2em]">
                      Variant Imagery
                    </label>
                    <div
                      className={`w-full ${variantForm.images.length > 0 ? "min-h-64 h-auto py-8" : "h-64"} border border-dashed border-[#e0d7c6] bg-[#fcfaf8] hover:bg-[#ebe5d9]/30 flex flex-col items-center justify-center group cursor-pointer transition-all duration-500 relative ${isDragging ? "bg-[#ebe5d9]/50 border-[#33302c]" : ""}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />

                      {variantForm.images.length > 0 ? (
                        <div className="flex flex-wrap gap-4 px-8 w-full justify-center relative z-20 pointer-events-none">
                          {variantForm.images.map((img, idx) => (
                            <div
                              key={idx}
                              className="w-24 h-32 relative shadow-sm border border-[#e0d7c6]"
                            >
                              <img
                                src={img.preview}
                                alt={`Preview ${idx}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          <div className="w-24 h-32 flex flex-col items-center justify-center border border-dashed border-[#e0d7c6]">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              className="text-[#b0a184] mb-2"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            <span className="text-[9px] font-semibold text-[#b0a184] uppercase tracking-[0.2em]">
                              Add More
                            </span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-[#b0a184] mb-4 group-hover:text-[#33302c] transition-colors relative z-20 pointer-events-none"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                          <p className="text-[15px] text-[#736e68] group-hover:text-[#33302c] transition-colors relative z-20 pointer-events-none">
                            Drag or click to upload cinematic high-res assets
                          </p>
                          <p className="text-[9px] font-semibold text-[#b0a184] mt-3 uppercase tracking-[0.2em] relative z-20 pointer-events-none">
                            MINIMUM 2400PX WIDE • JPG OR WEBP
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 pt-8">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="flex-1 py-5 bg-[#3b3834] text-white text-[13px] font-medium uppercase tracking-[0.2em] hover:bg-[#33302c] transition-all duration-300"
                    >
                      Publish Variant
                    </button>
                    <button
                      type="button"
                      className="px-12 py-5 border border-[#33302c] text-[#33302c] text-[13px] font-medium uppercase tracking-[0.2em] hover:bg-[#33302c] hover:text-white transition-all duration-300"
                    >
                      Save Draft
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-4 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#e0d7c6] bg-[#fcfaf8]">
        <div className="font-['Playfair_Display',serif] text-[24px] tracking-[0.15em] text-[#33302c] uppercase">
          L'ÉLÉGANCE
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {["Privacy", "Terms", "Contact", "Archive"].map((link) => (
            <a
              key={link}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#736e68] hover:text-[#33302c] transition-colors"
              href="#"
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#736e68] opacity-80">
          © 2026 L'ÉLÉGANCE EDITORIAL. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default SellerProductDetails;
