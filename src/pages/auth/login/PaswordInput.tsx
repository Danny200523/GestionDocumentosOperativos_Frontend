// src/components/Login/PasswordInput.tsx
import { useState } from "react";
import { RiLockLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PasswordInput = ({ value, onChange, placeholder = "Contraseña" }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative ">
      <RiLockLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type={showPassword ? "text" : "password"}
        className="w-full border border-gray-200 outline-none py-2 px-7 rounded-lg"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {showPassword ? (
        <RiEyeOffLine
          onClick={() => setShowPassword(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
        />
      ) : (
        <RiEyeLine
          onClick={() => setShowPassword(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
        />
      )}
    </div>
  );
};

export default PasswordInput;