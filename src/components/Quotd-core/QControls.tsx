import { useQuoteStore } from '../../stores/quoteStore';
import { SplitButton } from '../SplitButton';

export function QControls() {
  const {
    nextFont,
    prevFont,
    isFontLoading,
    nextFontSize,
    prevFontSize,
    nextWordsIndex,
    prevWordsIndex,
    nextImageIndex,
    prevImageIndex,
    isImageLoading,
  } = useQuoteStore();

  return (
    <div
      className="flex flex-wrap justify-center gap-4 max-w-[580px] mx-auto"
      data-testid="quote-controls"
    >
      <SplitButton
        buttonText="Font"
        prevAction={prevFont}
        nextAction={nextFont}
        iconStyle="arrows"
        loading={isFontLoading}
        idPrefix="font-control"
      />
      <SplitButton
        buttonText="Font Size"
        prevAction={prevFontSize}
        nextAction={nextFontSize}
        iconStyle="plusminus"
        idPrefix="font-size-control"
      />
      <SplitButton
        buttonText="Words"
        prevAction={prevWordsIndex}
        nextAction={nextWordsIndex}
        iconStyle="arrows"
        idPrefix="words-control"
      />
      <SplitButton
        buttonText="Image"
        prevAction={prevImageIndex}
        nextAction={nextImageIndex}
        iconStyle="arrows"
        loading={isImageLoading}
        idPrefix="image-control"
      />
    </div>
  );
}
