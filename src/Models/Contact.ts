export interface Contact {
    id : number,
    nom: string;
    prenom: string;
    dateDeNaissance: Date;
    email: string;
    pere?: number;
    mere?: number;
}