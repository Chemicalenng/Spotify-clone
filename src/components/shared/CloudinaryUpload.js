import { openUploadWidget } from "../../utils/CloudinaryService";
import { cloudinary_Upload_Preset } from "../../config";

const CloudinaryUpload = ({setUrl,setName}) => {
    const uploadImageWidget = () => {
        
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dbfagfwgm",
                uploadPreset: cloudinary_Upload_Preset,
                sources: ["local"]
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename)
                    //props.onImageUpload(result.info.public_id);
                }
                else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button className="font-bold bg-white rounded-full py-2 px-6" onClick={uploadImageWidget}>
            Select Track
        </button>
    );
};

export default CloudinaryUpload;
