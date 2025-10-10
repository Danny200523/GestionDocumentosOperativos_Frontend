import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Authlayout } from './layout/auth/Authlayout';
import Login from './pages/auth/login/Login';
import  Register  from './pages/auth/register/Register';
import ForgetPassword from './pages/auth/ForgetPassword';
import ChangePassword from './pages/auth/ChangePassword';
import Error from './pages/404';

// 👉 Importa React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <Routes>
        <Route path='/' element={<Authlayout />}>
          <Route index element={<Login />} />
          <Route path='registro' element={<Register />} />
          <Route path='registro/olvide-password' element={<ForgetPassword />} />
          <Route path='restablecer-password/:token' element={<ChangePassword />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;