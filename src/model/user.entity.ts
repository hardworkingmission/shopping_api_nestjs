import { Role } from './role.enum';

export interface User {
    username: string;
    password: string;
    email: string;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    phone: number;
    role: Role[];
}