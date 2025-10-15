import { toast } from "react-toastify";
import AuthForm from "../AuthForm";
import { login } from "../../../services/authService";

const Login = () => {
    const handleLogin = async (data: Record<string, string>) => {
      try {
        const { access_token } = await login({ email: data.email, password: data.password });
        localStorage.setItem("token", access_token);
        toast.success("Inicio de sesión exitoso");
        window.location.href = "/Dasboard";
      } catch (e: any) {
        const msg = e?.message || "No se pudo iniciar sesión";
        toast.error(msg);
      }
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