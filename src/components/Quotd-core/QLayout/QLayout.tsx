import { RefObject, useCallback, useRef } from 'react';
import { IconDownload } from '@tabler/icons-react';
import { DownloadFrame } from '../Download/DownloadFrame';
import { handleDownload } from '../Download/handleDownload';
import { QCanvas } from '../QCanvas/QCanvas';
import { QControls } from '../QControls/QControls';

export function QLayout() {
  const downloadFrameRef = useRef<HTMLDivElement | null>(null);

  const downloadQuote = useCallback(() => {
    if (downloadFrameRef.current) {
      handleDownload(downloadFrameRef as RefObject<HTMLDivElement>)();
    }
  }, []);

  return (
    <div className="text-center">
      <QControls />
      <QCanvas />
      <button
        className="mt-5 inline-flex items-center justify-center min-w-[160px] px-4 py-2 bg-primary-500 text-white rounded"
        onClick={downloadQuote}
        type="button"
      >
        <IconDownload size={20} className="mr-2" />
        Download
      </button>
      <DownloadFrame ref={downloadFrameRef} />
    </div>
  );
}
