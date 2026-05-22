import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct.jsx'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar.jsx'

const Home = () => {
    const allProducts = useSelector(state => state.products.allProducts)
    const { handleGetAllProducts } = useProduct()
    const navigate = useNavigate()

    // searchResults: null = not searching, array = live results
    const [searchResults, setSearchResults] = useState(null)

    useEffect(() => {
        handleGetAllProducts()
    }, [])

    // When search clears (empty array or null from SearchBar), revert to all products
    const handleSearchResults = (results) => {
        setSearchResults(results && results.length > 0 ? results : null)
    }

    const displayProducts = searchResults !== null ? searchResults : allProducts

    return (
        <div className="text-[#33302c] antialiased min-h-screen flex flex-col bg-[#fcfaf8] font-['Inter',sans-serif]">
            {/* ── Navbar — search icon expands inline ── */}
            <Navbar
                showSearch={true}
                onSearchResults={handleSearchResults}
                cartCount={0}
            />

            {/* ── Main Content Canvas ── */}
            <main className="flex-grow w-full flex flex-col max-w-[1440px] mx-auto">

                {/* ── Hero Section ── */}
                <section className="w-full px-5 md:px-16 lg:px-20 pt-14 pb-10 flex flex-col items-center text-center">
                    {searchResults !== null ? (
                        <>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-[#b0a184] mb-3 font-medium">
                                Search Results
                            </p>
                            <h1 className="font-['Playfair_Display',serif] text-3xl md:text-[48px] leading-none text-[#33302c] mb-4 tracking-tight">
                                {searchResults.length} Item{searchResults.length !== 1 ? 's' : ''} Found
                            </h1>
                        </>
                    ) : (
                        <>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-[#b0a184] mb-3 font-medium">
                                S/S 2026 Collection
                            </p>
                            <h1 className="font-['Playfair_Display',serif] text-4xl md:text-[64px] leading-none text-[#33302c] mb-5 max-w-3xl tracking-tight">
                                The Collection
                            </h1>
                            <p className="text-sm md:text-[15px] text-[#736e68] max-w-lg mx-auto leading-relaxed">
                                Curated essentials for the modern aesthetic. Uncompromising materials meeting minimalist silhouettes, designed for effortless sophistication.
                            </p>
                        </>
                    )}
                </section>

                {/* ── Product Grid Section ── */}
                <section className="w-full px-5 md:px-16 lg:px-20 pb-[100px] mb-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-16">
                        {displayProducts && displayProducts.length > 0 ? (
                            displayProducts.map((product, index) => (
                                <div
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    key={product._id || index}
                                    className="group flex flex-col cursor-pointer transition-all duration-700 ease-out hover:-translate-y-1.5"
                                >
                                    <div className="relative w-full aspect-[4/5] bg-[#EBE5D9] overflow-hidden mb-5 shadow-sm md:group-hover:shadow-[0_15px_35px_-10px_rgba(140,107,74,0.15)] transition-all duration-500 rounded-xl">
                                        <img
                                            src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'}
                                            alt={product.title || product.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/5 transition-colors duration-700 pointer-events-none" />
                                    </div>
                                    <div className="flex flex-col items-center text-center px-4">
                                        <h3 className="font-['Playfair_Display',serif] text-[22px] text-[#33302c] mb-1.5">
                                            {product.title || product.name}
                                        </h3>
                                        <p className="text-[14px] font-semibold text-[#736e68]/80">
                                            {product.price?.currency || 'INR'} {product.price?.amount || product.price || 0}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-32 text-center border border-[#e0d7c6] rounded-[4px] bg-white/50">
                                <p className="text-[#736e68] font-['Playfair_Display',serif] text-2xl mb-4">
                                    {searchResults !== null ? 'No products found.' : 'The Collection is currently empty.'}
                                </p>
                                <p className="text-sm text-[#736e68]/70">
                                    {searchResults !== null
                                        ? 'Try a different search term.'
                                        : 'Please check back later for our new arrivals.'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Load More Action */}
                    {displayProducts && displayProducts.length > 0 && searchResults === null && (
                        <div className="w-full flex justify-center mt-12">
                            <button className="text-[12px] font-medium tracking-[0.15em] uppercase text-[#8c6b4a] bg-transparent border border-[#8c6b4a] px-8 py-2.5 rounded-[4px] hover:bg-[#8c6b4a] hover:text-white transition-all duration-500 ease-out">
                                Discover More
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className="bg-[#fcfaf8] border-t border-[#e0d7c6]/50 mt-auto">
                <div className="flex flex-col md:flex-row justify-between items-center w-full px-5 md:px-16 lg:px-20 py-12 max-w-[1440px] mx-auto gap-8 md:gap-0">
                    <div className="font-['Playfair_Display',serif] text-[24px] tracking-[0.15em] text-[#8c6b4a] uppercase">
                        SNITCH
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        {['Journal', 'Privacy', 'Terms', 'Shipping'].map((link) => (
                            <a key={link} className="text-[11px] uppercase tracking-[0.15em] text-[#736e68] hover:text-[#8c6b4a] transition-all" href="#">
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
    )
}

export default Home
