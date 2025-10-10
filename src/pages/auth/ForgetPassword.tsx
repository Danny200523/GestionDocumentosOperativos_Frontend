import { toast } from "react-toastify";
import AuthForm from "./AuthForm";

const ForgetPassword = () => {
  const handleRegister = (data: Record<string, string>) => {
    console.log("Usuario registrado:", data);
  };

  const validateRegister = (data: Record<string, string>) => {
    if ([data.name, data.email, data.password, data.confirmPassword].includes("")) {
      toast.error("Debe llenar todos los campos", { theme: "dark" });
      return false;
    }
    if (data.password.length < 8) {
      toast.error("La contraseña debe tener mínimo 8 caracteres", { theme: "dark" });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Las contraseñas no coinciden", { theme: "dark" });
      return false;
    }
    return true;
  };

  return (
    <AuthForm
      title="Recuperar Contraseña"
      buttonLabel="enviar codigo"
      fields={[
        { name: "email", type: "email", placeholder: "Correo electrónico" },
      ]}
      onSubmit={handleRegister}
      validate={validateRegister}
    />
  );
};

export default ForgetPassword;