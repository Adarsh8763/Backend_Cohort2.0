import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../hook/useCart";
import Navbar from "../../products/components/Navbar.jsx";
import { useNavigate } from "react-router";

/* ─────────────────────────────────────────────────────────
   SNITCH — Premium Editorial Cart Page
   Design Language: Fear of God · COS · Zara Studio
   Palette: Warm cream · Charcoal · Muted amber · Stone
   Typography: Playfair Display (serif) · Inter (sans)
───────────────────────────────────────────────────────── */

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=800&auto=format&fit=crop";

const formatCurrency = (amount, currency = "INR") => {
  const symbol = currency === "INR" ? "₹" : currency;
  return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
};

// ─────────────────────────────────────────────────────────
// QUANTITY CONTROL
// ─────────────────────────────────────────────────────────
const QuantityControl = ({ quantity, onDecrease, onIncrease, loading }) => (
  <div className="flex items-center" aria-label="Quantity selector">
    <button
      id="qty-decrease"
      onClick={onDecrease}
      disabled={quantity <= 1 || loading}
      aria-label="Decrease quantity"
      className={`w-7 h-7 flex items-center justify-center border border-[#ccc4b5] text-[#6e6560] text-[13px] font-medium transition-all duration-300
        ${
          quantity <= 1 || loading
            ? "opacity-30 cursor-not-allowed"
            : "hover:border-[#8c6b4a]/60 hover:text-[#8c6b4a]"
        }`}
    >
      −
    </button>
    <div className="w-9 h-7 flex items-center justify-center border-t border-b border-[#ccc4b5] text-[11px] font-medium text-[#2a2724] tracking-widest select-none">
      {loading ? (
        <span className="w-2 h-2 border border-[#8c6b4a]/50 border-t-[#8c6b4a] rounded-full animate-spin block" />
      ) : (
        quantity
      )}
    </div>
    <button
      id="qty-increase"
      onClick={onIncrease}
      disabled={loading}
      aria-label="Increase quantity"
      className={`w-7 h-7 flex items-center justify-center border border-[#ccc4b5] text-[#6e6560] text-[13px] font-medium transition-all duration-300
        ${loading ? "opacity-30 cursor-not-allowed" : "hover:border-[#8c6b4a]/60 hover:text-[#8c6b4a]"}`}
    >
      +
    </button>
  </div>
);

// ─────────────────────────────────────────────────────────
// CART ITEM — vertically centered, editorially composed
// ─────────────────────────────────────────────────────────
const CartItem = ({ item, onRemove, onIncrementQuantity, onDecrementQuantity }) => {
  const [qtyLoading, setQtyLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const { product, variant, quantity, price, _id } = item;

  const productTitle = typeof product === "object" ? product?.title : null;
  const pId = typeof product === "object" ? product?._id : product;
  const vId = typeof variant === "object" ? variant?._id : variant;

  const productVariant = typeof product === "object" 
    ? (Array.isArray(product?.variants) 
        ? product.variants.find(v => v._id === vId) 
        : product?.variants) 
    : null;

  const variantAttributes = productVariant?.attributes || (typeof variant === "object" ? variant?.attributes : null);

  const displayImages =
    productVariant?.images?.length > 0
      ? productVariant.images
      : typeof variant === "object" && variant?.images?.length > 0
        ? variant.images
        : typeof product === "object" && product?.images?.length > 0
          ? product.images
          : null;
  const displayImage = displayImages?.[0]?.url || FALLBACK_IMAGE;

  const stock = productVariant ? productVariant.stock : null;

  const getStockMessage = (s) => {
    if (s === null || s === undefined) return null;
    if (s === 0) return "Out of stock";
    if (s <= 3) return `Only ${s} left`;
    if (s <= 6) return "Low in stock";
    if (s <= 10) return "Few pieces remaining";
    return null;
  };

  const stockMsg = getStockMessage(stock);

  const handleIncrease = async () => {
    setQtyLoading(true);
    try {
      await onIncrementQuantity({ productId: pId, variantId: vId });
    } catch (error) {
      console.error(error);
    } finally {
      setQtyLoading(false); 
    }
  };

  const handleDecrease = async () => {
    if (quantity <= 1) return;
    setQtyLoading(true);
    try {
      await onDecrementQuantity({ productId: pId, variantId: vId });
    } catch (error) {
      console.error(error);
    } finally {
      setQtyLoading(false);
    }
  };

  const handleRemove = async () => {
    setRemoveLoading(true);
    await onRemove({ cartItemId: _id });
  };

  return (
    <div className="group flex items-center gap-5 md:gap-7 py-5 border-b border-[#e8e2d8] transition-colors duration-500 -mx-5 md:-mx-0 px-5 md:px-0">
      {/* ── Product Image ── */}
      <div className="flex-shrink-0 w-[88px] h-[108px] md:w-[100px] md:h-[122px] bg-[#ede7dd] overflow-hidden">
        <img
          src={displayImage}
          alt={productTitle || "Product"}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      {/* ── Product Info ── */}
      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center md:gap-6">
        {/* Title + Attributes */}
        <div className="flex-1 min-w-0 mb-3 md:mb-0">
          <h3 className="font-['Playfair_Display',serif] text-[16px] md:text-[18px] text-[#2a2724] leading-snug mb-1.5 truncate">
            {productTitle || (
              <span className="italic text-[#8c8680]">Product</span>
            )}
          </h3>

          {variantAttributes && Object.keys(variantAttributes).length > 0 ? (
            <div className="flex flex-wrap gap-x-3.5 gap-y-1 mb-1.5">
              {Object.entries(variantAttributes).map(([key, val]) => (
                <span
                  key={key}
                  className="text-[9.5px] uppercase tracking-[0.18em] text-[#736e68] font-semibold"
                >
                  {key} · {val}
                </span>
              ))}
            </div>
          ) : (
            <div className="mb-1.5">
              <span className="text-[9.5px] uppercase tracking-[0.18em] text-[#8c8680] font-medium">
                Standard
              </span>
            </div>
          )}

          {/* Subtle Stock Indicator */}
          {stockMsg && (
            <div className="flex items-center gap-1.5 mb-2.5 mt-0.5">
              <span className={`w-1 h-1 rounded-full opacity-80 ${stock === 0 ? 'bg-[#a34b4b]' : 'bg-[#c28e5a] animate-pulse'}`} />
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#a89278] font-medium">
                {stockMsg}
              </span>
            </div>
          )}

          {/* Price — mobile */}
          <p className="md:hidden font-['Playfair_Display',serif] text-[15px] text-[#7a5c38]">
            {formatCurrency(price?.amount, price?.currency)}
          </p>
        </div>

        {/* Qty · Price · Remove — vertically centered row */}
        <div className="flex items-center justify-between md:justify-end md:gap-10">
          <QuantityControl
            quantity={quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            loading={qtyLoading}
          />

          {/* Price — desktop */}
          <p className="hidden md:block font-['Playfair_Display',serif] text-[16px] text-[#7a5c38] w-24 text-right">
            {formatCurrency(price?.amount, price?.currency)}
          </p>

          {/* Remove */}
          <button
            onClick={handleRemove}
            disabled={removeLoading}
            aria-label="Remove item"
            id={`remove-item-${_id}`}
            className="md:ml-4 flex items-center"
          >
            {removeLoading ? (
              <span className="w-2 h-2 border border-[#8c6b4a]/50 border-t-[#8c6b4a] rounded-full animate-spin block" />
            ) : (
              <span className="text-[9.5px] uppercase tracking-[0.22em] text-[#736e68] font-medium border-b border-transparent hover:text-[#2a2724] hover:border-[#736e68] transition-all duration-500 pb-px cursor-pointer">
                Remove
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// ORDER SUMMARY — Spacious, padded, softly framed
// ─────────────────────────────────────────────────────────
const OrderSummary = ({ items, onCheckout, navigate }) => {
  const subtotal = items.reduce(
    (acc, item) => acc + (item.price?.amount || 0) * item.quantity,
    0,
  );
  const currency = items[0]?.price?.currency || "INR";

  return (
    <div className="w-full bg-[#faf7f3] border border-[#e8e2d8] px-7 py-7">
      {/* Header */}
      <div className="pb-5 border-b border-[#e8e2d8]">
        <p className="text-[9.5px] uppercase tracking-[0.32em] text-[#736e68] font-bold">
          Order Summary
        </p>
      </div>

      {/* Line items */}
      <div className="pt-5 pb-5 flex flex-col gap-4 border-b border-[#e8e2d8]">
        <div className="flex justify-between items-center">
          <span className="text-[10.5px] uppercase tracking-[0.14em] text-[#6e6560] font-medium">
            Subtotal
          </span>
          <span className="font-['Playfair_Display',serif] text-[15px] text-[#2a2724]">
            {formatCurrency(subtotal, currency)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10.5px] uppercase tracking-[0.14em] text-[#6e6560] font-medium">
            Estimated Delivery
          </span>
          <span className="text-[10.5px] text-[#6e6560] font-medium tracking-[0.06em]">
            Complimentary · 3–5 Days
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline pt-5 pb-6">
        <span className="text-[11px] uppercase tracking-[0.18em] text-[#2a2724] font-bold">
          Total
        </span>
        <div className="text-right">
          <span className="font-['Playfair_Display',serif] text-[26px] text-[#7a5c38]">
            {formatCurrency(subtotal, currency)}
          </span>
          <p className="text-[9.5px] uppercase tracking-[0.14em] text-[#8c8680] mt-1 font-medium">
            Inclusive of all taxes
          </p>
        </div>
      </div>

      {/* Checkout CTA */}
      <button
        id="proceed-to-checkout-btn"
        onClick={onCheckout}
        className="w-full py-4 bg-[#2a2724] text-white text-[10.5px] font-bold tracking-[0.26em] uppercase transition-all duration-500 hover:bg-[#8c6b4a] mb-4"
      >
        Proceed to Checkout
      </button>

      {/* Continue Shopping */}
      <div className="text-center mb-7">
        <button
          onClick={() => navigate("/")}
          className="text-[9.5px] uppercase tracking-[0.18em] text-[#736e68] font-medium hover:text-[#2a2724] transition-colors duration-300 border-b border-transparent hover:border-[#736e68] pb-px"
        >
          Continue Shopping
        </button>
      </div>

      {/* Policy strip */}
      <div className="border-t border-[#e8e2d8] pt-6 flex flex-col gap-4">
        {[
          {
            icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
            label: "Secure Payment",
            desc: "256-bit SSL encryption",
          },
          {
            icon: (
              <>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </>
            ),
            label: "Easy Returns",
            desc: "30-day hassle-free returns",
          },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8c6b4a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 flex-shrink-0"
            >
              {item.icon}
            </svg>
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#3d3a37] font-semibold">
                {item.label}
              </p>
              <p className="text-[10px] text-[#736e68] mt-0.5 font-medium">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// EMPTY CART STATE
// ─────────────────────────────────────────────────────────
const EmptyCartState = ({ navigate }) => (
  <div className="flex flex-col items-center justify-center min-h-[55vh] text-center px-6">
    <div className="w-12 h-px bg-[#d0c8b8] mb-10" />

    <p className="text-[9.5px] uppercase tracking-[0.32em] text-[#736e68] mb-5 font-semibold">
      Your Selection
    </p>

    <h2 className="font-['Playfair_Display',serif] text-[34px] md:text-[50px] text-[#2a2724] leading-tight mb-6">
      Your Bag
      <br />
      <span className="italic text-[#4a4742]">Is Empty</span>
    </h2>

    <p className="text-[13px] text-[#5a5450] max-w-xs leading-relaxed mb-10 font-medium">
      You haven't added anything to your bag yet. Explore the collection to
      discover curated pieces.
    </p>

    <button
      id="empty-cart-continue-btn"
      onClick={() => navigate("/")}
      className="text-[10.5px] uppercase tracking-[0.22em] text-[#2a2724] border border-[#2a2724] font-medium px-10 py-3.5 hover:bg-[#2a2724] hover:text-white transition-all duration-500"
    >
      Continue Shopping
    </button>

    <div className="w-12 h-px bg-[#d0c8b8] mt-10" />
  </div>
);

// ─────────────────────────────────────────────────────────
// LOADING SKELETON
// ─────────────────────────────────────────────────────────
const CartLoadingSkeleton = () => (
  <div className="flex flex-col gap-0">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex items-center gap-5 md:gap-7 py-5 border-b border-[#e8e2d8] animate-pulse"
      >
        <div className="flex-shrink-0 w-[88px] h-[108px] md:w-[100px] md:h-[122px] bg-[#ede7dd]" />
        <div className="flex-1 flex flex-col gap-3">
          <div className="h-4 bg-[#e8e2d8] rounded-sm w-2/3" />
          <div className="h-3 bg-[#e8e2d8] rounded-sm w-1/4" />
          <div className="h-3 bg-[#e8e2d8] rounded-sm w-1/3" />
        </div>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────
// MAIN CART PAGE
// ─────────────────────────────────────────────────────────
const Cart = () => {
  const { handleGetCart, handleIncrementItemQuantity, handleDecrementItemQuantity, handleRemoveItem } = useCart();
  const items = useSelector((state) => state.cart.items);
  console.log(items);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const load = async () => {
      setLoading(true);
      try {
        await handleGetCart();
      } catch {
        // Cart may be empty / user not authenticated
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCheckout = () => {
    setCheckoutLoading(true);
    setTimeout(() => setCheckoutLoading(false), 800);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="text-[#2a2724] antialiased min-h-screen flex flex-col bg-[#fcfaf8] font-['Inter',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>

      {/* ── Navbar ── */}
      <Navbar backButton={true} showSearch={false} cartCount={totalItems} />

      {/* ── Main Content ── */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-16 lg:px-20 pt-8 pb-16 md:pt-10 md:pb-20">
        {/* ── PAGE HEADER ── */}
        <div className="mb-7 md:mb-9">
          <p className="text-[9.5px] uppercase tracking-[0.30em] text-[#8c8680] mb-2 font-semibold">
            Collection · Your Bag
          </p>
          <h1 className="font-['Playfair_Display',serif] text-[30px] md:text-[44px] text-[#2a2724] leading-none mb-2">
            Your Bag
          </h1>
          {!loading && (
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#8c8680] font-medium">
              {items.length === 0
                ? "No items selected"
                : `${totalItems} Item${totalItems !== 1 ? "s" : ""}`}
            </p>
          )}
        </div>

        {/* ── Loading State ── */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-x-12 xl:gap-x-16 items-start">
            <CartLoadingSkeleton />
            <div className="hidden lg:block">
              <div className="bg-[#faf7f3] border border-[#e8e2d8] px-7 py-7 animate-pulse flex flex-col gap-4">
                <div className="h-3 bg-[#e8e2d8] w-1/3 rounded-sm" />
                <div className="h-3 bg-[#e8e2d8] w-full rounded-sm" />
                <div className="h-3 bg-[#e8e2d8] w-3/4 rounded-sm" />
                <div className="mt-4 h-12 bg-[#e0d7c6] rounded-sm" />
              </div>
            </div>
          </div>
        )}

        {/* ── Empty Cart ── */}
        {!loading && items.length === 0 && (
          <EmptyCartState navigate={navigate} />
        )}

        {/* ── Cart Items + Summary ── */}
        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-x-12 xl:gap-x-16 items-start">
            {/* ── LEFT: Cart Items — softly framed ── */}
            <div className="border-t border-[#e8e2d8]">
              {/* Column headers (desktop) */}
              <div className="hidden md:flex justify-between items-center">
                <div className="py-3 text-[9.5px] uppercase tracking-[0.28em] text-[#8c8680] font-semibold">
                  Product
                </div>
                <div className="flex items-center gap-10 lg:gap-[60px] py-3">
                  <span className="text-[9.5px] uppercase tracking-[0.28em] text-[#8c8680] font-semibold">
                    Qty
                  </span>
                  <span className="text-[9.5px] uppercase tracking-[0.28em] text-[#8c8680] font-semibold w-24 text-right">
                    Price
                  </span>
                  <span className="w-[58px]" />
                </div>
              </div>

              {/* Thin rule below headers */}
              <div className="w-full h-px bg-[#e8e2d8]" />

              {/* Items list */}
              <div>
                {items.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onRemove={handleRemoveItem}
                    onIncrementQuantity={handleIncrementItemQuantity}
                    onDecrementQuantity={handleDecrementItemQuantity}
                  />
                ))}
              </div>

              {/* Closing rule + sub-note */}
              <div className="mt-5 pt-4 border-t border-[#e8e2d8] flex items-center gap-2 text-[10.5px] text-[#8c8680] font-medium">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Prices and availability are subject to change
              </div>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="mt-8 lg:mt-0 lg:sticky lg:top-[96px]">
              <OrderSummary
                items={items}
                onCheckout={handleCheckout}
                navigate={navigate}
              />
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#fcfaf8] border-t border-[#e8e2d8] mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-5 md:px-16 lg:px-20 py-11 max-w-[1440px] mx-auto gap-8 md:gap-0">
          <div className="font-['Playfair_Display',serif] text-[20px] tracking-[0.22em] text-[#8c6b4a] uppercase">
            SNITCH
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {["Journal", "Privacy", "Terms", "Shipping"].map((link) => (
              <a
                key={link}
                className="text-[10.5px] uppercase tracking-[0.16em] text-[#736e68] font-medium hover:text-[#8c6b4a] transition-all duration-300"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="text-[10.5px] uppercase tracking-[0.16em] text-[#736e68] font-medium text-center md:text-right">
            © 2026 SNITCH. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
