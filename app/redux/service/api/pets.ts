import path from "~/app/axios/path"


const fetchAllPets = async () => {
  
    const res = await path.get('pets/findAll')
    return res.data.pets

 
}

export {
    fetchAllPets
}