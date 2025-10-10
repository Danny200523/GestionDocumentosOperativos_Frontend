import { useState } from "react";
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link } from "react-router-dom";

interface AuthFormProps {
  title: string;
  buttonLabel: string;
  fields: { name: string; type: string; placeholder: string }[];
  onSubmit: (data: Record<string, string>) => void;
  validate?: (data: Record<string, string>) => boolean;
}

const AuthForm = ({ title, buttonLabel, fields, onSubmit, validate }: AuthFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate && !validate(formData)) return;
    onSubmit(formData);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 rounded-2xl border border-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h1 className="text-3xl uppercase font-bold text-center mb-10 text-slate-50">{title}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        {fields.map((field) => (
          <div key={field.name} className="relative">
            {field.type === "email" && (
              <RiMailLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            )}
            {field.type === "password" && (
              <RiLockLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            )}
            <input
              name={field.name}
              type={field.type === "password" ? (showPassword ? "text" : "password") : field.type}
              placeholder={field.placeholder}
              className="w-full border border-gray-200 outline-none placeholder:text-gray-100 text-gray-200 py-2 px-7 rounded-lg"
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
            {field.type === "password" &&
              (showPassword ? (
                <RiEyeOffLine
                  onClick={() => setShowPassword(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
                />
              ) : (
                <RiEyeLine
                  onClick={() => setShowPassword(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
                />
              ))}
          </div>
        ))}
        <button
          className="mt-6 bg-sky-600 text-white w-full py-2 px-6 rounded-lg hover:bg-sky-800 hover:scale transition:colors"
          type="submit"
        >
          {buttonLabel}
        </button>
      </form>
      {location.pathname==='/' && (
        <div className="text-center text-gray-200">
          ¿no tienes una cueta? 
          <Link to={"/registro"} className="text-sky-600 font-medium ml-2 hover:underline transition-all">Registrate</Link>
        </div>
      )}
      {location.pathname ==='/registro' && (
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="text-right text-gray-200">
          ¿ya tienes una cuenta?
            <Link to={"/"} className="text-gray-400 hover:text-sky-600 transition-colors">  ingresa</Link>
          </div>
          <div className="text-right">
            <Link to={"olvide-password"} className="text-gray-300 hover:text-sky-600  transition-colors">¿olvidastes tu contraseña?</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;