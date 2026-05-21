import React, { useState } from 'react';
import { useProduct } from '../hooks/useProduct.jsx';
import { useNavigate } from 'react-router';

const CreateProduct = () => {

  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    currency: 'INR',
    stock: '',
    attributes: [{ key: 'Color', value: '' }],
  });
  
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiles = (files) => {
    if (files.length > 0) setImageError("");
    setImages(prev => {
      const remainingSlots = 7 - prev.length;
      if (remainingSlots <= 0) return prev;
      
      const filesToAdd = Array.from(files).slice(0, remainingSlots);
      const newImages = filesToAdd.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      return [...prev, ...newImages];
    });
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[indexToRemove].preview);
      newImages.splice(indexToRemove, 1);
      return newImages;
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(images.length === 0){
      setImageError("This field is mandatory");
      return;
    }
    setImageError("");
    console.log({ ...formData, images });
    try{
      const data = new FormData();
      data.append("title", formData.title)
      data.append("description", formData.description);
      data.append("priceAmount", formData.amount)
      data.append("priceCurrency", formData.currency);
      data.append("stock", formData.stock);
      
      const formattedAttributes = formData.attributes.reduce((acc, curr) => {
        if (curr.key && curr.value) acc[curr.key] = curr.value;
        return acc;
      }, {});
      data.append("attributes", JSON.stringify(formattedAttributes));
      images.forEach((image, index) => {
        data.append("images", image.file);
      })
      if(images.length !== 0){
        await handleCreateProduct(data)
        navigate('/')
      }
    }
    catch(error){
      console.log("error in creating listing", error)
    }

  };

  return (
    <div className="min-h-screen bg-[#fef8f5] font-['Inter'] text-[#1d1b19] py-16 px-6 md:px-12 lg:px-24 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-[#FCFAF8] shadow-[0_4px_40px_rgba(140,107,74,0.08)] rounded-none md:rounded-xl p-8 md:p-14 border border-[#F5F2EB]">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] text-[#2c2a28] mb-4 tracking-wide">
            New Listing
          </h1>
          <p className="text-[#8c827a] font-light text-sm md:text-base">
            Add a new creation to the luxury collection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-xs uppercase tracking-widest text-[#5C5853] font-medium">
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="E.g. Cashmere Blend Overcoat"
              className="w-full bg-transparent border-b border-[#C2BAAD] pb-2 text-[#1d1b19] focus:outline-none focus:border-[#8C6B4A] hover:border-[#8C6B4A]/50 transition-all duration-300 placeholder-[#C2BAAD] font-light"
              required
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="description" className="text-xs uppercase tracking-widest text-[#5C5853] font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detail the fabric, cut, and inspiration..."
              rows={3}
              className="w-full bg-transparent border-b border-[#C2BAAD] pb-2 text-[#1d1b19] focus:outline-none focus:border-[#8C6B4A] hover:border-[#8C6B4A]/50 transition-all duration-300 placeholder-[#C2BAAD] font-light resize-none"
              required
            />
          </div>

          {/* Amount & Currency */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col space-y-2 flex-grow">
              <label htmlFor="amount" className="text-xs uppercase tracking-widest text-[#5C5853] font-medium">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-transparent border-b border-[#C2BAAD] pb-2 text-[#1d1b19] focus:outline-none focus:border-[#8C6B4A] hover:border-[#8C6B4A]/50 transition-all duration-300 placeholder-[#C2BAAD] font-light"
                required
              />
            </div>
            
            <div className="flex flex-col space-y-2 md:w-1/3">
              <label htmlFor="currency" className="text-xs uppercase tracking-widest text-[#5C5853] font-medium">
                Currency
              </label>
              <div className="relative">
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#C2BAAD] pb-2 text-[#1d1b19] focus:outline-none focus:border-[#8C6B4A] hover:border-[#8C6B4A]/50 transition-all duration-300 appearance-none font-light cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pb-2 text-[#5C5853]">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Stock & Attributes */}
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="stock" className="text-xs uppercase tracking-widest text-[#5C5853] font-medium">
                Initial Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Number of items available"
                className="w-full bg-transparent border-b border-[#C2BAAD] pb-2 text-[#1d1b19] focus:outline-none focus:border-[#8C6B4A] hover:border-[#8C6B4A]/50 transition-all duration-300 placeholder-[#C2BAAD] font-light"
                required
                min="0"
              />
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase tracking-widest text-[#5C5853] font-medium">
                  Attributes
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      attributes: [...prev.attributes, { key: "", value: "" }],
                    }))
                  }
                  className="text-xs uppercase tracking-widest text-[#8C6B4A] hover:text-[#715334] font-medium transition-colors"
                >
                  + Add Detail
                </button>
              </div>
              
              {formData.attributes.map((attr, index) => (
                <div key={index} className="flex gap-4 relative group/attr">
                  <input
                    type="text"
                    placeholder="e.g. Size"
                    value={attr.key}
                    onChange={(e) => {
                      const newAttr = [...formData.attributes];
                      newAttr[index].key = e.target.value;
                      setFormData({ ...formData, attributes: newAttr });
                    }}
                    className="w-1/3 bg-transparent border-b border-[#C2BAAD] pb-2 text-[#1d1b19] focus:outline-none focus:border-[#8C6B4A] hover:border-[#8C6B4A]/50 transition-all duration-300 placeholder-[#C2BAAD] font-light"
                  />
                  <input
                    type="text"
                    placeholder="e.g. Medium"
                    value={attr.value}
                    onChange={(e) => {
                      const newAttr = [...formData.attributes];
                      newAttr[index].value = e.target.value;
                      setFormData({ ...formData, attributes: newAttr });
                    }}
                    className="flex-1 bg-transparent border-b border-[#C2BAAD] pb-2 text-[#1d1b19] focus:outline-none focus:border-[#8C6B4A] hover:border-[#8C6B4A]/50 transition-all duration-300 placeholder-[#C2BAAD] font-light"
                  />
                  {formData.attributes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newAttr = formData.attributes.filter(
                          (_, i) => i !== index
                        );
                        setFormData({ ...formData, attributes: newAttr });
                      }}
                      className="absolute right-0 opacity-0 group-hover/attr:opacity-100 transition-opacity text-[#ba1a1a] p-2 hover:bg-[#ba1a1a]/5 rounded-full"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col space-y-3 pt-4">
            <div className="flex justify-between items-end">
              <label className="text-xs uppercase tracking-widest text-[#5C5853] font-medium">
                Images
              </label>
              <span className="text-xs text-[#8c827a] font-light">{images.length} / 7</span>
            </div>
            
            {images.length < 7 && (
              <label 
                className="border border-dashed border-[#C2BAAD] hover:border-[#8C6B4A] transition-all duration-300 bg-[#F5F2EB]/30 hover:bg-[#F5F2EB]/60 p-10 flex flex-col items-center justify-center cursor-pointer group"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleImageDrop}
              >
                <svg className="w-6 h-6 text-[#C2BAAD] group-hover:text-[#8C6B4A] mb-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span className="text-[#8c827a] font-light text-sm text-center group-hover:text-[#5C5853] transition-colors">
                  Drag & drop up to 7 high-resolution images, or <span className="text-[#8C6B4A] underline underline-offset-4">browse</span>
                </span>
                <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageSelect} />
              </label>
            )}
            
            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pt-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square bg-[#F5F2EB] rounded-md overflow-hidden border border-[#EBE5D9]">
                    <img 
                      src={img.preview} 
                      alt={`preview ${idx}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#2c2a28]/0 group-hover:bg-[#2c2a28]/20 transition-colors duration-300 flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-[#1d1b19] p-2 rounded-full hover:bg-white hover:scale-105 transform shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {imageError && (
              <p className="text-[#ba1a1a] text-xs font-medium tracking-wide pt-1">{imageError}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              className="w-full bg-[#8C6B4A] hover:bg-[#715334] text-white py-4 px-6 font-['Inter'] tracking-widest uppercase text-sm font-medium transition-all duration-300 shadow-[0_4px_14px_rgba(140,107,74,0.3)] hover:shadow-[0_6px_20px_rgba(140,107,74,0.4)] flex justify-center items-center"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
