export interface User {
    _id?:any
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    password: string;
}


export interface Category {
    _id: any
    name: string
}



export interface InputFieldProps {
    icon?: React.ReactNode;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    showPasswordToggle?: boolean;
    isPassword?: boolean;
    togglePasswordVisibility?: () => void;
    showPasswordState?: boolean;
    keyboardType?: string
}



export interface Pets {
    _id: string
    name: string,
    description: string,
    gender: string,
    age: number,
    category: Category,
    images: string[],
    Prix: number,
    isAvailable: boolean,
    createdAt?: Date
}


export interface Commands {
    _id: string
    petsId: Pets,
    userId: User,
    status: Status,
    orderDate: Date,
    totalAmount: number
}


export enum Status {
    Pending = "pending",
    InProgress = "InProgress",
    Completed = "completed",
    Cancelled = "cancelled"
}


export interface Comments {
    _id?:string
    text:string
    petsId:string
    createdBy: User
    createdAt: Date
}

