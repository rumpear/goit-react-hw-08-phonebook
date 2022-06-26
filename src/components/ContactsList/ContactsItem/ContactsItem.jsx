import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { VscClose } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { removeContact } from '../../../redux/contacts/contactsOperations';
import { getErrorValue } from '../../../redux/contacts/contactsSelectors';
import { Loader } from '../../ui/Loader';
import { Button, Item, Name, Phone } from './ContactsItem.styled';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
// import { useEffect } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ContactsItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const error = useSelector(getErrorValue);
  const [loading, setLoading] = useState(false);

  const handleDeleteContact = async currentId => {
    if (id === currentId) setLoading(true);
    try {
      await dispatch(removeContact(currentId)).unwrap();
    } catch (error) {
      toast.error(error);
    }
  };

  console.log('34532452345324523453423'.length, 'length');

  return (
    <Item>
      <div>
        <Name>{name}</Name>
        <Phone href={`tel:${number}`} type="tel">
          {number}
        </Phone>
      </div>
      <Button
        type="button"
        disabled={loading || error}
        onClick={() => handleDeleteContact(id)}
      >
        {loading ? <Loader size={15} /> : <VscClose size={20} />}
      </Button>
    </Item>
  );

  return (
    <Card
      sx={{
        maxWidth: 345,
        mb: 1.5,
        '&:last-child': {
          mb: 0,
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          '&:last-child': { p: '16px' },
        }}
      >
        <div>
          <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
            {name}
          </Typography>
          <Typography sx={{ mb: 0 }} color="text.secondary">
            {number}
          </Typography>
        </div>
        <CardActions disableSpacing sx={{ p: 0 }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
