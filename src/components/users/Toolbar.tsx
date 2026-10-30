import type { ViewMode } from '../../types/user';
import { IconGrid, IconTable } from '../ui/Icons';
import { SearchField } from '../ui/SearchField';
import { SegmentedControl } from '../ui/SegmentedControl';

interface ToolbarProps {
  readonly query: string;
  readonly onQueryChange: (value: string) => void;
  readonly view: ViewMode;
  readonly onViewChange: (value: ViewMode) => void;
  readonly resultCount: number;
  readonly totalCount: number;
}

const VIEW_OPTIONS = [
  { value: 'table' as const, label: 'Table', icon: <IconTable size={15} /> },
  { value: 'grid' as const, label: 'Grid', icon: <IconGrid size={15} /> },
];

export function Toolbar({
  query,
  onQueryChange,
  view,
  onViewChange,
  resultCount,
  totalCount,
}: ToolbarProps) {
  return (
    <div className="border border-hairline bg-surface/70 p-4 shadow-flat backdrop-blur-xl sm:p-5">
      <SearchField
        value={query}
        onChange={onQueryChange}
        resultCount={resultCount}
        totalCount={totalCount}
        trailingContent={
          <SegmentedControl
            label="Mode tampilan"
            value={view}
            options={VIEW_OPTIONS}
            onChange={onViewChange}
          />
        }
      />
    </div>
  );
}
