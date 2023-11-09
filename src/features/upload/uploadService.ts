import API from "../MainApi"

export const uploadImage = async (data: any) => {
    try {
        const res = await API.put('listing/upload/', data);

        if (res.data) {
            localStorage.setItem('images', JSON.stringify(res.data));
        }
    
        return res.data;

    } catch (error) {
        console.log(error);
    }
}



export const deleteImage = async (id: string) => {
    try {
        const res = await API.delete(`/listing/delete-image/${id}`);
        if (res.data) {
            localStorage.setItem('images', JSON.stringify(res.data))
        }
    } catch (error) {
        console.log(error);
    }
}

export default { uploadImage, deleteImage }

