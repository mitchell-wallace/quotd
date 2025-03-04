import { Button, Container } from '@mantine/core';
import { useRef, useCallback } from 'react';
import { IconDownload } from '@tabler/icons-react';
import { QControls } from '../QControls/QControls';
import { QCanvas } from '../QCanvas/QCanvas';
import { handleDownload } from '../Download/handleDownload';
import { useQuoteStore } from '../../../stores/quoteStore';

export function QLayout() {
  const { currentImageIndex } = useQuoteStore();
  const quoteImageRef = useRef<HTMLDivElement | null>(null);
  
  const downloadQuote = useCallback(
    handleDownload(quoteImageRef),
    [quoteImageRef]
  );

  return (
    <Container ta="center">
      <QControls />
      <QCanvas canvasRef={quoteImageRef} />
      <Button 
        leftSection={<IconDownload size={18} />}
        onClick={downloadQuote}
        mt={20}
        variant="filled"
        miw={160}
      >
        Download
      </Button>
    </Container>
  );
}
