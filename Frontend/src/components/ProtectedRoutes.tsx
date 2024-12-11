import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}:any) => {
    const {isAuthenticated}=useSelector((store:any)=>store.auth);
    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }
  return children;
}

export const AuthenticatedUser=({children}:any)=>{
    const {isAuthenticated}=useSelector((store:any)=>store.auth);
    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }
    return children;
}


export const AdminRoute=({children}:any)=>{
    const {user,isAuthenticated}=useSelector((state:any)=>state.auth);
    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }
    if(user.role!=="instructor"){
        return <Navigate to="/"/>
    }
    return children;
}
