import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { VscClose } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { removeContact } from '../../../redux/contacts/contactsOperations';
import { getErrorValue } from '../../../redux/contacts/contactsSelectors';
import { Loader } from '../../ui/Loader';
import { Button, Item, Name, Phone } from './ContactsItem.styled';

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
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
