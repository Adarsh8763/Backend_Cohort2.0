import { useEffect } from "react"
import { useProduct } from "../hooks/useProduct.jsx"
import { useSelector } from "react-redux"

const Dashboard = () => {

    const { handleGetSellerProducts } = useProduct()
    const sellerProducts = useSelector(state => state.products.sellerProducts)

    useEffect(() => {
        handleGetSellerProducts()
    }, [])

    return (
        <div className="min-h-screen bg-[#F5F2EB] py-12 sm:py-20 px-6 sm:px-12 lg:px-16 font-['Inter']">
            <div className="max-w-[900px] mx-auto">
                
                {/* Top Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 border-b border-[#DCD5CB] pb-6 md:pb-8">
                    <div>
                        <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#716A60] uppercase mb-2 sm:mb-4 block font-medium">
                            Seller Dashboard
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#2C2A28] font-['Playfair_Display'] tracking-wide">
                            Your Vault
                        </h1>
                    </div>
                    <div className="mt-8 md:mt-0 flex gap-6 text-[10px] sm:text-[11px] tracking-widest text-[#716A60] uppercase font-medium">
                        <button className="text-[#2C2A28] border-b border-[#2C2A28] pb-1">All Items</button>
                        <button className="hover:text-[#2C2A28] transition-colors pb-1">Sold</button>
                        <button className="hover:text-[#2C2A28] transition-colors pb-1">Drafts</button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex justify-between items-center mb-8 md:mb-12 text-[10px] sm:text-[11px] tracking-widest uppercase text-[#716A60] font-medium">
                    <button className="hover:text-[#2C2A28] transition-colors flex items-center gap-2">
                        <span className="text-[#8C6B4A]">▼</span> Filter
                    </button>
                    <button className="hover:text-[#2C2A28] transition-colors">
                        Sort By: Relevance
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 md:gap-x-10 gap-y-12 sm:gap-y-16">
                    {/* Products */}
                    {sellerProducts?.map((product) => (
                        <div 
                            key={product._id || product.id || Math.random()} 
                            className="group flex flex-col cursor-pointer w-full"
                        >
                            <div className="relative aspect-square bg-[#EBE5D9] overflow-hidden mb-3 sm:mb-3.3 shadow-sm md:group-hover:shadow-[0_15px_35px_-10px_rgba(140,107,74,0.15)] transition-all duration-500 rounded-xl">
                                <img 
                                    src={product.image || product.imageUrl || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'} 
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-[1.03]"
                                />
                                {/* Overlay Badge */}
                                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#FCFAF8]/95 backdrop-blur-sm text-[#2C2A28] text-[8px] sm:text-[9px] font-semibold tracking-widest uppercase px-2 sm:px-3 py-1 sm:py-1.5 shadow-sm rounded-sm">
                                    Listed
                                </div>
                                <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/5 transition-colors duration-700" />
                            </div>
                            
                            <div className="flex flex-col px-1">
                                <h3 className="text-[14px] sm:text-[16px] text-[#2C2A28] font-['Playfair_Display'] mb-1 line-clamp-1 group-hover:text-[#8C6B4A] transition-colors duration-300">
                                    {product.title}
                                </h3>
                                <p className="text-[#716A60] font-light text-[10px] sm:text-[11px] leading-relaxed line-clamp-1 mb-2 sm:mb-3">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center mt-0.3">
                                    <span className="text-[#2C2A28] font-medium tracking-widest text-[10px] sm:text-[11px]">
                                        {product.price?.currency || 'INR'} {product.price?.amount || product.price}
                                    </span>
                                    <button className="text-[9px] sm:text-[10px] uppercase tracking-widest font-medium text-[#8C6B4A] opacity-0 md:-translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Item Card */}
                    <div className="flex flex-col max-w-[400px] mx-auto sm:max-w-none w-full">
                        <a href="/seller/create-product" className="group flex flex-col items-center justify-center aspect-square bg-[#EBE5D9]/40 hover:bg-[#EBE5D9]/80 transition-all duration-500 cursor-pointer border border-transparent hover:border-[#DCD5CB]/50 shadow-sm md:hover:shadow-md mb-5 rounded-xl">
                            <span className="text-3xl font-light text-[#8C6B4A] mb-4 group-hover:scale-110 transition-transform duration-500">+</span>
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#716A60] group-hover:text-[#2C2A28] transition-colors duration-300 font-medium">
                                Add New Item
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
