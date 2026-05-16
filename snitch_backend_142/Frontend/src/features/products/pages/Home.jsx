import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct.jsx'

const Home = () => {
    const allProducts = useSelector(state => state.products.allProducts)
    const { handleGetAllProducts } = useProduct()

    useEffect(() => {
        handleGetAllProducts()
    }, [])

    return (
        <div className="text-[#33302c] antialiased min-h-screen flex flex-col bg-[#fcfaf8] font-['Inter',sans-serif]">
            {/* TopNavBar */}
            <nav className="bg-[#fcfaf8] border-b border-[#e0d7c6]/50 w-full z-50 sticky top-0">
                <div className="flex justify-between items-center w-full px-5 md:px-20 py-2 max-w-[1440px] mx-auto h-[80px]">
                    <div className="md:hidden flex items-center">
                        <span className="text-[#8c6b4a] font-medium tracking-widest text-xs uppercase cursor-pointer">Menu</span>
                    </div>
                    <a className="font-['Playfair_Display',serif] text-2xl tracking-[0.15em] text-[#8c6b4a] uppercase" href="/">
                        SNITCH
                    </a>
                    <div className="hidden md:flex space-x-8 items-center">
                        <a className="text-[12px] uppercase tracking-widest text-[#736e68] hover:text-[#8c6b4a] transition-colors duration-300" href="#">
                            New Arrivals
                        </a>
                        <a className="text-[12px] uppercase tracking-widest text-[#8c6b4a] border-b border-[#8c6b4a] pb-1 opacity-90 transition-opacity hover:opacity-100 duration-300" href="#">
                            Collections
                        </a>
                        <a className="text-[12px] uppercase tracking-widest text-[#736e68] hover:text-[#8c6b4a] transition-colors duration-300" href="#">
                            Lookbook
                        </a>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a className="hidden md:block text-[12px] uppercase tracking-widest text-[#736e68] hover:text-[#8c6b4a] transition-colors duration-300" href="/login">
                            Account
                        </a>
                        <a className="relative group text-[#8c6b4a] text-xs uppercase tracking-widest hover:text-[#6b5035] transition-colors duration-300" href="#">
                            Bag (0)
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content Canvas */}
            <main className="flex-grow w-full flex flex-col max-w-[1440px] mx-auto">
                {/* Subtle Hero Section */}
                <section className="w-full px-5 md:px-20 pt-[80px] pb-[40px] flex flex-col items-center text-center">
                    <h1 className="font-['Playfair_Display',serif] text-4xl md:text-[64px] leading-none text-[#33302c] mb-5 max-w-3xl tracking-tight">
                        The Collection
                    </h1>
                    <p className="text-sm md:text-[15px] text-[#736e68] max-w-lg mx-auto leading-relaxed">
                        Curated essentials for the modern aesthetic. Uncompromising materials meeting minimalist silhouettes, designed for effortless sophistication.
                    </p>
                </section>

                {/* Product Grid Section */}
                <section className="w-full px-5 md:px-20 pb-[100px] mb-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-16">
                        {allProducts && allProducts.length > 0 ? (
                            allProducts.map((product, index) => (
                                <div key={index} className="group flex flex-col cursor-pointer transition-all duration-700 ease-out hover:-translate-y-1.5">
                                    <div className="relative w-full aspect-[4/5] bg-[#EBE5D9] overflow-hidden mb-5 shadow-sm md:group-hover:shadow-[0_15px_35px_-10px_rgba(140,107,74,0.15)] transition-all duration-500 rounded-xl">
                                        <img 
                                            src={product.images[index]?.url || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"} 
                                            alt={product.title || product.name} 
                                            className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-[1.03]" 
                                        />
                                        <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/5 transition-colors duration-700 pointer-events-none" />
                                    </div>
                                    <div className="flex flex-col items-center text-center px-4">
                                        <h3 className="font-['Playfair_Display',serif] text-[22px] text-[#33302c] mb-1.5">{product.title || product.name}</h3>
                                        <p className="text-[14px] font-semibold text-[#736e68]/80">
                                            {product.price?.currency || 'INR'} {product.price?.amount || product.price || 0}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-32 text-center border border-[#e0d7c6] rounded-[4px] bg-white/50">
                                <p className="text-[#736e68] font-['Playfair_Display',serif] text-2xl mb-4">The Collection is currently empty.</p>
                                <p className="text-sm text-[#736e68]/70">Please check back later for our new arrivals.</p>
                            </div>
                        )}
                    </div>

                    {/* Load More Action */}
                    {allProducts && allProducts.length > 0 && (
                        <div className="w-full flex justify-center mt-12">
                            <button className="text-[12px] font-medium tracking-[0.15em] uppercase text-[#8c6b4a] bg-transparent border border-[#8c6b4a] px-8 py-2.5 rounded-[4px] hover:bg-[#8c6b4a] hover:text-white transition-all duration-500 ease-out">
                                Discover More
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#fcfaf8] border-t border-[#e0d7c6]/50 mt-auto">
                <div className="flex flex-col md:flex-row justify-between items-center w-full px-5 md:px-20 py-12 max-w-[1440px] mx-auto gap-8 md:gap-0">
                    <div className="font-['Playfair_Display',serif] text-[24px] tracking-[0.15em] text-[#8c6b4a] uppercase">
                        SNITCH
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        <a className="text-[11px] uppercase tracking-[0.15em] text-[#736e68] hover:text-[#8c6b4a] transition-all" href="#">Journal</a>
                        <a className="text-[11px] uppercase tracking-[0.15em] text-[#736e68] hover:text-[#8c6b4a] transition-all" href="#">Privacy</a>
                        <a className="text-[11px] uppercase tracking-[0.15em] text-[#736e68] hover:text-[#8c6b4a] transition-all" href="#">Terms</a>
                        <a className="text-[11px] uppercase tracking-[0.15em] text-[#736e68] hover:text-[#8c6b4a] transition-all" href="#">Shipping</a>
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
