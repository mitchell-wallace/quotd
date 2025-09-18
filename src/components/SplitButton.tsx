import { IconChevronLeft, IconChevronRight, IconMinus, IconPlus } from '@tabler/icons-solidjs';

interface SplitButtonProps {
  buttonText: string;
  prevAction: () => void;
  nextAction: () => void;
  iconStyle: 'arrows' | 'plusminus';
  loading?: boolean;
  idPrefix?: string;
}

export function SplitButton(props: SplitButtonProps) {
  const prevButtonTestId = () => (props.idPrefix ? `${props.idPrefix}-prev` : undefined);
  const nextButtonTestId = () => (props.idPrefix ? `${props.idPrefix}-next` : undefined);
  const isLoading = () => props.loading ?? false;

  return (
    <div class="inline-flex">
      <button
        type="button"
        onClick={props.prevAction}
        disabled={isLoading()}
        class="border border-border rounded-l px-3 py-2 bg-surface text-base-content hover:bg-surface-hover disabled:opacity-50"
        data-testid={prevButtonTestId()}
        aria-label={`${props.buttonText} previous`}
      >
        {props.iconStyle === 'arrows' ? <IconChevronLeft size={20} /> : <IconMinus size={20} />}
      </button>
      <div class="flex items-center justify-center border-y border-border px-4 min-w-[120px] text-sm bg-surface text-base-content">
        {isLoading() ? (
          <svg class="animate-spin h-4 w-4 text-muted" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
              fill="none"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          props.buttonText
        )}
      </div>
      <button
        type="button"
        onClick={props.nextAction}
        disabled={isLoading()}
        class="border border-border rounded-r px-3 py-2 bg-surface text-base-content hover:bg-surface-hover disabled:opacity-50"
        data-testid={nextButtonTestId()}
        aria-label={`${props.buttonText} next`}
      >
        {props.iconStyle === 'arrows' ? <IconChevronRight size={20} /> : <IconPlus size={20} />}
      </button>
    </div>
  );
}
