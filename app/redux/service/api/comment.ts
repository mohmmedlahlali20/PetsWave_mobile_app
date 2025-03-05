import path from "~/app/axios/path"


const getComments = async () => {
    const res = await  path.get('comments/findAll')
    return res.data || []
}



export {
    getComments
}