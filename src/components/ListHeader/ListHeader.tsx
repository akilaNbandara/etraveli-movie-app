import {
  Stack,
  TextField,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  InputLabel,
  FormControl,
  type SelectChangeEvent,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './ListHeader.css';
import { useMovieState } from '../../state';
import type { SortOptions, SortOrder } from '../../state/MoviesStore';
import { useCallback, useMemo } from 'react';
interface SortOption {
  id: SortOptions;
  label: string;
}

function ListHeader() {
  const { filter, setFilter, sortBy, setSortBy, sortOrder, setSortOrder } =
    useMovieState();

  const handleSortBy = useCallback(
    (event: SelectChangeEvent<SortOptions>) => {
      const value = event.target.value;
      setSortBy(value);
    },
    [setSortBy]
  );

  const handleOrderChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newOrder: SortOrder) => {
      if (newOrder) setSortOrder(newOrder);
    },
    [setSortOrder]
  );

  const handlerSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFilter(value || '');
    },
    [setFilter]
  );

  const sortOptions: SortOption[] = useMemo(
    () => [
      {
        id: 'release_year',
        label: 'Year',
      },
      {
        id: 'episode_id',
        label: 'Episode',
      },
      {
        id: 'title',
        label: 'Title',
      },
    ],
    []
  );

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      flexWrap="wrap"
      gap={1}
      alignItems="center"
      className="list-header"
    >
      <TextField
        value={filter}
        size="small"
        id="search-box"
        label="Find your movie"
        onChange={handlerSearchChange}
      />
      <FormControl size="small">
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          className="sort-by-select"
          labelId="sort-label"
          id="sort-by-select"
          label="Sort By"
          size="small"
          value={sortBy}
          onChange={handleSortBy}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ToggleButtonGroup
        value={sortOrder}
        size="small"
        exclusive
        onChange={handleOrderChange}
      >
        <ToggleButton value="asc">
          <ArrowUpwardIcon />
        </ToggleButton>
        <ToggleButton value="desc">
          <ArrowDownwardIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}

export default ListHeader;
