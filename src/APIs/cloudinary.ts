import axios from "axios";


export const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tutorsage");

    return await axios.post("https://api.cloudinary.com/v1_1/aasman/image/upload", formData);
}