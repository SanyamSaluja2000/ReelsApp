import { useContext } from "react";
import  { authContext } from "./AuthProvider"

const useAuth = () => {
    const context = useContext(authContext);
    if(context===undefined){
        throw new Error("Context Undefined");
    }
    return context;
}

export default useAuth;