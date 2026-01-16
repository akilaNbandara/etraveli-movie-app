import { Stack, TextField, Select, MenuItem, ToggleButtonGroup, ToggleButton, InputLabel, FormControl, type SelectChangeEvent } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useSearchParams } from 'react-router-dom';
import './ListHeader.css';

function ListHeader() {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortByValue = searchParams.get('sort_by') || '';
	const order = sortByValue && (searchParams.get('sort_order') || 'asc');
	const searchStr = searchParams.get('search_str');

	const handleSortBy = (event: SelectChangeEvent<string>) => {
		const value = event.target.value;
		searchParams.set('sort_by', value);
		setSearchParams(searchParams);
	}

	const handleOrderChange = (_: React.MouseEvent<HTMLElement>, newOrder: string) => {
		if (newOrder) {
			searchParams.set('sort_order', newOrder);
			setSearchParams(searchParams);
		} else {
			searchParams.delete('sort_order');
			setSearchParams(searchParams);
		}
	};

	const handlerSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (value) {
			searchParams.set('search_str', value);
			setSearchParams(searchParams);
		} else {
			searchParams.delete('search_str');
			setSearchParams(searchParams);
		}
	}

	return (
			<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
					<TextField value={searchStr} size="small" id="search-box" label="Find your movie" variant="outlined" onChange={handlerSearchChange} />
					<FormControl size="small">
						<InputLabel id="sort-label">Sort By</InputLabel>
						<Select
							className="sort-by-select"
							labelId="sort-label"
							id="sort-by-select"
							label="Sort By"
							size="small"
							value={sortByValue}
							onChange={handleSortBy}
						>
							<MenuItem value="episode_id">Episode</MenuItem>
							<MenuItem value="year">Year</MenuItem>
						</Select>
					</FormControl>
					<ToggleButtonGroup value={order} size="small" exclusive onChange={handleOrderChange}>
						<ToggleButton value="asc"><ArrowUpwardIcon /></ToggleButton>
						<ToggleButton value="desc"><ArrowDownwardIcon /></ToggleButton>
					</ToggleButtonGroup>
			</Stack>
	);
}	

export default ListHeader;