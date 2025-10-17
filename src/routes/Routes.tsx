import { Route, Routes } from 'react-router-dom';
import { Authlayout } from '../layout/auth/Authlayout';
import Login from '../pages/auth/login/Login';
import  Register  from '../pages/auth/register/Register';
import ForgetPassword from '../pages/auth/ForgetPassword';
import ChangePassword from '../pages/auth/ChangePassword';
import Error from '../pages/404';
import DocumentsTables from '../components/Document/DocumentsTable';
import Dashboard from '../pages/Dashboard';
import UploadDocumentPage from "../pages/UploadDocumentPage";
import { PrivateRoute } from './PrivateRoute';
import Profile from '../pages/Profile';


export const AppRoutes = () => {
    return (
      <Routes>
      <Route path='/' element={<Authlayout />}>
        <Route index element={<Login />} />
        <Route path='registro' element={<Register />} />
        <Route path='registro/olvide-password' element={<ForgetPassword />} />
        <Route path='restablecer-password/:token' element={<ChangePassword />} />
      </Route>
    
      
      <Route path='/' element={<Authlayout />}>
        <Route path='Dasboard' element={<Dashboard />} />
        <Route path='DocumentsTables' element={<DocumentsTables />} />
        <Route path='upload' element={<UploadDocumentPage />} />
        <Route path='Profile' element={<Profile/>} />
        </Route>
      
    
      <Route path='*' element={<Error />} />
    </Routes>
    )
    
}
