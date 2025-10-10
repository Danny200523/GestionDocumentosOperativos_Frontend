import { toast } from "react-toastify";
import AuthForm from "../AuthForm";

const Login = () => {
  const handleLogin = (data: Record<string, string>) => {
    console.log("Inicio de sesión exitoso:", data);
  };

  const validateLogin = (data: Record<string, string>) => {
    if ([data.email, data.password].includes("")) {
      toast.error("Debe ingresar todos los campos", { theme: "dark" });
      return false;
    }
    if (data.password.length < 6) {
      toast.error("La contraseña debe tener mínimo 6 caracteres", { theme: "dark" });
      return false;
    }
    return true;
  };

  return (
    <AuthForm 
      title="Iniciar sesión"
      buttonLabel="Ingresar"
      fields={[
        { name: "email", type: "email", placeholder: "Correo electrónico" },
        { name: "password", type: "password", placeholder: "Contraseña" },
      ]}
      onSubmit={handleLogin}
      validate={validateLogin}
    />
  );
};

export default Login;