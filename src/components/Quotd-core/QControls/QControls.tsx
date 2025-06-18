import { Group } from '@mantine/core';
import { SplitButton } from '../../SplitButton/SplitButton';
import { useQuoteStore } from '../../../stores/quoteStore';

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
    isImageLoading
  } = useQuoteStore();

  return (
    <Group justify="center" maw={580} mx="auto">
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
    </Group>
  );
}
