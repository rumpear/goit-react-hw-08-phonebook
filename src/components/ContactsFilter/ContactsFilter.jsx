import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../redux/contacts/contactsAsyncSlice';
import { getFilterValue } from '../../redux/contacts/contactsSelectors';
import { Title } from './ContactsFilter.styled';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

export const ContactsFilter = () => {
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const handleSearchContact = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };

  return (
    <div>
      <Title>Find contacts by name</Title>
      <TextField
        sx={{ width: '100%' }}
        type="text"
        name="filter"
        placeholder="Search..."
        value={filterValue}
        onChange={handleSearchContact}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
