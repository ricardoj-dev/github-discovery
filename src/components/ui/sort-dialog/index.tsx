import { SortOption, SortOptionsListMap, SortOptionsMap, Topic } from '@/types';
import SortRadioButton from './SortRadioButton';

type SortDialogProps = {
  onOptionSelected: (sortOption: SortOption) => void;
  topic: Topic;
  sortOptions: SortOptionsMap;
};

const SortDialog = ({
  onOptionSelected,
  topic,
  sortOptions,
}: SortDialogProps) => {
  const selectedSortOption = sortOptions[topic];

  const sortOptionsList: SortOptionsListMap = {
    stars: 'Sort by stars',
    forks: 'Sort by forks',
    interactions: 'Sort by help wanted issues',
    updated: 'Sort by updated',
  };

  return (
    <div className="absolute top-full mt-1 left-0 z-20 w-64 h-32 p-2 bg-white rounded-lg shadow-md flex flex-col gap-1">
      {Object.entries(sortOptionsList).map(([key, value]) => (
        <SortRadioButton
          key={key}
          isChecked={selectedSortOption === key}
          onClick={() => onOptionSelected(key as SortOption)}
          sortOption={key as SortOption}
          sortLabel={value}
        />
      ))}
    </div>
  );
};

export default SortDialog;
