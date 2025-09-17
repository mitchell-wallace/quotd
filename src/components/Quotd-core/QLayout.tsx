import { IconDownload } from '@tabler/icons-solidjs';
import { DownloadFrame } from './DownloadFrame';
import { handleDownload } from './handleDownload';
import { QCanvas } from './QCanvas';
import { QControls } from './QControls';

export function QLayout() {
  let downloadFrameEl: HTMLDivElement | undefined;

  const downloadQuote = () => {
    if (downloadFrameEl) {
      handleDownload(downloadFrameEl)();
    }
  };

  return (
    <div class="text-center" data-testid="quote-layout">
      <QControls />
      <QCanvas />
      <button
        class="mt-5 inline-flex items-center justify-center min-w-[160px] px-4 py-2 bg-primary text-primary-content hover:brightness-110 rounded"
        onClick={downloadQuote}
        type="button"
        data-testid="download-quote-button"
      >
        <IconDownload size={20} class="mr-2" />
        Download
      </button>
      <DownloadFrame ref={(el) => (downloadFrameEl = el)} />
    </div>
  );
}
