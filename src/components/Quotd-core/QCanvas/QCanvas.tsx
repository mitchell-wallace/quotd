import { AspectRatio, Box } from '@mantine/core';
import { forwardRef, useRef } from 'react';
import { QImage } from '../QImage/QImage';
import { QTypography } from '../QTypography/QTypography';
import { useQuoteStore } from '../../../stores/quoteStore';

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
        >
            <AspectRatio ratio={3/2} style={{ position: 'relative' }}>
                <QImage 
                    currentImageIndex={currentImageIndex}
                    variant={variant}
                >
                    <QTypography 
                        currentWordsIndex={currentWordsIndex}
                        currentFontIndex={currentFontIndex}
                        currentFontSize={currentFontSize}
                        outgoingFontIndex={isFontLoading ? outgoingFontIndex : undefined}
                        onFontLoaded={handleFontLoaded}
                    />
                </QImage>
            </AspectRatio>
        </Box>
    );
  }
);
