import { SortOption } from '@/types';

type SortRadioButtonProps = {
  isChecked: boolean;
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  sortLabel: string;
  sortOption: SortOption;
};

const SortRadioButton = ({
  isChecked,
  onClick,
  sortLabel,
  sortOption,
}: SortRadioButtonProps) => {
  const inputId = `sort-${sortLabel.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <fieldset className="flex gap-1">
      <input
        id={inputId}
        className="peer/published"
        type="radio"
        name="sort"
        value={sortOption}
        defaultChecked={isChecked}
        onClick={onClick}
      />
      <label htmlFor={inputId} className="peer-checked/published:text-gray-800">
        {sortLabel}
      </label>
    </fieldset>
  );
};

export default SortRadioButton;
