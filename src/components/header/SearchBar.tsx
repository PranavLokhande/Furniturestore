// ============================================================
// WoodCraft India – SearchBar
// Full-featured search with dropdown results
// ============================================================
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';
import { searchProducts } from '../../data/products';
import { formatPrice } from '../../lib/utils';
import type { Product } from '../../types';

const POPULAR_SEARCHES = [
  'Sofa Set',
  'King Bed',
  'Dining Table',
  'Wardrobe',
  'Coffee Table',
];

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Run search when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const found = searchProducts(query).slice(0, 6);
      setResults(found);
    } else {
      setResults([]);
    }
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showDropdown = isOpen || focused;

  const handleFocus = () => {
    setFocused(true);
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      setIsOpen(false);
      setFocused(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleProductClick = useCallback((slug: string) => {
    setIsOpen(false);
    setFocused(false);
    setQuery('');
    navigate(`/product/${slug}`);
  }, [navigate]);

  const handlePopularClick = useCallback((term: string) => {
    setQuery(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setIsOpen(false);
  }, [navigate]);

  const clearQuery = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const dropdownVisible = showDropdown && (query.trim() === '' || results.length > 0 || query.trim().length > 0);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* Input */}
      <div
        className={`flex items-center gap-2 border rounded-sm px-3 py-2.5 bg-white transition-all duration-150 ${
          focused ? 'border-brand-dark ring-1 ring-brand-dark/20' : 'border-brand-border'
        }`}
      >
        <Search size={16} className="text-brand-muted flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search for furniture, decor…"
          className="flex-1 bg-transparent text-sm text-brand-dark placeholder:text-brand-muted outline-none"
          aria-label="Search products"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={clearQuery}
            className="text-brand-muted hover:text-brand-dark transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {dropdownVisible && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-brand-border rounded-sm shadow-xl z-50 overflow-hidden">
          {/* Empty query → show popular searches */}
          {query.trim() === '' && (
            <div className="p-3">
              <p className="text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-2 flex items-center gap-1">
                <TrendingUp size={12} /> Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handlePopularClick(term)}
                    className="text-xs bg-brand-bg border border-brand-border text-brand-dark px-3 py-1.5 rounded-full hover:bg-brand-yellow hover:border-brand-yellow transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Has query → show results */}
          {query.trim().length > 0 && results.length > 0 && (
            <ul>
              {results.map((product) => {
                const mainImage = product.images.find((img) => img.type === 'main') ?? product.images[0];
                return (
                  <li key={product.id}>
                    <button
                      onClick={() => handleProductClick(product.slug)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-brand-bg transition-colors text-left"
                    >
                      <img
                        src={mainImage?.url ?? ''}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-sm flex-shrink-0 bg-brand-bg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-brand-dark truncate">{product.name}</p>
                        <p className="text-xs text-brand-muted">{product.category_name}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-brand-dark">{formatPrice(product.price)}</p>
                        {product.discount_percentage > 0 && (
                          <p className="text-[11px] text-green-600 font-semibold">{product.discount_percentage}% off</p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}

              {/* View all results */}
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                  }}
                  className="w-full text-center text-xs font-semibold text-brand-dark py-2.5 border-t border-brand-border hover:bg-brand-yellow transition-colors"
                >
                  View all results for "{query}"
                </button>
              </li>
            </ul>
          )}

          {/* Has query but no results */}
          {query.trim().length > 0 && results.length === 0 && (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-brand-muted">No results found for <strong>"{query}"</strong></p>
              <p className="text-xs text-brand-muted mt-1">Try a different keyword or browse categories</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
