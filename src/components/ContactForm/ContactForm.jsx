import { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ addContact }) => {
  const initialState = { name: '', number: '' };
  const [state, setState] = useState({ ...initialState });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    addContact(state.name, state.number);
    reset();
  };

  const reset = () => {
    setState({ name: '', number: '' });
  };
  return (
    <form className={css.form} action="submit" onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          onChange={handleInputChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={state.name}
          placeholder="Enter contact name"
        />
      </label>
      <label className={css.label}>
        Number
        <input
          onChange={handleInputChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={state.number}
          placeholder="Enter contact number"
        />
      </label>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
