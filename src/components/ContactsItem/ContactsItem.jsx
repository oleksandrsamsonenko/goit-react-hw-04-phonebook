import PropTypes from 'prop-types';
import css from './ContactsItem.module.css';

export const ContactsItem = ({ id, name, number, onDelete }) => {
  return (
    <li className={css.item}>
      <span>{name}</span>
      <span>{number}</span>
      <button className={css.btn} onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
