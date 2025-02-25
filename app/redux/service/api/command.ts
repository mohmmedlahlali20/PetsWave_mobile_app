import path from "~/app/axios/path";
import { Status } from "~/constant/type";

const commandApi = async ({ petsId, userId, totalamount }: { petsId: string[]; userId: string, totalamount: number }) => {

    const res = await path.post("commandes/Passe_commandes", {
        petsId,
        userId,
        status: Status.Pending,
        orderDate: new Date().toISOString().split("T")[0],
        totalamount
    });

    return res.data;

};


const GetCommandeByUserIdApi= async(userId: string)=>{
    const res = await path.get(`commandes/GetCommandeByUserId/${userId}`)
    console.log('res', res.data.userCommandes);
    
    return res.data.userCommandes || []
}

export {
    commandApi,
    GetCommandeByUserIdApi
};
