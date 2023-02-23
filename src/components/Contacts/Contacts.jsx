import { ContactsItem } from '../ContactsItem/ContactsItem';
import PropTypes from 'prop-types';
import css from './Contacts.module.css';

export const Contacts = ({ data, onDelete }) => {
  return (
    <ul className={css.list}>
      {data.map(item => {
        return (
          <ContactsItem
            key={item.id}
            id={item.id}
            name={item.name}
            number={item.number}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
};

Contacts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
