import axios from "axios"
import path from "~/app/axios/path"
import { User } from "~/constant/type"

const registerApi = async (registerData: User) => {
    const response = await path.post("auth/register", registerData)
    
    return response.data
}
const loginApi = async ({email, password}:{email:string, password: string}) => {
    const  login = await path.post('auth/login', {email, password})
    return login.data
}

const forgetPasswordApi = async (email: string) => {
    const res = await path.post('auth/forget-password', {email});
    return res.data
}


const verificationOTPApi = async ({ email, otp }: { email: string; otp: string }) => {
    const res = await path.post("auth/verify-otp", { email, otp });
    return res.data;
};

const resetPasswordApi = async ({ email, newPassword }: { email: string; newPassword: string }) => {
    const res = await path.post("auth/reset-password", { email, newPassword });
    return res.data;
};


const ProfileApi = async (userId: string) =>{
    const res = await path.get(`auth/profile/${userId}`)
    return res.data
}


const updateProfileApi = async ({ userId, avatar }: { userId: string; avatar: File }) => {
    try {
        const res = await path.patch(`auth/update-profile/${userId}`, { avatar });
        return res.data;
    } catch (error) {
        console.error("Error updating profile:", error);
    }
}


export {
    registerApi, 
    loginApi,
    forgetPasswordApi,
    verificationOTPApi,
    resetPasswordApi,
    ProfileApi,
    updateProfileApi
};
