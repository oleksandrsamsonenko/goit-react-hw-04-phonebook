import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Contacts } from 'components/Contacts/Contacts';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';

export class Phonebook extends Component {
  state = {
    contacts: [
      // { id: 'RBQlqNROoK', name: 'Bruce Wayne', number: '+380501112233' },
      // { id: '5heOS5ugIX', name: 'Clark Kent', number: '+380507511515' },
      // { id: 'sku_zwg5AC', name: 'Lex Luthor', number: '+380961512535' },
    ],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.getItem(`contacts`)?.length > 0) {
      this.setState({ contacts: JSON.parse(localStorage.getItem(`contacts`)) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  addContact = (newName, newNumber) => {
    if (this.preventDublicate(newNumber)) {
      return window.alert(`Number is already saved`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = { id: nanoid(10), name: newName, number: newNumber };
      return { contacts: [...contacts, newContact] };
    });
  };
  preventDublicate(newNumber) {
    const dublicate = this.state.contacts.find(
      item => item.number === newNumber
    );
    return Boolean(dublicate);
  }

  deleteContact = id => {
    this.setState(prevState => {
      const newList = prevState.contacts.filter(item => item.id !== id);
      return { contacts: newList };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (filter.length < 1) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter onChange={this.handleInputChange} value={this.state.filter} />
        <Contacts
          data={this.getFilteredContacts()}
          onDelete={this.deleteContact}
        />
      </>
    );
  }
}
