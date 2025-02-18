export interface User {
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
    password: string;
    role: Role
}


export interface Role {
    client: string;
    admin: string
}