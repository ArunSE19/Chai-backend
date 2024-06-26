import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    
    const uploadOnCloudinary= async (localFilePath)=>{
        try{
            if(!localFilePath) return null
            const response= await cloudinary.uploader.upload(localFilePath,{resource_type:'auto'})

            console.log("File path",response.url);
            fs.unlinkSync(localFilePath)
            return response;
        }
        catch(error){
            fs.unlinkSync(localFilePath,(error) => error && console.error(error))//this removes localfilepath if upload is not performed successfully
            return null
        }
    }

    const deleteFromCloudinary = async(publicId, resource_type = "image") => {
        try {
          if(!publicId) return null;
      
          const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: `${resource_type}`
          })
        } catch (error) {
          return error
          //console.log("Error while deleting file on cloudinary", error);
        }
      
      }

export {deleteFromCloudinary,uploadOnCloudinary}
    
