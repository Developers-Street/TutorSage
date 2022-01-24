import axios from "axios";


export const uploadImage = async (files: any) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "tutorsage");

    return await axios.post("https://api.cloudinary.com/v1_1/aasman/image/upload", formData);
}