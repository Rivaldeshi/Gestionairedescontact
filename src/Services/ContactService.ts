import axios from '../Mock/mockContactApi';
import { Contact } from '../Models/Contact';



const axiosInstance = axios.create({
    baseURL: '/api', // La base URL est configurée pour correspondre à l'URL simulée de l'API
});

export const contactService = {
    getAllContacts: async (): Promise<Contact[]> => {
        const response = await axiosInstance.get('/contacts');
        return response.data as Contact[];
    },

    getContactById: async (id: number): Promise<Contact> => {
        const response = await axiosInstance.get(`/contacts/${id}`);
        return response.data as Contact;
    },

    createContact: async (contact: Contact): Promise<Contact> => {
        const response = await axiosInstance.post('/contacts', contact);
        return response.data as Contact;
    },

    updateContact: async (id: number, contact: Contact): Promise<Contact> => {
        const response = await axiosInstance.put(`/contacts/${id}`, contact);
        return response.data as Contact;
    },

    deleteContact: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/contacts/${id}`);
    },
};
