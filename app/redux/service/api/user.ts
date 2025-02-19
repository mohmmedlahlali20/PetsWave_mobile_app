import path from "~/app/axios/path"
import { User } from "~/constant/type"

const registerApi = async (registerData: User) => {
    const response = await path.post("auth/register", registerData)
    console.log("User registered:", response.data)
    return response.data
}

export { registerApi }
