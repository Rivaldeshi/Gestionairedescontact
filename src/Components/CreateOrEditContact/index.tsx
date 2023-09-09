import React, { useEffect, useState } from 'react';
import {
    Button,
    useTheme,
    useMediaQuery,
    DialogContent,
    DialogTitle,
    Dialog,
    DialogActions,
    Grid,
    TextField,
    Typography,
    Autocomplete,
} from '@mui/material';

import { Contact } from '../../Models/Contact';
import { contactService } from '../../Services/ContactService';

interface CreateOrEditContactProps {
    open: boolean;
    onClose: () => void;
    id?: number;
}

const initialContact: Contact = {
    id: 0,
    nom: '',
    prenom: '',
    dateDeNaissance: new Date(),
    email: '',
};

interface ParentType {
    label: string;
    id: number;

}


const CreateOrEditContact: React.FC<CreateOrEditContactProps> = ({ open, onClose, id }) => {

    const [contact, setContact] = useState<Contact>(initialContact);
    const [errors, setErrors] = useState<Partial<Contact>>({});
    const [parentList, SetparentList] = useState<ParentType[]>([]);
    const [ContactList, SetContactList] = useState<Contact[]>([]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
        // Chargez la liste des contacts parant au chargement du composant
        async function fetchParent() {
            try {
                const fetchedContacts = await contactService.getAllContacts();

                if (id) {
                    setContact(fetchedContacts.find(c => c.id === id) ?? initialContact)
                }
                const parents: ParentType[] = fetchedContacts.map((c: Contact) => {
                    return { label: `${c.nom}  ${c.prenom}`, id: c.id }
                });
                SetparentList(parents);
                SetContactList(fetchedContacts)
            } catch (error) {
                console.error('Erreur lors de la récupération des contacts :', error);
            }
        }
        fetchParent();
    }, [id]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors: Partial<Contact> = {};
        if (!contact.nom) {
            validationErrors.nom = 'Nom is required';
        }
        if (!contact.prenom) {
            validationErrors.prenom = 'Prénom is required';
        }
        if (!contact.email) {
            validationErrors.email = 'Email is required';
        }
        if (contact.nom && contact.nom.trim().length < 3) {
            validationErrors.nom = 'Nom most have 3 letters at least';
        }
        if (contact.prenom && contact.prenom.trim().length < 3) {
            validationErrors.prenom = 'Prenom most have 3 letters at least';
        }

        if (contact.nom && ContactList.find((c) => c.nom === contact.nom) && !id) {
            validationErrors.nom = 'Nom most be unique';
        }

        if (Object.keys(validationErrors).length === 0) {

            try {
                if (id) {
                    await contactService.updateContact(id, contact);
                } else {
                    await contactService.createContact(contact);
                }
                onClose();
            } catch (e) {
                console.log(e)
            }
            setContact(initialContact);
            setErrors({});
        } else {
            console.log("b");
            setErrors(validationErrors);
        }

    }

    return (


        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg"
            scroll="paper"
            component="form"
            fullScreen={fullScreen}
        // PaperProps={{
        //     sx: {
        //         maxHeight: {
        //             xs: '80%'//to prevent the dialog to cover the app bar om mobile
        //         },
        //     }
        // }}
        >
            <DialogTitle>{id ? "Edit Contact" : "Create Contact"}</DialogTitle>
            <DialogContent dividers>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Contact Information</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="nom"
                            label="Nom"
                            variant="outlined"
                            fullWidth
                            value={contact.nom}
                            onChange={handleChange}
                            error={Boolean(errors.nom)}
                            helperText={errors.nom}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="prenom"
                            label="Prenom"
                            variant="outlined"
                            fullWidth
                            value={contact.prenom}
                            onChange={handleChange}
                            error={Boolean(errors.prenom)}
                            helperText={errors.prenom}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="email"
                            type='email'
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={contact.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="dateDeNaissance"
                            type='Date'
                            label="Date De naissance"
                            variant="outlined"
                            fullWidth
                            value={contact.dateDeNaissance}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={parentList}
                            onChange={(e, newValue) => setContact({
                                ...contact,
                                pere: newValue?.id,
                            })}

                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    name="pere"
                                    label="pere"
                                    variant="outlined"
                                    fullWidth
                                    value={contact.pere}
                                    error={Boolean(errors.pere)}
                                    helperText={errors.pere}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={parentList}
                            onChange={(e, newValue) => setContact({
                                ...contact,
                                mere: newValue?.id,
                            })}

                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    name="mere"
                                    label="mere"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(errors.mere)}
                                    helperText={errors.mere}
                                />
                            }
                        />
                    </Grid>



                </Grid>

            </DialogContent>


            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>

    );
};

export default CreateOrEditContact;
