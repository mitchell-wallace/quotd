import { Button, Container } from '@mantine/core';
import { useRef, useCallback, RefObject } from 'react';
import { IconDownload } from '@tabler/icons-react';
import { QControls } from '../QControls/QControls';
import { QCanvas } from '../QCanvas/QCanvas';
import { handleDownload } from '../Download/handleDownload';
import { DownloadFrame } from '../Download/DownloadFrame';

export function QLayout() {
  const downloadFrameRef = useRef<HTMLDivElement | null>(null);
  
  const downloadQuote = useCallback(
    () => {
      if (downloadFrameRef.current) {
        handleDownload(downloadFrameRef as RefObject<HTMLDivElement>);
      }
    },
    [downloadFrameRef]
  );

  return (
    <Container ta="center">
      <QControls />
      <QCanvas />
      <Button 
        leftSection={<IconDownload size={18} />}
        onClick={downloadQuote}
        mt={20}
        variant="filled"
        miw={160}
      >
        Download
      </Button>
      
      {/* Hidden download frame with fixed dimensions */}
      <DownloadFrame ref={downloadFrameRef} />
    </Container>
  );
}
