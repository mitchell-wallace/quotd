import { forwardRef, useRef } from 'react';
import { useQuoteStore } from '../../stores/quoteStore';
import { QImage } from './QImage';
import { QTypography } from './QTypography';

interface QCanvasProps {
  variant?: 'display' | 'download';
  canvasRef?: React.RefObject<HTMLDivElement>; // Optional ref to be attached
}

export const QCanvas = forwardRef<HTMLDivElement, QCanvasProps>(
  ({ variant = 'display', canvasRef }, ref) => {
    const {
      currentImageIndex,
      currentWordsIndex,
      currentFontIndex,
      currentFontSize,
      isFontLoading,
      outgoingFontIndex,
      isImageLoading,
      outgoingImageIndex,
      handleFontLoaded,
      handleImageLoaded,
    } = useQuoteStore();

    // Use provided ref or create our own
    const internalRef = useRef<HTMLDivElement>(null);
    const actualRef = canvasRef || internalRef;

    return (
      <div
        className={`relative ${variant === 'download' ? '' : 'mt-[30px]'}`}
        ref={ref || actualRef}
      >
        <div
          className="relative mx-auto w-full"
          style={{
            maxWidth: variant === 'display' ? 580 : 1080,
            aspectRatio: '3 / 2',
          }}
        >
          <QImage
            currentImageIndex={currentImageIndex}
            variant={variant}
            outgoingImageIndex={isImageLoading ? outgoingImageIndex : undefined}
            onImageLoaded={handleImageLoaded}
          >
            <QTypography
              variant={variant}
              currentWordsIndex={currentWordsIndex}
              currentFontIndex={currentFontIndex}
              currentFontSize={currentFontSize}
              outgoingFontIndex={isFontLoading ? outgoingFontIndex : undefined}
              onFontLoaded={handleFontLoaded}
            />
          </QImage>
        </div>
      </div>
    );
  }
);
