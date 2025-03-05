import { Box } from '@mantine/core';
import { forwardRef } from 'react';
import { QCanvas } from '../QCanvas/QCanvas';

interface DownloadFrameProps {
  width?: number;
  height?: number;
}

/**
 * A hidden component for downloading quotes at a fixed resolution of 1080x720px
 * This component is positioned off-screen and is only used for generating downloads
 */
export const DownloadFrame = forwardRef<HTMLDivElement, DownloadFrameProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        pos="fixed"
        top={-10000}
        left={-10000}
        style={{ 
          overflow: 'hidden',
          margin: 0,
          padding: 0,
          width: props.width ? `${props.width}px` : '1080px',
          height: props.height ? `${props.height}px` : '720px'
        }}
      >
        {/* Fixed size QCanvas specifically for downloading */}
        <QCanvas 
          variant="download"
        />
      </Box>
    );
  }
);

DownloadFrame.displayName = 'DownloadFrame';
