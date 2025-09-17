import { useQuoteStore } from '../../stores/quoteStore';
import { QImage } from './QImage';
import { QTypography } from './QTypography';

interface QCanvasProps {
  variant?: 'display' | 'download';
}

export function QCanvas({ variant = 'display' }: QCanvasProps) {
  const qs = useQuoteStore();
  const isDisplayVariant = variant === 'display';

  return (
    <div
      class={`relative ${variant === 'download' ? '' : 'mt-[30px]'}`}
      data-testid={isDisplayVariant ? 'quote-canvas-wrapper' : undefined}
    >
      <div
        class="relative mx-auto w-full"
        style={{
          'max-width': variant === 'display' ? '580px' : '1080px',
          'aspect-ratio': '3 / 2',
        }}
        data-testid={isDisplayVariant ? 'quote-canvas' : undefined}
      >
        <QImage
          currentImageIndex={qs.currentImageIndex}
          variant={variant}
          outgoingImageIndex={qs.isImageLoading ? qs.outgoingImageIndex : undefined}
          onImageLoaded={qs.handleImageLoaded}
        >
          <QTypography
            variant={variant}
            currentWordsIndex={qs.currentWordsIndex}
            currentFontIndex={qs.currentFontIndex}
            currentFontSize={qs.currentFontSize}
            outgoingFontIndex={qs.isFontLoading ? qs.outgoingFontIndex : undefined}
            onFontLoaded={qs.handleFontLoaded}
          />
        </QImage>
      </div>
    </div>
  );
}
