import { HiOutlineMail, HiOfficeBuilding } from "react-icons/hi";
import { getCurrentUser } from "../../services/authService";
import { useEffect, useState } from "react";
import AvatarInitials from "./AvatarInitials";

interface CurrentUser {
  email: string;
  name?: string;
  role: string;
  department_id: number;
}

export default function HeaderProfile() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => console.error("No se pudo obtener el usuario"));
  }, []);
  return (
    <div className="flex flex-col">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6  gap-4  md:gap-10 p-6">
        <AvatarInitials name={user?.name ?? "NA"} />
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl md:text-5xl font-semibold text-white">
            {user ? user.name ?? user.email : "Cargando..."}
          </h1>
          <h3 className="text-left text-2xl">{user ? user.role : "Cargando..."}</h3>
        </div>
        <div className="flex items-center w-full gap-4  md:w-auto ">
          <div className="relative flex-1 md:flex-initial"></div>
        </div>
      </header>
      <hr className="opacity-20" />
      <br />
      <div className="flex flex-row justify-center content-center align-middle items-center gap-30 p-4">
        <div className="flex flex-col justify-center items-center align-middle content-center gap-4">
          <HiOutlineMail className="text-5xl" />
          <h3>[{user ? user.email : "Cargando..."}]</h3>
        </div>
        <div className="flex flex-col justify-center items-center align-middle content-center gap-4">
          <HiOfficeBuilding className="text-5xl" />
          <h3>[{user ? user.department_id : "Cargando..."}]</h3>
        </div>
      </div>
    </div>
  );
}
