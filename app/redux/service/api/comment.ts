import path from "~/app/axios/path"


const getCommentsByPetsId = async (petsId:string) => {
    const res = await  path.get(`comments/${petsId}`)
    console.log(res.data);
    
    return res.data || []
}



export {
    getCommentsByPetsId
}