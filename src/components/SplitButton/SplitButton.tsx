import { IconChevronLeft, IconChevronRight, IconMinus, IconPlus } from '@tabler/icons-react';

interface SplitButtonProps {
  buttonText: string;
  prevAction: () => void;
  nextAction: () => void;
  iconStyle: 'arrows' | 'plusminus';
  loading?: boolean;
}

export function SplitButton({
  buttonText,
  prevAction,
  nextAction,
  iconStyle,
  loading = false,
}: SplitButtonProps) {
  const PrevIcon = iconStyle === 'arrows' ? IconChevronLeft : IconMinus;
  const NextIcon = iconStyle === 'arrows' ? IconChevronRight : IconPlus;

  return (
    <div className="inline-flex">
      <button
        type="button"
        onClick={prevAction}
        disabled={loading}
        className="border border-black/15 dark:border-white/15 rounded-l px-3 py-2 bg-white dark:bg-gray-800 disabled:opacity-50"
      >
        <PrevIcon size={20} />
      </button>
      <div className="flex items-center justify-center border-y border-black/15 dark:border-white/15 px-4 min-w-[120px] text-sm bg-white dark:bg-gray-800">
        {loading ? (
          <svg className="animate-spin h-4 w-4 text-gray-500" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          buttonText
        )}
      </div>
      <button
        type="button"
        onClick={nextAction}
        disabled={loading}
        className="border border-black/15 dark:border-white/15 rounded-r px-3 py-2 bg-white dark:bg-gray-800 disabled:opacity-50"
      >
        <NextIcon size={20} />
      </button>
    </div>
  );
}
