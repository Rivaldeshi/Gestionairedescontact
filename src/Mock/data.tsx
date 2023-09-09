import { Contact } from "../Models/Contact";




// Création des contacts
const contact1: Contact = {
    id: 1,
    nom: 'Rivaldes',
    prenom: 'ranol',
    dateDeNaissance: new Date('1990-01-15'),
    email: 'ranol@example.com',
};

const contact2: Contact = {
    id: 2,
    nom: "Smith",
    prenom: "Alice",
    dateDeNaissance: new Date("1985-07-20"),
    email: "alice.smith@example.com",
};

const contact3: Contact = {
    id: 3,
    nom: "Johnson",
    prenom: "Bob",
    dateDeNaissance: new Date("1995-03-10"),
    email: "bob.johnson@example.com",
    pere: 1,
    mere: 2,
};




// Liste de contacts

export const listeContacts: Contact[] = [contact1, contact2, contact3];


