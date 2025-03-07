import path from "~/app/axios/path";
import { Comments } from "~/constant/type";

const getCommentsByPetsId = async (petsId: string) => {
    const res = await path.get(`comments/${petsId}`);
    return res.data || [];
};

const addComments = async ({ petsId, createdBy, text }: { petsId: string, createdBy: string, text: string }) : Promise<Comments> => {
    try {
        const res = await path.post(`comments/${createdBy}`, {
            text,
            createdBy,
            petsId,
        });
       
        
        return res.data;
    } catch (error) {
        throw new Error("Failed to add comment.");
    }
};

export {
    getCommentsByPetsId,
    addComments,
};
