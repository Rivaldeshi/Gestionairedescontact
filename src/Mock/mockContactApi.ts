/* eslint-disable @typescript-eslint/no-use-before-define */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Contact } from '../Models/Contact';
import { listeContacts } from './data';

const mock = new MockAdapter(axios);

const contacts: Contact[] = listeContacts;


mock.onGet('/api/contacts').reply(200, contacts);


// Simuler une requête GET pour récupérer un contact par son ID
mock.onGet(/\/api\/contacts\/\d+/).reply((config) => {
    const contactId = parseInt(config.url?.split('/').pop() || '', 10);
    const contact = contacts.find((c) => c.id === contactId);

    if (contact) {
        return [200, contact];
    } else {
        return [404, { message: 'Contact not found' }];
    }
});

// Simuler une requête POST pour créer un nouveau contact
mock.onPost('/api/contacts').reply((config) => {
    const newContact = JSON.parse(config.data);
    // Générez un nouvel ID pour le contact (vous pouvez utiliser une bibliothèque d'ID unique)
    newContact.id = contacts.length + 1;
    contacts.push(newContact);
    return [201, newContact];
});

// Simuler une requête PUT pour mettre à jour un contact par son ID
mock.onPut(/\/api\/contacts\/\d+/).reply((config) => {
    const contactId = parseInt(config.url?.split('/').pop() || '', 10);
    const updatedContact = JSON.parse(config.data);
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index !== -1) {
        contacts[index] = { ...contacts[index], ...updatedContact };
        return [200, contacts[index]];
    } else {
        return [404, { message: 'Contact not found' }];
    }
});

// Simuler une requête DELETE pour supprimer un contact par son ID
mock.onDelete(/\/api\/contacts\/\d+/).reply((config) => {
    const contactId = parseInt(config.url?.split('/').pop() || '', 10);
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index !== -1) {
        contacts.splice(index, 1);
        return [204];
    } else {
        return [404, { message: 'Contact not found' }];
    }
});

export default axios;
