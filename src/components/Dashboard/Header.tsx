import { RiSearchLine, RiNotification3Line } from "react-icons/ri";
import { getCurrentUser } from "../../services/authService";
import { useEffect, useState } from "react";

interface CurrentUser {
    email: string;
    name?: string;
    role: string;
    department_id: number;
}

const Header = () => {
    const [user, setUser] = useState<CurrentUser | null>(null);

    useEffect(() => {
        getCurrentUser()
          .then(setUser)
          .catch(() => console.error("No se pudo obtener el usuario"));
      }, []);
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6  gap-4  md:gap-10 ">
            <div>
                <h1 className="text-2xl md:text-4xl font-semibold text-sky-400">Bienvenido {user ? (user.name ?? user.email) : "Cargando..."} 👋</h1>
            </div>
            <div className="flex items-center w-full gap-4  md:w-auto ">
                <div className="relative flex-1 md:flex-initial">
                    <RiSearchLine className="absolute left-3 top-3.5  text-gray-200 cursor-pointer hover:text-sky-400" />
                    <input
                        type="text"
                        placeholder="Buscar documento..."
                        className="w-full bg-gray-900 text-gray-200 pl-16 pr-9 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-white"
                    />
                </div>
                <RiNotification3Line className="text-2xl cursor-pointer text-white hover:text-sky-400" />
            </div>
        </header>
    );
};

export default Header;
