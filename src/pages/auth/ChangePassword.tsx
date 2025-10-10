import { toast } from "react-toastify";
import AuthForm from "./AuthForm";

const ChangePassword = () => {
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
      title="Nueva Contraseña"
      buttonLabel="Confirmar"
      fields={[
        { name: "password", type: "password", placeholder: "Nueva Contraseña" },
        { name: "confirmPassword", type: "password", placeholder: "Confirmar contraseña" },
      ]}
      onSubmit={handleRegister}
      validate={validateRegister}
    />
  );
};

export default ChangePassword;