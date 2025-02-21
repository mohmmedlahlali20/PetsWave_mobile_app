import path from "~/app/axios/path"



const getCategoryApi = async () => {
    const res = await path.get('category/GetAll');
    return res.data
}


export {
    getCategoryApi
}