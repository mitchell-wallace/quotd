import { forwardRef } from 'react';
import { QCanvas } from '../QCanvas/QCanvas';

interface DownloadFrameProps {
  width?: number;
  height?: number;
}

export const DownloadFrame = forwardRef<HTMLDivElement, DownloadFrameProps>(
  ({ width, height }, ref) => (
    <div
      ref={ref}
      className="fixed -top-[10000px] -left-[10000px] overflow-hidden m-0 p-0"
      style={{ width: width ? `${width}px` : '1080px', height: height ? `${height}px` : '720px' }}
    >
      <QCanvas variant="download" />
    </div>
  )
);

DownloadFrame.displayName = 'DownloadFrame';
