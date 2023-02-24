import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Contacts } from 'components/Contacts/Contacts';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';

export const Phonebook = () => {
  // const testContacts = [
  //   { id: 'RBQlqNROoK', name: 'Bruce Wayne', number: '+380501112233' },
  //   { id: '5heOS5ugIX', name: 'Clark Kent', number: '+380507511515' },
  //   { id: 'sku_zwg5AC', name: 'Lex Luthor', number: '+380961512535' },
  // ];
  const savedContacts = JSON.parse(localStorage.getItem(`contacts`)) || [];

  const [contacts, setContacts] = useState(savedContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const addContact = (newName, newNumber) => {
    if (preventDublicate(newNumber)) {
      return window.alert(`Number is already saved`);
    }
    setContacts(prevState => {
      return [
        ...prevState,
        { id: nanoid(10), name: newName, number: newNumber },
      ];
    });
  };

  const preventDublicate = newNumber => {
    const dublicate = contacts.find(item => item.number === newNumber);
    return Boolean(dublicate);
  };

  const deleteContact = id => {
    setContacts(prevState => {
      const newContacts = prevState.filter(item => item.id !== id);
      return newContacts;
    });
  };

  const getFilteredContacts = () => {
    if (filter.length < 1) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter onChange={handleInputChange} value={filter} />
      <Contacts data={getFilteredContacts()} onDelete={deleteContact} />
    </>
  );
};
