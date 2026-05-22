import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useProduct } from '../hooks/useProduct.jsx';

/* ─────────────────────────────────────────────────────────
   SNITCH — Premium Editorial Navbar
   • Logo: LEFT  (Playfair Display, luxury amber)
   • Nav + Search icon: RIGHT
   • Search expands INLINE inside the navbar on click
   • Dropdown panel: full-width editorial discovery panel
   • Props:
       showSearch     {boolean}  — enable search icon
       onSearchResults{fn}       — callback with results
       cartCount      {number}   — bag count badge
       backButton     {boolean}  — ← Back mode (detail pages)
───────────────────────────────────────────────────────── */

// ── Inline Search Engine ──────────────────────────────────
const useInlineSearch = (onSearchResults) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handleSearchProducts } = useProduct();
  const debounceRef = useRef(null);

  const performSearch = useCallback(async (term) => {
    if (!term.trim()) {
      setResults([]);
      onSearchResults?.([]);
      return;
    }
    setLoading(true);
    try {
      const data = await handleSearchProducts({ search: term });
      const safe = Array.isArray(data) ? data : [];
      setResults(safe);
      onSearchResults?.(safe);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [handleSearchProducts, onSearchResults]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResults([]);
      onSearchResults?.([]);
      return;
    }
    debounceRef.current = setTimeout(() => performSearch(query), 380);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const clear = () => { setQuery(''); setResults([]); onSearchResults?.([]); };

  return { query, setQuery, results, loading, clear };
};

// ── Popular / Trending mock data (shown when no query) ────
const POPULAR_SEARCHES = ['Oversized Linen', 'Minimal Blazer', 'Studio Trousers', 'Relaxed Tee'];

// ── Main Navbar ───────────────────────────────────────────
const Navbar = ({
  showSearch = false,
  onSearchResults,
  cartCount = 0,
  backButton = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // scroll state
  const [scrolled, setScrolled] = useState(false);

  // mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // search open/close
  const [searchOpen, setSearchOpen] = useState(false);

  // dropdown panel visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);

  const { query, setQuery, results, loading, clear } = useInlineSearch(onSearchResults);

  // ── Scroll listener ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Open search & auto-focus ──
  const openSearch = () => {
    setSearchOpen(true);
    setDropdownOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  // ── Close search & reset ──
  const closeSearch = () => {
    setSearchOpen(false);
    setDropdownOpen(false);
    clear();
  };

  // ── Click-outside closes search ──
  useEffect(() => {
    const handler = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        closeSearch();
      }
    };
    if (searchOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);

  // ── Escape key ──
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeSearch(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // ── Show dropdown on input focus if already open ──
  const handleInputFocus = () => setDropdownOpen(true);
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setDropdownOpen(true);
  };

  const handleProductClick = (product) => {
    closeSearch();
    navigate(`/product/${product._id}`);
  };

  const handlePopularClick = (term) => {
    setQuery(term);
    setDropdownOpen(true);
  };

  const isActive = (path) =>
    path !== '#' && location.pathname === path;

  const navLinks = [
    { label: 'Home',     path: '/'      },
    { label: 'Shop',     path: '/'      },
    { label: 'Wishlist', path: '#'      },
    { label: 'Account',  path: '/login' },
  ];

  // show results list vs idle panel
  const showResultsPanel = dropdownOpen && query.trim().length > 0;
  const showIdlePanel    = dropdownOpen && query.trim().length === 0 && searchOpen;

  return (
    <>
      {/* ── Backdrop scrim when search open ── */}
      <div
        className={`fixed inset-0 z-40 bg-[#33302c]/10 backdrop-blur-[2px] transition-opacity duration-500 pointer-events-none ${
          searchOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <header
        className={`w-full z-50 sticky top-0 transition-all duration-500 ease-in-out ${
          scrolled || searchOpen
            ? 'bg-[#fcfaf8]/97 backdrop-blur-xl shadow-[0_1px_32px_rgba(51,48,44,0.07)]'
            : 'bg-[#fcfaf8]'
        } border-b border-[#e0d7c6]/70`}
      >
        {/* ════════════════════════════════════════
            MAIN NAV RAIL
        ════════════════════════════════════════ */}
        <div className="relative flex items-center w-full px-6 md:px-14 lg:px-20 max-w-[1440px] mx-auto h-[76px]">

          {/* ── LEFT: Logo / Back ── */}
          <div className="flex items-center flex-shrink-0">
            {backButton ? (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.18em] text-[#736e68] hover:text-[#8c6b4a] transition-colors duration-300 group"
              >
                <svg
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:-translate-x-0.5 transition-transform duration-300"
                >
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back
              </button>
            ) : (
              <a
                href="/"
                className="font-['Playfair_Display',serif] text-[20px] md:text-[22px] tracking-[0.22em] text-[#8c6b4a] uppercase select-none hover:opacity-75 transition-opacity duration-400"
              >
                SNITCH
              </a>
            )}
          </div>

          {/* ── SPACER ── */}
          <div className="flex-1" />

          {/* ── RIGHT: Nav + Actions ── */}
          <div className="flex items-center gap-7 md:gap-8">

            {/* Desktop nav links — hidden when search is open */}
            {!backButton && (
              <nav
                className={`hidden md:flex items-center gap-7 transition-all duration-400 ease-in-out ${
                  searchOpen
                    ? 'opacity-0 pointer-events-none translate-x-2'
                    : 'opacity-100 translate-x-0'
                }`}
              >
                {navLinks.map(({ label, path }) => (
                  <a
                    key={label}
                    href={path}
                    className={`relative text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-300 group whitespace-nowrap ${
                      isActive(path)
                        ? 'text-[#8c6b4a]'
                        : 'text-[#736e68] hover:text-[#3b3834]'
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-[#8c6b4a] transition-all duration-400 ${
                        isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                ))}
              </nav>
            )}

            {/* ── Divider ── */}
            {!backButton && (
              <span className={`hidden md:block h-3.5 w-px bg-[#dcd5cb] flex-shrink-0 transition-all duration-400 ${searchOpen ? 'opacity-0' : 'opacity-100'}`} />
            )}

            {/* ── Bag icon ── */}
            <a
              href="#"
              aria-label="Shopping Bag"
              className={`relative group flex-shrink-0 text-[#736e68] hover:text-[#8c6b4a] transition-all duration-300 ${
                searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <svg
                width="17" height="17" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:scale-105 transition-transform duration-300"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#8c6b4a] text-white text-[8px] flex items-center justify-center font-medium leading-none">
                  {cartCount}
                </span>
              )}
            </a>

            {/* ── Search area ── */}
            {showSearch && (
              <div ref={searchWrapRef} className="relative flex items-center">

                {/* Expanding search input — grows left from the icon */}
                <div
                  className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
                    searchOpen ? 'w-[220px] md:w-[300px] lg:w-[360px]' : 'w-0'
                  }`}
                >
                  <div className="relative w-full flex items-center">
                    {/* Animated underline input */}
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={query}
                      onChange={handleQueryChange}
                      onFocus={handleInputFocus}
                      placeholder="Search the collection…"
                      spellCheck="false"
                      autoComplete="off"
                      className={`w-full bg-transparent text-[12.5px] tracking-wide text-[#33302c] border-b placeholder:text-[#b0a184] focus:outline-none transition-all duration-400 pr-7 pl-0 py-1 ${
                        searchOpen
                          ? 'border-[#8c6b4a] placeholder:opacity-100'
                          : 'border-transparent placeholder:opacity-0'
                      }`}
                    />

                    {/* Clear / spinner */}
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                      {loading ? (
                        <span className="w-3 h-3 border border-[#8c6b4a]/30 border-t-[#8c6b4a] rounded-full animate-spin block" />
                      ) : query ? (
                        <button
                          onClick={clear}
                          className="text-[#b0a184] hover:text-[#8c6b4a] transition-colors duration-200"
                          aria-label="Clear"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      ) : null}
                    </span>
                  </div>
                </div>

                {/* Search / Close icon button */}
                <button
                  onClick={searchOpen ? closeSearch : openSearch}
                  aria-label={searchOpen ? 'Close search' : 'Open search'}
                  className={`flex-shrink-0 transition-all duration-300 ml-1 ${
                    searchOpen
                      ? 'text-[#8c6b4a]'
                      : 'text-[#736e68] hover:text-[#8c6b4a]'
                  }`}
                >
                  {searchOpen ? (
                    /* X icon */
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  ) : (
                    /* Magnifier icon */
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7.5" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  )}
                </button>

                {/* ══════════════════════════════════════
                    SEARCH DROPDOWN PANEL
                ══════════════════════════════════════ */}
                <div
                  className={`absolute right-0 top-[calc(100%+20px)] w-[88vw] max-w-[560px] bg-[#fcfaf8] border border-[#e0d7c6]/80 shadow-[0_24px_64px_rgba(51,48,44,0.11)] z-[200] overflow-hidden transition-all duration-500 ease-in-out origin-top-right ${
                    dropdownOpen && searchOpen
                      ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 scale-[0.98] pointer-events-none'
                  }`}
                  style={{ borderRadius: '1px' }}
                >

                  {/* ── Results State ── */}
                  {showResultsPanel && (
                    <>
                      {/* Results header */}
                      <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#e0d7c6]/60">
                        <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#b0a184] font-medium">
                          {loading ? 'Searching…' : `${results.length} Result${results.length !== 1 ? 's' : ''}`}
                        </span>
                        <button
                          onClick={() => navigate(`/?q=${encodeURIComponent(query)}`)}
                          className="text-[9.5px] uppercase tracking-[0.2em] text-[#8c6b4a] hover:text-[#6b5035] transition-colors duration-200 flex items-center gap-1.5 group"
                        >
                          See All
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Product results */}
                      {results.length > 0 ? (
                        <ul className="max-h-[320px] overflow-y-auto">
                          {results.map((product, idx) => (
                            <li key={product._id || idx} className="border-b border-[#e0d7c6]/30 last:border-0">
                              <button
                                onClick={() => handleProductClick(product)}
                                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-[#f7f3ec] transition-colors duration-250 text-left group"
                              >
                                {/* Thumb */}
                                <div className="flex-shrink-0 w-11 h-[52px] bg-[#ebe5d9] overflow-hidden">
                                  <img
                                    src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=200&auto=format&fit=crop'}
                                    alt={product.title || product.name}
                                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.07]"
                                  />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12.5px] font-['Playfair_Display',serif] text-[#33302c] truncate group-hover:text-[#8c6b4a] transition-colors duration-200 leading-snug">
                                    {product.title || product.name}
                                  </p>
                                  <p className="text-[10.5px] text-[#b0a184] mt-1 tracking-wide">
                                    {product.price?.currency || 'INR'} {product.price?.amount ?? product.price ?? '—'}
                                  </p>
                                </div>

                                {/* Arrow */}
                                <svg
                                  width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  className="text-[#c2baad] group-hover:text-[#8c6b4a] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                                >
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : !loading ? (
                        <div className="px-6 py-10 text-center">
                          <p className="text-[11px] uppercase tracking-[0.2em] text-[#c2baad]">
                            No results for
                          </p>
                          <p className="font-['Playfair_Display',serif] text-[16px] text-[#736e68] mt-1.5 italic">
                            "{query}"
                          </p>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[#b0a184] mt-4">
                            Try a different term
                          </p>
                        </div>
                      ) : (
                        /* Loading skeleton */
                        <div className="px-6 py-6 flex flex-col gap-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-4 animate-pulse">
                              <div className="w-11 h-[52px] bg-[#e8e2d8] flex-shrink-0" />
                              <div className="flex-1 space-y-2">
                                <div className="h-2.5 bg-[#e8e2d8] rounded-full w-3/4" />
                                <div className="h-2 bg-[#e8e2d8] rounded-full w-1/3" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Footer action */}
                      {results.length > 0 && (
                        <div className="border-t border-[#e0d7c6]/60 px-6 py-3.5">
                          <button
                            onClick={() => { closeSearch(); navigate('/'); }}
                            className="w-full text-center text-[9.5px] uppercase tracking-[0.22em] text-[#736e68] hover:text-[#8c6b4a] transition-colors duration-200"
                          >
                            View Full Collection
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* ── Idle / Discovery State ── */}
                  {showIdlePanel && (
                    <div className="px-6 py-6">

                      {/* Popular searches */}
                      <div className="mb-6">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-[#b0a184] mb-4 font-medium">
                          Popular Searches
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {POPULAR_SEARCHES.map((term) => (
                            <button
                              key={term}
                              onClick={() => handlePopularClick(term)}
                              className="px-3.5 py-1.5 border border-[#dcd5cb] text-[10.5px] tracking-[0.12em] text-[#736e68] hover:border-[#8c6b4a] hover:text-[#8c6b4a] hover:bg-[#f7f3ec] transition-all duration-250"
                              style={{ borderRadius: '1px' }}
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Thin separator */}
                      <div className="w-full h-px bg-[#e0d7c6]/60 mb-6" />

                      {/* Trending section hint */}
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-[#b0a184] mb-3 font-medium">
                          Trending Now
                        </p>
                        <div className="flex flex-col gap-2.5">
                          {['Studio Collection', 'Relaxed Silhouettes', 'Muted Palettes'].map((item, idx) => (
                            <button
                              key={item}
                              onClick={() => handlePopularClick(item)}
                              className="flex items-center gap-3 group text-left"
                            >
                              <span className="text-[9px] text-[#c2baad] w-4 font-light tabular-nums">
                                0{idx + 1}
                              </span>
                              <span className="text-[11.5px] font-['Playfair_Display',serif] text-[#736e68] group-hover:text-[#33302c] italic transition-colors duration-200">
                                {item}
                              </span>
                              <svg
                                width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                className="ml-auto text-[#d4ccc2] group-hover:text-[#8c6b4a] group-hover:translate-x-0.5 transition-all duration-200"
                              >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile menu toggle */}
            {!backButton && (
              <button
                className="md:hidden flex flex-col gap-[5px] p-0.5 group flex-shrink-0"
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
              >
                <span className={`block h-px w-5 bg-[#736e68] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-px w-5 bg-[#736e68] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-px w-5 bg-[#736e68] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════
            MOBILE DROPDOWN MENU
        ════════════════════════════════════════ */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          } bg-[#fcfaf8] border-t border-[#e0d7c6]/50`}
        >
          <nav className="flex flex-col px-7 py-5 gap-5">
            {navLinks.map(({ label, path }) => (
              <a
                key={label}
                href={path}
                onClick={() => setMenuOpen(false)}
                className={`text-[10.5px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive(path) ? 'text-[#8c6b4a]' : 'text-[#736e68] hover:text-[#33302c]'
                }`}
              >
                {label}
              </a>
            ))}

            {/* Mobile search row */}
            {showSearch && (
              <div className="flex items-center gap-3 pt-2 border-t border-[#e0d7c6]/50">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-[#b0a184] flex-shrink-0">
                  <circle cx="11" cy="11" r="7.5" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search collection…"
                  className="flex-1 bg-transparent text-[11px] tracking-wide text-[#33302c] placeholder:text-[#b0a184] focus:outline-none border-b border-[#e0d7c6] pb-1 focus:border-[#8c6b4a] transition-colors duration-300"
                  onChange={(e) => { setQuery(e.target.value); }}
                />
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
