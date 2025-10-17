import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthForm from "../AuthForm";
import { registerUser, getDepartments } from "../../../services/authService";
import type {  Department } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [deptOptions, setDeptOptions] = useState<{ value: string; label: string }[]>([
    { value: "", label: "Selecciona un departamento" },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const depts: Department[] = await getDepartments();
        const opts = [
          { value: "", label: "Selecciona un departamento" },
          ...depts.map((d) => ({ value: String(d.id), label: d.name })),
        ];
        setDeptOptions(opts);
      } catch (e: any) {
        toast.error(e?.message || "No se pudieron cargar los departamentos", { theme: "dark" });
        setDeptOptions([{ value: "", label: "Selecciona un departamento" }]);
      }
    })();
  }, []);

  const handleRegister = async (data: Record<string, string>) => {
    if (!validateRegister(data)) return;

    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        id_department: Number(data.id_department),
      });

      toast.success(result.msg || "Usuario registrado con éxito", { theme: "dark" });

      setTimeout(() => navigate("/"), 1500);

    } catch (error: any) {
      toast.error(error.message || "Error al registrar usuario", { theme: "dark" });
    }
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
      title="Crear cuenta"
      buttonLabel="Registrarse"
      fields={[
        { name: "name", type: "text", placeholder: "Nombre completo" },
        { name: "email", type: "email", placeholder: "Correo electrónico" },
        { name: "password", type: "password", placeholder: "Contraseña" },
        { name: "confirmPassword", type: "password", placeholder: "Confirmar contraseña" },
        {
          name: "role",
          type: "select",
          options: [
            { value: "", label: "Selecciona un rol" },
            { value: "admin", label: "Administrador" },
            { value: "user", label: "Usuario" },
          ],
        },
        {
          name: "id_department",
          type: "select",
          options: deptOptions,
        },
      ]}
      onSubmit={handleRegister}
      validate={validateRegister}
    />
  );
};

export default Register;
