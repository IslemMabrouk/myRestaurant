export class User {
    id!: number;
    name?: string;
    email?: string;
    address?: string;
    contactNumber?: string;
    roles?: { id: number; name: string }[];
}