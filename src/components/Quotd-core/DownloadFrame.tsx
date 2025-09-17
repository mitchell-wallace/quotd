import { QCanvas } from './QCanvas';

interface DownloadFrameProps {
  width?: number;
  height?: number;
  ref?: (el: HTMLDivElement) => void;
}

export function DownloadFrame(props: DownloadFrameProps) {
  return (
    <div
      ref={(el) => props.ref?.(el)}
      class="fixed -top-[10000px] -left-[10000px] overflow-hidden m-0 p-0"
      style={{ width: props.width ? `${props.width}px` : '1080px', height: props.height ? `${props.height}px` : '720px' }}
    >
      <QCanvas variant="download" />
    </div>
  );
}
