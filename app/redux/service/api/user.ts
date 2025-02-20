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

export {
     registerApi, 
     loginApi 
    }
