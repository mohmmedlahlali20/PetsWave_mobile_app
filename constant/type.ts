export interface User {
    firstName: string;
    lastName: string;
    avatar?: string | null ;
    email: string;
    password: string;
}


export interface Category {
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
    keyboardType?:string
  }