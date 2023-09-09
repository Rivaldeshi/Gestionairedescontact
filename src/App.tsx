import React, { useEffect, useState } from 'react';
import './App.css';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { contactService } from './Services/ContactService';
import { Contact } from './Models/Contact';
import ContactList from './Components/ContactList';
import FullFeaturedCrudGrid from './Components/Rien/Index';

const App: React.FC = () => {

  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // Chargez la liste des contacts au chargement du composant
    async function fetchContacts() {
      try {
        const fetchedContacts = await contactService.getAllContacts();
        setContacts(fetchedContacts);
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts :', error);
      }
    }

    fetchContacts();
  }, []);



  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestionnaire de contacts
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, overflowX: 'auto' }}>
        <Toolbar />

        <ContactList />

        
      </Box>
    </Box>

  );
}

export default App;
