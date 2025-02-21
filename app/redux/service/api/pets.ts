import path from "~/app/axios/path"


const fetchAllPets = async () => {
    const res = await path.get('pets/findAll')
    return res.data.pets 
}
const fetchPetById = async (petId: string) => {
    const res = await path.get(`pets/findByPetsId/${petId}`)    
    return res.data
}

export {
    fetchAllPets,
    fetchPetById
}