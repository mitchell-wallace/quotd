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
    <div className="flex flex-wrap justify-center gap-4 max-w-[580px] mx-auto">
      <SplitButton
        buttonText="Font"
        prevAction={prevFont}
        nextAction={nextFont}
        iconStyle="arrows"
        loading={isFontLoading}
      />
      <SplitButton
        buttonText="Font Size"
        prevAction={prevFontSize}
        nextAction={nextFontSize}
        iconStyle="plusminus"
      />
      <SplitButton
        buttonText="Words"
        prevAction={prevWordsIndex}
        nextAction={nextWordsIndex}
        iconStyle="arrows"
      />
      <SplitButton
        buttonText="Image"
        prevAction={prevImageIndex}
        nextAction={nextImageIndex}
        iconStyle="arrows"
        loading={isImageLoading}
      />
    </div>
  );
}
