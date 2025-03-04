import { Box } from '@mantine/core';
import { forwardRef, useRef } from 'react';
import { QImage } from '../QImage/QImage';
import { QTypography } from '../QTypography/QTypography';
import { useQuoteStore } from '../../../stores/quoteStore';

interface QCanvasProps {
  width?: number; // Optional width prop for fixed-width rendering (for download)
  height?: number; // Optional height prop
  canvasRef?: React.RefObject<HTMLDivElement>; // Optional ref to be attached
}

export const QCanvas = forwardRef<HTMLDivElement, QCanvasProps>(
  ({ width, height, canvasRef }, ref) => {
    const {
      currentImageIndex,
      currentWordsIndex,
      currentFontIndex,
      currentFontSize,
      isFontLoading,
      outgoingFontIndex,
      handleFontLoaded
    } = useQuoteStore();

    // Use provided ref or create our own
    const internalRef = useRef<HTMLDivElement>(null);
    const actualRef = canvasRef || internalRef;
    
    return (
      <Box 
        pos="relative" 
        mt={30} 
        ref={ref || actualRef}
        style={width ? { width: `${width}px`, height: `${height}px` } : undefined}
      >
        <QImage currentImageIndex={currentImageIndex}>
          <QTypography 
            currentWordsIndex={currentWordsIndex}
            currentFontIndex={currentFontIndex}
            currentFontSize={currentFontSize}
            outgoingFontIndex={isFontLoading ? outgoingFontIndex : undefined}
            onFontLoaded={handleFontLoaded}
          />
        </QImage>
      </Box>
    );
  }
);
