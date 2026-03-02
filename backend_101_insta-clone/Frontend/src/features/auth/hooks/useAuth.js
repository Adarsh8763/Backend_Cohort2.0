import { useContext } from "react";
import { AuthContext } from "../auth.context";


export function useAuth(){

    const context = useContext(AuthContext)  //Reads data present inside AuthContext

    return context
}