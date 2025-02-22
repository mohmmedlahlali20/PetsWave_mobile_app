import path from "~/app/axios/path"
import { User } from "~/constant/type"

const registerApi = async (registerData: User) => {
    const response = await path.post("auth/register", registerData)
    console.log("User registered:", response.data)
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

export {
     registerApi, 
     loginApi,
     forgetPasswordApi
    }
