import { useEffect, useState } from "react"
import { useProduct } from "../hooks/useProduct.jsx"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import Navbar from "../components/Navbar.jsx"

const Dashboard = () => {

    const { handleGetSellerProducts } = useProduct()
    const sellerProducts = useSelector(state => state.products.sellerProducts)
    const navigate = useNavigate()

    const [searchResults, setSearchResults] = useState(null)
    const [sortOpen, setSortOpen] = useState(false)
    const [sortLabel, setSortLabel] = useState('Latest')

    useEffect(() => {
        handleGetSellerProducts()
    }, [])

    const handleSearchResults = (results) => {
        setSearchResults(results && results.length > 0 ? results : null)
    }

    const displayProducts = searchResults !== null ? searchResults : sellerProducts

    const sortOptions = ['Latest', 'Price: Low–High', 'Price: High–Low', 'Name A–Z']

    return (
        <div className="min-h-screen bg-[#fcfaf8] font-['Inter']">

            {/* ── Navbar ── */}
            <Navbar
                showSearch={true}
                onSearchResults={handleSearchResults}
                cartCount={0}
            />

            {/* ════════════════════════════════════════
                PAGE CANVAS
            ════════════════════════════════════════ */}
            <div className="max-w-[1190px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

                {/* ── Page Header ── */}
                <div className="pt-14 pb-10 md:pt-20 md:pb-14 border-b border-[#DCD5CB]/70">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

                        {/* Left: Title block */}
                        <div>
                            <p className="text-[9px] tracking-[0.32em] text-[#A89E94] uppercase mb-3 font-medium">
                                Seller Studio
                            </p>
                            <h1 className="font-['Playfair_Display'] text-[38px] md:text-[48px] lg:text-[54px] text-[#2C2A28] leading-none tracking-[-0.01em]">
                                {searchResults !== null
                                    ? <>
                                        <span className="font-light italic text-[#8C6B4A]">{searchResults.length}</span>
                                        <span className="ml-3">Found</span>
                                      </>
                                    : 'The Vault'
                                }
                            </h1>
                        </div>

                        {/* Right: Item count + Add CTA */}
                        <div className="flex items-center gap-6 pb-1">
                            <span className="text-[10px] tracking-[0.22em] uppercase text-[#A89E94] font-medium">
                                {displayProducts?.length ?? 0}&nbsp;
                                {(displayProducts?.length ?? 0) === 1 ? 'Item' : 'Items'}
                            </span>
                            <a
                                href="/seller/create-product"
                                className="group inline-flex items-center gap-2.5 text-[10px] tracking-[0.2em] uppercase font-medium text-[#2C2A28] border-b border-[#2C2A28] pb-0.5 hover:text-[#8C6B4A] hover:border-[#8C6B4A] transition-all duration-300"
                            >
                                <span className="text-[15px] font-extralight leading-none group-hover:rotate-90 transition-transform duration-400 inline-block">
                                    +
                                </span>
                                New Listing
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── Toolbar ── */}
                <div className="flex items-center justify-between py-5 md:py-6">
                    {/* Left label */}
                    <p className="text-[9.5px] tracking-[0.28em] uppercase text-[#A89E94] font-medium">
                        All Items
                    </p>

                    {/* Right: Sort */}
                    <div className="relative">
                        <button
                            onClick={() => setSortOpen(o => !o)}
                            className="flex items-center gap-2 text-[9.5px] tracking-[0.2em] uppercase text-[#716A60] hover:text-[#2C2A28] transition-colors duration-250 group"
                        >
                            <span>Sort — {sortLabel}</span>
                            <svg
                                width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                className={`transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`}
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        {/* Sort dropdown */}
                        {sortOpen && (
                            <div
                                className="absolute right-0 top-full mt-3 w-44 bg-[#FCFAF8] border border-[#DCD5CB]/80 shadow-[0_16px_48px_rgba(51,48,44,0.09)] z-30 py-1"
                                style={{ borderRadius: '1px' }}
                            >
                                {sortOptions.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => { setSortLabel(opt); setSortOpen(false); }}
                                        className={`w-full text-left px-5 py-2.5 text-[10px] tracking-[0.16em] uppercase transition-colors duration-200 ${
                                            sortLabel === opt
                                                ? 'text-[#8C6B4A] bg-[#F5F2EB]'
                                                : 'text-[#716A60] hover:text-[#2C2A28] hover:bg-[#F5F2EB]'
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Thin separator ── */}
                <div className="w-full h-px bg-[#DCD5CB]/50 mb-10 md:mb-14" />

                {/* ════════════════════════════════════════
                    PRODUCT GRID
                ════════════════════════════════════════ */}

                {/* Search empty state */}
                {searchResults !== null && searchResults.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <div className="w-10 h-px bg-[#DCD5CB] mb-8 mx-auto" />
                        <p className="font-['Playfair_Display'] text-[22px] text-[#716A60] italic mb-3">
                            No results found
                        </p>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#A89E94]">
                            Try a broader search term
                        </p>
                        <div className="w-10 h-px bg-[#DCD5CB] mt-8 mx-auto" />
                    </div>
                )}

                {/* Products + Add card grid */}
                {(searchResults === null || searchResults.length > 0) && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 sm:gap-x-7 lg:gap-x-9 gap-y-12 sm:gap-y-16 pb-24">

                        {/* Product cards */}
                        {displayProducts?.map((product, index) => (
                            <div
                                key={product._id || index}
                                onClick={() => navigate(`/seller/product/${product._id}`)}
                                className="group flex flex-col cursor-pointer"
                            >
                                {/* Image */}
                                <div className="rounded-xl relative aspect-[4/5] bg-[#EAE4D9] overflow-hidden mb-4 transition-all duration-500 md:group-hover:shadow-[0_12px_40px_-8px_rgba(140,107,74,0.18)]">
                                    <img
                                        src={
                                            product.images?.[0]?.url ||
                                            product.imageUrl ||
                                            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'
                                        }
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-[1.04]"
                                    />

                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-[#2C2A28]/0 md:group-hover:bg-[#2C2A28]/[0.04] transition-colors duration-500" />

                                    {/* Status badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="inline-block bg-[#FCFAF8]/90 backdrop-blur-sm text-[#8C6B4A] text-[8px] tracking-[0.22em] uppercase font-medium px-2.5 py-1">
                                            Listed
                                        </span>
                                    </div>

                                    {/* Edit reveal on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-3 bg-gradient-to-t from-[#2C2A28]/30 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-400">
                                        <span className="text-[9px] tracking-[0.24em] uppercase text-white/90 font-medium">
                                            View Details
                                        </span>
                                    </div>
                                </div>

                                {/* Meta */}
                                <div className="flex flex-col gap-0.5">
                                    <h3 className="font-['Playfair_Display'] text-[14px] sm:text-[15px] text-[#2C2A28] leading-snug line-clamp-1 group-hover:text-[#8C6B4A] transition-colors duration-300">
                                        {product.title}
                                    </h3>
                                    <p className="text-[10px] sm:text-[11px] text-[#A89E94] font-light leading-relaxed line-clamp-1 mt-0.5">
                                        {product.description}
                                    </p>
                                    <p className="text-[10.5px] sm:text-[11.5px] text-[#2C2A28] font-medium tracking-wider mt-2">
                                        {product.price?.currency || 'INR'}&nbsp;
                                        {product.price?.amount ?? product.price}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Add New Listing card — only when not in search mode */}
                        {searchResults === null && (
                            <a
                                href="/seller/create-product"
                                className="group flex flex-col"
                            >
                                <div className="aspect-[3/4] border border-dashed border-[#C8C0B4] hover:border-[#8C6B4A]/50 bg-[#EAE4D9]/20 hover:bg-[#EAE4D9]/50 flex flex-col items-center justify-center transition-all duration-500 mb-4">
                                    <div className="w-8 h-8 rounded-full border border-[#C8C0B4] group-hover:border-[#8C6B4A] flex items-center justify-center mb-3 transition-all duration-400 group-hover:scale-105">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            className="text-[#A89E94] group-hover:text-[#8C6B4A] transition-colors duration-300">
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </div>
                                    <span className="text-[9px] tracking-[0.26em] uppercase text-[#A89E94] group-hover:text-[#8C6B4A] transition-colors duration-300 font-medium">
                                        Add Listing
                                    </span>
                                </div>
                                {/* Placeholder meta row to match card height rhythm */}
                                <div className="h-[54px]" />
                            </a>
                        )}
                    </div>
                )}

                {/* Empty vault state */}
                {searchResults === null && (!sellerProducts || sellerProducts.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-10 h-px bg-[#DCD5CB] mb-10 mx-auto" />
                        <p className="font-['Playfair_Display'] text-[26px] text-[#716A60] italic mb-4">
                            Your vault is empty
                        </p>
                        <p className="text-[10px] tracking-[0.22em] uppercase text-[#A89E94] mb-10">
                            Begin by adding your first listing
                        </p>
                        <a
                            href="/seller/create-product"
                            className="text-[10px] tracking-[0.22em] uppercase font-medium text-[#8C6B4A] border-b border-[#8C6B4A] pb-0.5 hover:opacity-70 transition-opacity duration-300"
                        >
                            Create First Listing
                        </a>
                        <div className="w-10 h-px bg-[#DCD5CB] mt-10 mx-auto" />
                    </div>
                )}

            </div>
        </div>
    )
}

export default Dashboard
