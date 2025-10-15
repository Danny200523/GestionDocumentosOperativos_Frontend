// src/components/Login/LoginForm.tsx
import { useState } from "react";
import { RiMailLine } from "react-icons/ri";
import { toast } from "react-toastify";
import PasswordInput from "./PaswordInput"


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      toast.error("Debe ingresar todos los campos", { theme: "dark" });
      return;
    }

    if (password.length < 6) {
      toast.error("Tu contraseña debe tener mínimo 6 caracteres", { theme: "dark" });
      return;
    }

    console.log("correcto");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
      <div className="relative">
        <RiMailLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="email"
          className="w-full border border-gray-200 outline-none py-2 px-7 rounded-lg"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <PasswordInput value={password} onChange={setPassword} />

      <div>
        <button
          type="submit"
          className="mt-6 bg-sky-600 text-white w-full py-2 px-6 rounded-lg hover:bg-sky-800 hover:scale transition-colors"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default LoginForm;