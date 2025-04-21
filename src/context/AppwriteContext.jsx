import { createContext, useContext, useEffect, useState } from "react";
import {Client,Account,ID,Storage,Databases} from 'appwrite'
import { config } from '../services/AppwriteConfig';
import toast from "react-hot-toast";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const {  appWriteBacketId, appWriteCollectionId,appWriteProjectId,appWriteDataBaseId} = config;

const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject(appWriteProjectId)

const AppWriteContext = createContext()
export const AppWriteContextProvider = ({children})=>{
    const account = new Account(client)
    const storge = new Storage(client)
    const db = new Databases(client)
    const [userData,setUserData] = useState(null)

    
    // ====================================== create account function ===============================================
    const createAccount = async ({ email, password, name, imageFile }) => {
        try {
          // Step 1: Create the user account
          const res = await account.create(ID.unique(), email, password, name);
      
          // Step 2: Log the user in (necessary to call updatePrefs)
          await account.createEmailPasswordSession(email, password);
      
          // Step 3: Upload profile image
          let imageUrl = "";
          if (imageFile) {
            const upload = await storge.createFile(appWriteBacketId, ID.unique(), imageFile);
            imageUrl = storge.getFileView(appWriteBacketId, upload.$id).href;
          }
      
          // Step 4: Update user prefs (must be logged in to call this)
          await account.updatePrefs({ profileImage: imageUrl });
      
          // Step 5: Fetch updated user info
          const updatedUser = await account.get();
          setUserData(updatedUser);
      
          toast.success("Account created successfully!");
          return { ...res, imageUrl };
      
        } catch (error) {
          console.log("Account creation error:", error);
          toast.error(error.message);
        }
      };
      
      
    // ========================================== login account function =============================================
    const loginAccount = async (email,password) => {
        try {
            let res = await account.createEmailPasswordSession(email,password)
            console.log(res);
            toast.success("Welcome Back!")
            return res 
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    }
    // 
    // ============================================= artical psot methods ================================================

    const addPost = async ({ title, content, category, image,author })=>{
        try {
            // 1. Upload image to Appwrite bucket
            const imageUploadRes = await storge.createFile(
              appWriteBacketId, // 👈 Replace with your bucket ID
              ID.unique(),
              image
            );
        
            // 2. Get file ID or URL (your choice)
            const fileId =  imageUploadRes.$id;
            console.log(fileId);
            
             const imagePreviewUrl =  storge.getFileView(appWriteBacketId,fileId)
             console.log("Image Preview URL:", imagePreviewUrl);
        
            // 3. Create article with image reference
            const postDate = new Date();
            const user = await account.get()
            const userId  = user.$id
            const res = await db.createDocument(
              appWriteDataBaseId,           // Database ID
              appWriteCollectionId,   // Collection ID
              ID.unique(),
              {
                postTitle: title,
                content: content,
                category: category,
                postImage: imagePreviewUrl, // 👈 Save preview URL or file ID
                author: author,
                uploadDate: postDate.toLocaleDateString(),
                userID:userId
              }
            );
        
            toast.success("Post uploaded successfully.");
            console.log(res);
            
            return res;
        
          } catch (error) {
            toast.error(error.message);
            console.log("Error creating post:", error);
          }
    }
    // ================================================ list data =====================================================
    const listData = async ()=>{
        try {
            const res = await db.listDocuments(appWriteDataBaseId,appWriteCollectionId)
            return res
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const startLoading = () => {
        setIsLoading(true);
        NProgress.start();
      };
      const stopLoading = () => {
        setIsLoading(false);
        NProgress.done();
      }

      const userAccountInfo = async ()=>{
        try {
            const res = await account.get()
            toast.success("user is login")
            console.log(res);
            setUserData(res)
            return res
            
        } catch (error) {
            toast.error("please create account")
            console.log(error);
        }

      }

      const logoutFunction = async ()=>{
        try {
            const res = await account.deleteSession('current')
            toast.success("Logout successful")
            console.log(res);
            
        } catch (error) {
            toast.error(error.message)
            console.log(error);            
        }
      }
      // =================== Get current user info ===================
const getUserInfo = async () => {
    try {
      const res = await account.get();
      return res;
    } catch (error) {
      toast.error("Failed to fetch user info");
      console.log(error);
    }
  };
  
  // =================== Update name ===================
  const updateUserName = async (name) => {
    try {
      const res = await account.updateName(name);
      toast.success("Name updated successfully");
      return res;
    } catch (error) {
      toast.error("Failed to update name");
      console.log(error);
    }
  };
  
// ================== Upload Profile Pic ==================
const uploadProfileImage = async (file) => {
    try {
      const uploaded = await storge.createFile(appWriteBacketId, ID.unique(), file);
      const imageUrl = storge.getFileView(appWriteBacketId, uploaded.$id).href;
      console.log(imageUrl);
      
      await account.updatePrefs({ profileImage: imageUrl });
      toast.success("Profile image updated");
      return imageUrl;
    } catch (error) {
      toast.error("Failed to upload image");
      console.log(error);
    }
  };
  
    const [isLoading, setIsLoading] = useState(false);
    const allValuse = {
        account,createAccount,loginAccount,addPost,listData,startLoading,stopLoading,isLoading,userAccountInfo,
        db,appWriteDataBaseId, appWriteCollectionId,logoutFunction,userData,getUserInfo, updateUserName,uploadProfileImage,
        appWriteBacketId,storge,ID
        
    }
    return(
        <AppWriteContext.Provider value={allValuse}>
            {children}
        </AppWriteContext.Provider>
    )
}

export const useAppWrite = ()=> useContext(AppWriteContext)