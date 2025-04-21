export class User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    phone?: string;
    experience?: number;
    pwd?: string; // Add password as an optional field if necessary for user creation
    roles?: string []; // Keep roles as is
  }
  