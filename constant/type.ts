export interface User {
    firstName: string;
    lastName: string;
    avatar?: string | null;
    email: string;
    password: string;
}


export interface Category {
    id: string
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
    isAvailable: boolean
}


export interface Commands {
    petsId: string,
    userId: string,
    status: Status,
    orderDate: Date,
    totalAmount: number
}


export enum Status {
    Pending = "pending",
    InProgress = "inProgress",
    Completed = "completed",
    Cancelled = "cancelled"
}

