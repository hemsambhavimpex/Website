import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.2;
const DEFAULT_ZOOM = 2.1;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const clampPan = (pan, zoom) => {
  const limit = 260 * (zoom - 1);
  return {
    x: clamp(pan.x, -limit, limit),
    y: clamp(pan.y, -limit, limit),
  };
};

export const ProductImageViewer = ({ product, images, coverIndex = 0, categoryCode }) => {
  const [selectedImage, setSelectedImage] = useState(coverIndex);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const closeButtonRef = useRef(null);
  const dragState = useRef(null);
  const selectedIndex = Math.min(selectedImage, images.length - 1);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    setSelectedImage(Math.min(coverIndex, images.length - 1));
  }, [product.slug, coverIndex, images.length]);

  useEffect(() => {
    setZoom(MIN_ZOOM);
    setPan({ x: 0, y: 0 });
  }, [selectedIndex, zoomOpen]);

  useEffect(() => {
    if (!zoomOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setZoomOpen(false);
      if (event.key === 'ArrowLeft' && hasMultipleImages) {
        setSelectedImage((current) => (current - 1 + images.length) % images.length);
      }
      if (event.key === 'ArrowRight' && hasMultipleImages) {
        setSelectedImage((current) => (current + 1) % images.length);
      }
      if (event.key === '+' || event.key === '=') applyZoom(zoom + 0.4);
      if (event.key === '-' || event.key === '_') applyZoom(zoom - 0.4);
      if (event.key === '0') resetZoom();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [zoomOpen, hasMultipleImages, images.length, zoom]);

  const applyZoom = (nextZoom) => {
    const next = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
    setZoom(next);
    setPan((current) => (next === MIN_ZOOM ? { x: 0, y: 0 } : clampPan(current, next)));
  };

  const resetZoom = () => {
    setZoom(MIN_ZOOM);
    setPan({ x: 0, y: 0 });
  };

  const showPrevious = () => {
    setSelectedImage((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setSelectedImage((current) => (current + 1) % images.length);
  };

  const openZoom = () => {
    setZoom(MIN_ZOOM);
    setPan({ x: 0, y: 0 });
    setZoomOpen(true);
  };

  const onPointerDown = (event) => {
    if (zoom === MIN_ZOOM) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const onPointerMove = (event) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setPan(
      clampPan(
        {
          x: drag.panX + event.clientX - drag.startX,
          y: drag.panY + event.clientY - drag.startY,
        },
        zoom,
      ),
    );
  };

  const endDrag = (event) => {
    if (dragState.current?.pointerId === event.pointerId) {
      dragState.current = null;
    }
  };

  const onWheel = (event) => {
    event.preventDefault();
    applyZoom(zoom + (event.deltaY < 0 ? 0.25 : -0.25));
  };

  const zoomModal = zoomOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-navy-ink/95 text-paper backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image zoom viewer`}
          data-testid="product-zoom-modal"
          onClick={(event) => {
            if (event.target === event.currentTarget) setZoomOpen(false);
          }}
        >
          <div className="flex items-center justify-between border-b border-paper/15 px-5 py-4 md:px-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C9A24B]">{product.name}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55" data-testid="product-zoom-counter">
                Image {String(selectedIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label="Close image zoom viewer"
              data-testid="product-zoom-close-button"
              className="flex h-11 w-11 items-center justify-center border border-paper/25 text-paper transition-colors duration-300 hover:border-[#C9A24B] hover:bg-[#C9A24B] hover:text-navy-ink"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-5 py-6 md:px-16">
            {hasMultipleImages && (
              <button
                type="button"
                onClick={showPrevious}
                aria-label="View previous product image"
                data-testid="product-zoom-prev-button"
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-paper/25 bg-navy-ink/70 transition-colors duration-300 hover:border-[#C9A24B] hover:bg-[#C9A24B] hover:text-navy-ink md:left-8"
              >
                <ChevronLeft size={19} />
              </button>
            )}

            <div
              className={`flex h-full w-full touch-none select-none items-center justify-center ${
                zoom > MIN_ZOOM ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
              }`}
              data-testid="product-zoom-stage"
              onDoubleClick={() => (zoom === MIN_ZOOM ? applyZoom(DEFAULT_ZOOM) : resetZoom())}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onWheel={onWheel}
            >
              <img
                src={images[selectedIndex]}
                alt={`${product.name} — zoom view ${selectedIndex + 1}`}
                draggable="false"
                data-testid="product-zoomed-image"
                className="max-h-full max-w-full object-contain transition-transform duration-200 ease-out"
                style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
              />
            </div>

            {hasMultipleImages && (
              <button
                type="button"
                onClick={showNext}
                aria-label="View next product image"
                data-testid="product-zoom-next-button"
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-paper/25 bg-navy-ink/70 transition-colors duration-300 hover:border-[#C9A24B] hover:bg-[#C9A24B] hover:text-navy-ink md:right-8"
              >
                <ChevronRight size={19} />
              </button>
            )}
          </div>

          <div className="border-t border-paper/15 px-5 py-4 md:px-8">
            <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => applyZoom(zoom - 0.4)}
                  disabled={zoom === MIN_ZOOM}
                  aria-label="Zoom out"
                  data-testid="product-zoom-out-button"
                  className="flex h-10 w-10 items-center justify-center border border-paper/25 transition-colors duration-300 enabled:hover:border-[#C9A24B] enabled:hover:bg-[#C9A24B] enabled:hover:text-navy-ink disabled:opacity-35"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="w-16 text-center font-mono text-xs tracking-[0.16em]" data-testid="product-zoom-level">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => applyZoom(zoom + 0.4)}
                  disabled={zoom === MAX_ZOOM}
                  aria-label="Zoom in"
                  data-testid="product-zoom-in-button"
                  className="flex h-10 w-10 items-center justify-center border border-paper/25 transition-colors duration-300 enabled:hover:border-[#C9A24B] enabled:hover:bg-[#C9A24B] enabled:hover:text-navy-ink disabled:opacity-35"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  disabled={zoom === MIN_ZOOM}
                  aria-label="Reset image zoom"
                  data-testid="product-zoom-reset-button"
                  className="flex h-10 w-10 items-center justify-center border border-paper/25 transition-colors duration-300 enabled:hover:border-[#C9A24B] enabled:hover:bg-[#C9A24B] enabled:hover:text-navy-ink disabled:opacity-35"
                >
                  <RotateCcw size={15} />
                </button>
              </div>

              {hasMultipleImages && (
                <div className="flex justify-center gap-2 overflow-x-auto pb-1" data-testid="product-zoom-thumbnails">
                  {images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View ${product.name} zoom image ${index + 1}`}
                      aria-pressed={selectedIndex === index}
                      data-testid={`product-zoom-thumbnail-${product.slug}-${index + 1}`}
                      className={`h-14 w-16 shrink-0 overflow-hidden border transition-opacity duration-300 ${
                        selectedIndex === index ? 'border-[#C9A24B]' : 'border-paper/20 opacity-55 hover:opacity-100'
                      }`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" draggable="false" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <div data-testid="product-image-viewer">
      <button
        type="button"
        onClick={openZoom}
        aria-label={`Open ${product.name} image zoom viewer`}
        data-testid="product-main-zoom-button"
        className="group img-frame block aspect-[4/3] w-full cursor-zoom-in border border-navy/20 p-0 text-left"
      >
        <img src={images[selectedIndex]} alt={`${product.name} — view ${selectedIndex + 1}`} data-testid="product-main-image" />
        <div className="absolute inset-0 bg-navy/15 mix-blend-multiply" />
        <span
          className="absolute bottom-4 right-4 flex items-center gap-2 bg-navy-ink/82 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          data-testid="product-zoom-hint"
        >
          <ZoomIn size={13} />
          Tap to zoom
        </span>
      </button>
      <p className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-navy/60">
        <span data-testid="product-image-caption">Fig. {String(selectedIndex + 1).padStart(2, '0')} — {product.name}</span>
        <span data-testid="product-image-count">Lot / HS-{categoryCode} · {String(selectedIndex + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}</span>
      </p>
      {hasMultipleImages && (
        <div
          className={images.length > 4 ? 'mt-4 flex gap-3 overflow-x-auto pb-1' : 'mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4'}
          data-testid="product-image-thumbnails"
        >
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`View ${product.name} image ${index + 1}`}
              aria-pressed={selectedIndex === index}
              data-testid={`product-thumbnail-${product.slug}-${index + 1}`}
              className={`img-frame aspect-[4/3] border p-0 text-left transition-opacity duration-300 ${
                images.length > 4 ? 'w-24 shrink-0 sm:w-28 ' : ''
              }${
                selectedIndex === index ? 'border-rust' : 'border-navy/20 opacity-65 hover:opacity-100'
              }`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      {zoomModal}
    </div>
  );
};
