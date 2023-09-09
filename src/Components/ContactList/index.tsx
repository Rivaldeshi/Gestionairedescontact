import React, { useEffect, useState } from 'react';
import { contactService } from '../../Services/ContactService';
import { Contact } from '../../Models/Contact';
import { DataGrid, GridActionsCellItem, GridColDef, GridToolbarContainer, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CreateOrEditContact from '../CreateOrEditContact';


// interface CustomModalProps {
//     onClose: () => void;
// }



const ContactList: React.FC = () => {

    const [contacts, setContacts] = useState<Contact[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idToEdit, SetidToEdit] = useState<number | undefined>(undefined);


    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        fetchContacts();
    };


    useEffect(() => {
        fetchContacts();
    }, []);

    // Chargez la liste des contacts au chargement du composant
    async function fetchContacts() {
        try {
            const fetchedContacts = await contactService.getAllContacts();
            setContacts(fetchedContacts);
        } catch (error) {
            console.error('Erreur lors de la récupération des contacts :', error);
        }
    }

    const AddAction = () => {

        return (
            <GridToolbarContainer sx={{ display: 'flex', justifyContent: "flex-end" }}>
                <Button color="primary" variant='contained' onClick={openModal}>
                    Add record
                </Button>
            </GridToolbarContainer>
        );
    }

    const handleDelete = async (id: number) => {
        try {
            await contactService.deleteContact(id);
            await fetchContacts();
        } catch (error) {
            console.error('Erreur lors de la récupération des contacts :', error);
        }

    }



    const columns: GridColDef<Contact>[] = [
        { field: 'id', headerName: 'ID', sortable: false, width: 70 },

        { field: 'nom', headerName: 'Nom', sortable: false, width: 130 },
        { field: 'prenom', headerName: 'Prenoms', sortable: false, width: 130 },
        {
            field: 'email',
            headerName: 'email',
            sortable: false,
            width: 300

        },
        {
            field: 'pere',
            headerName: 'Pere',
            sortable: false,
            width: 130,
            valueGetter: (params: GridValueGetterParams) => {
                const pere = contacts.find(c => c.id === params.row.pere)?.nom
                return pere
            }
            ,
        },
        {
            field: 'mere',
            headerName: 'Mere',
            sortable: false,
            width: 130,
            valueGetter: (params: GridValueGetterParams) => {
                const pere = contacts.find(c => c.id === params.row.mere)?.nom
                return pere
            }
            ,
        },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => { SetidToEdit(id as number); openModal() }}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDelete(id as number)}
                        color="inherit"
                    />,
                ];
            },
        }
    ]




    return (
        <Container style={{ marginTop: '40px' }} >
            <CreateOrEditContact open={isModalOpen} onClose={closeModal} id={idToEdit} />
            <DataGrid
                rows={contacts}
                columns={columns}

                slots={{
                    toolbar: AddAction
                }}

                checkboxSelection
            />
        </Container>



    );
}

export default ContactList;
