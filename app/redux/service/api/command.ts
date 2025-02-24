import path from "~/app/axios/path";
import { Status } from "~/constant/type";

const commandApi = async ({ petsId, userId, totalamount }: { petsId: string[]; userId: string , totalamount:number}) => {
    
        const res = await path.post("commandes/Passe_commandes", {
            petsId,
            userId,
            status: Status.Pending,
            orderDate: new Date().toISOString().split("T")[0],
            totalamount
        });

        return res.data; 
   
};

export{
    commandApi
};
