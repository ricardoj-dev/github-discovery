import { cn } from '@/lib/utils';

type CarouselButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  isVisible: boolean;
  margin?: string;
};

const CarouselButton = ({
  direction,
  onClick,
  isVisible,
  margin = '',
}: CarouselButtonProps) => {
  const buttonLabel = direction === 'left' ? '<' : '>';

  return (
    <button
      onClick={onClick}
      className={cn(
        'p-2 rounded-full shadow-md transition',
        isVisible
          ? 'bg-gray-200 hover:bg-gray-300'
          : 'opacity-0 cursor-default',
        margin
      )}
      disabled={!isVisible}
    >
      {buttonLabel}
    </button>
  );
};

export default CarouselButton;
