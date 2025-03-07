import path from "~/app/axios/path";
import { Comments } from "~/constant/type";

const getCommentsByPetsId = async (petsId: string) => {
    const res = await path.get(`comments/${petsId}`);
    return res.data || [];
};

const addComments = async (
    {
        petsId,
        createdBy,
        text
    }:
        {
            petsId: string,
            createdBy: string,
            text: string

        }): Promise<Comments> => {
    const res = await path.post(`comments/${createdBy}`, {
        text,
        createdBy,
        petsId,
    });
    return res.data;

};


const removeCommentsApi = async (commentId: string) => {
    const res = await path.delete(`comments/${commentId}`)
    return res.data
}

export {
    getCommentsByPetsId,
    addComments,
    removeCommentsApi
};
