/**
 * SearchBar — standalone reusable component
 *
 * NOTE: The primary search experience is now fully integrated inside Navbar.jsx
 * via the inline expanding search icon. This component remains available for
 * any external standalone usage if needed.
 *
 * Props:
 *  - onResults {function} — called with live search product array
 *  - placeholder {string} — optional custom placeholder
 *  - className {string}   — optional container class overrides
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useProduct } from '../hooks/useProduct.jsx';
import { useNavigate } from 'react-router';

const SearchBar = ({ onResults, placeholder, className = '' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const { handleSearchProducts } = useProduct();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  const runSearch = useCallback(async (term) => {
    if (!term.trim()) { setResults([]); onResults?.([]); return; }
    setLoading(true);
    try {
      const data = await handleSearchProducts({ search: term });
      const safe = Array.isArray(data) ? data : [];
      setResults(safe);
      setOpen(safe.length > 0);
      onResults?.(safe);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [handleSearchProducts, onResults]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!query.trim()) { setResults([]); setOpen(false); onResults?.([]); return; }
    debounceRef.current = setTimeout(() => runSearch(query), 350);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const clear = () => { setQuery(''); setResults([]); setOpen(false); onResults?.([]); inputRef.current?.focus(); };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input row */}
      <div className="relative flex items-center">
        <span className="absolute left-0 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-colors duration-300 ${focused ? 'text-[#8c6b4a]' : 'text-[#b0a184]'}`}>
            <circle cx="11" cy="11" r="7.5" /><path d="m21 21-4.35-4.35" />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => { setFocused(true); if (results.length > 0) setOpen(true); }}
          onBlur={() => setFocused(false)}
          placeholder={placeholder || 'Search the collection…'}
          autoComplete="off"
          spellCheck="false"
          className={`w-full pl-6 pr-8 py-2.5 bg-transparent border-b text-[12.5px] tracking-wide text-[#33302c] placeholder:text-[#b0a184] focus:outline-none transition-all duration-400 ${
            focused ? 'border-[#8c6b4a]' : 'border-[#dcd5cb]'
          }`}
        />

        <span className="absolute right-0 top-1/2 -translate-y-1/2">
          {loading ? (
            <span className="w-3.5 h-3.5 border border-[#8c6b4a]/30 border-t-[#8c6b4a] rounded-full animate-spin block" />
          ) : query ? (
            <button onClick={clear} className="text-[#b0a184] hover:text-[#8c6b4a] transition-colors duration-200">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          ) : null}
        </span>
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-[#fcfaf8] border border-[#e0d7c6] shadow-[0_20px_60px_rgba(51,48,44,0.10)] z-[200] overflow-hidden" style={{ borderRadius: '1px' }}>
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#e0d7c6]/60">
            <span className="text-[9.5px] uppercase tracking-[0.22em] text-[#b0a184]">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </span>
            <button onClick={() => setOpen(false)} className="text-[9.5px] uppercase tracking-widest text-[#b0a184] hover:text-[#8c6b4a] transition-colors">
              Close
            </button>
          </div>
          <ul className="max-h-[320px] overflow-y-auto divide-y divide-[#e0d7c6]/30">
            {results.map((product, idx) => (
              <li key={product._id || idx}>
                <button
                  onClick={() => { setQuery(''); setOpen(false); navigate(`/product/${product._id}`); }}
                  className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-[#f7f3ec] transition-colors duration-200 text-left group"
                >
                  <div className="flex-shrink-0 w-10 h-12 bg-[#ebe5d9] overflow-hidden">
                    <img
                      src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=200&auto=format&fit=crop'}
                      alt={product.title || product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] font-['Playfair_Display',serif] text-[#33302c] truncate group-hover:text-[#8c6b4a] transition-colors duration-200">
                      {product.title || product.name}
                    </p>
                    <p className="text-[10.5px] text-[#b0a184] mt-0.5">
                      {product.price?.currency || 'INR'} {product.price?.amount ?? product.price ?? '—'}
                    </p>
                  </div>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    className="text-[#c2baad] group-hover:text-[#8c6b4a] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No results */}
      {open && results.length === 0 && !loading && query.trim() && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-[#fcfaf8] border border-[#e0d7c6] shadow-[0_20px_60px_rgba(51,48,44,0.10)] z-[200] px-6 py-8 text-center" style={{ borderRadius: '1px' }}>
          <p className="text-[10.5px] uppercase tracking-[0.2em] text-[#b0a184]">No results for "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
