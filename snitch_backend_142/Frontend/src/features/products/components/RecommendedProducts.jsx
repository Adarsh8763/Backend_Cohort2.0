import { useNavigate } from "react-router";

const headings = [
  { eyebrow: "Editorial Curation", title: "You May Also Like" },
  { eyebrow: "From The Collection", title: "Curated For You" },
  { eyebrow: "Continue Exploring", title: "More From The Collection" },
];

const RecommendedProducts = ({ products, headingIndex = 0, isLoading }) => {
  const navigate = useNavigate();
  const heading = headings[headingIndex % headings.length];

  const formatPrice = (product) => {
    const price = product?.variants?.[0]?.price || product?.price;
    if (!price) return null;
    const symbol = price.currency === "INR" ? "₹" : price.currency;
    return `${symbol}${price.amount?.toLocaleString("en-IN")}`;
  };

  const getImage = (product) => {
    return (
      product?.variants?.[0]?.images?.[0]?.url ||
      product?.images?.[0]?.url ||
      null
    );
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="w-full max-w-[1440px] mx-auto px-5 md:px-20 py-20 md:py-28">
        {/* Section Header Skeleton */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-24 h-px bg-[#e0d7c6] mb-6" />
          <div className="h-3 w-32 bg-[#ebe5d9] rounded mb-5 animate-pulse" />
          <div className="h-8 w-64 bg-[#ebe5d9] rounded animate-pulse" />
          <div className="w-24 h-px bg-[#e0d7c6] mt-6" />
        </div>
        {/* Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div
                className="w-full aspect-[3/4] bg-[#ebe5d9] animate-pulse"
                style={{ animationDelay: `${i * 120}ms` }}
              />
              <div className="h-3 w-3/4 bg-[#ebe5d9] rounded animate-pulse" style={{ animationDelay: `${i * 120}ms` }} />
              <div className="h-3 w-1/3 bg-[#ebe5d9] rounded animate-pulse" style={{ animationDelay: `${i * 120}ms` }} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // No products
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-5 md:px-20 py-20 md:py-32">
      {/* ── Ruled Section Divider ── */}
      <div className="flex items-center gap-6 mb-16 md:mb-20">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#e0d7c6]" />
        <div className="flex flex-col items-center gap-3">
          <p className="text-[9px] uppercase tracking-[0.35em] text-[#b0a184]">
            {heading.eyebrow}
          </p>
          <h2 className="font-['Playfair_Display',serif] text-2xl md:text-3xl text-[#33302c] tracking-tight">
            {heading.title}
          </h2>
          <div className="w-8 h-px bg-[#8c6b4a]" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#e0d7c6]" />
      </div>

      {/* ── Product Rail ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
        {products.slice(0, 8).map((product, idx) => {
          const imageUrl = getImage(product);
          const price = formatPrice(product);

          return (
            <article
              key={product._id || idx}
              onClick={() => navigate(`/product/${product._id}`)}
              className="group cursor-pointer flex flex-col"
              style={{
                animationDelay: `${idx * 60}ms`,
              }}
            >
              {/* ── Card Image ── */}
              <div className="relative w-full aspect-[3/4] bg-[#ebe5d9] overflow-hidden mb-5">
                {/* Subtle editorial index marker */}
                <span className="absolute top-4 left-4 z-10 text-[9px] uppercase tracking-[0.25em] text-[#fcfaf8]/70 font-light select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="rounded-xl w-full h-full object-cover object-center transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#c2baad"
                      strokeWidth="1"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="0" />
                      <path d="M3 9l4-4 5 5 3-3 6 6" />
                    </svg>
                  </div>
                )}

                {/* Warm veil on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f14]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Discover CTA */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                  <div className="bg-[#fcfaf8]/95 backdrop-blur-sm px-5 py-3.5 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#33302c]">
                      View Piece
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8c6b4a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ── Card Info ── */}
              <div className="flex flex-col gap-1.5 px-0.5">
                <h3 className="text-[12px] uppercase tracking-[0.12em] text-[#33302c] leading-relaxed line-clamp-1 group-hover:text-[#8c6b4a] transition-colors duration-300">
                  {product.title}
                </h3>
                {price && (
                  <span className="font-['Playfair_Display',serif] text-[15px] text-[#736e68]">
                    {price}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Bottom editorial mark ── */}
      <div className="flex items-center justify-center mt-16 md:mt-20 gap-3">
        <div className="w-12 h-px bg-[#e0d7c6]" />
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#b0a184]">
          End of Selection
        </span>
        <div className="w-12 h-px bg-[#e0d7c6]" />
      </div>
    </section>
  );
};

export default RecommendedProducts;
