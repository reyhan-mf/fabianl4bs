import { useCallback, useState } from 'react';

/**
 * Shows a screenshot whole — never cropped, never stretched.
 *
 * Real assets here range from 1920×1080 banners to 309×560 phone mockups and 1560×3143 chart
 * grids, so the box adapts to the file instead of the file being forced into the box. The only
 * thing the measured shape decides is how much height the image may take: a wide banner reads
 * fine at 300px, a phone mockup needs more before it turns into a stamp.
 *
 * Two traps this exists to avoid:
 *  - the system's `.fl-detail__hero > *` sets no `object-fit`, so an `<img>` there defaults to
 *    `fill` and stretches;
 *  - a cached image is already `complete` when React attaches `onLoad`, so that event never
 *    fires — hence measuring from a ref as well.
 */
export default function AdaptiveImage({
  src,
  alt = '',
  size = 'page',
  className = '',
  wideRatio = 1.6,
  onZoom,
}) {
  const [shape, setShape] = useState(null);

  const measure = useCallback(
    (img) => {
      if (!img?.naturalWidth || !img.naturalHeight) return;
      setShape(img.naturalWidth / img.naturalHeight >= wideRatio ? 'wide' : 'tall');
    },
    [wideRatio]
  );

  const ref = useCallback(
    (img) => {
      if (img?.complete) measure(img);
    },
    [measure]
  );

  const picture = (
    <img key={src} ref={ref} src={src} alt={alt} onLoad={(e) => measure(e.currentTarget)} />
  );

  const cls = `fl-shot fl-shot--${size} ${shape ? `is-${shape}` : 'is-measuring'} ${className}`.trim();

  if (!onZoom) return <div className={cls}>{picture}</div>;

  return (
    <button type="button" className={`${cls} fl-shot--zoom`} onClick={onZoom} aria-label="View full size">
      {picture}
    </button>
  );
}
