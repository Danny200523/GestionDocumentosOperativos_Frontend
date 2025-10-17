import { Home, FileText, Plus, User, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [modalOpen, SetModalOpen] = useState(false);
    const navigate = useNavigate();

    const HandleLogout = () => {
        try {
            localStorage.removeItem("token");
          } catch (error) {
            console.error("Error al eliminar el token:", error);
          }
        SetModalOpen(false);
        navigate("/");
    }
    return (
        <>

            <button
                className="lg:hidden fixed top-4 right-4 z-50 bg-sky-600 text-white p-2 rounded-lg shadow-lg"
                onClick={() => setOpen(!open)}
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                ></div>
            )}
            <aside className={`fixed top-0 left-0 h-full  w-64 bg-[#0F172A]/90 backdrop-blur-md text-gray-300 p-6 rounded-r-2xl shadow-lg transition-transform duration-300 z-50
                ${open ? "translate-x-0" : "-translate-x-[105%]"} lg:translate-x-0`}>

                <div className="pl-6 pt-6">
                    <h1 className="text-4xl flex flex-row gap-4 items-center font-bold text-sky-400 mb-10 tracking-wide"><span>Dashboard</span> </h1>
                    <nav className="flex flex-col gap-8">
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition" to="/Dasboard" >  <Home size={20} /> <span>Dasboard</span></Link>
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition" to="/DocumentsTables" ><FileText size={20} /><span>Documentos</span></Link>
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition" to="/upload" ><Plus size={20} /><span>Crear</span></Link>
                        <Link className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition" to="/profile" ><User size={20} /><span>Perfil</span></Link>
                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition" onClick={() => SetModalOpen(true)}><LogOut size={20} /><span>Cerrar sesión</span></button>
                    </nav>
                </div>
            </aside>
            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => SetModalOpen(false)}>
                    <div className="bg-indigo-950 backdrop-blur-md rounded-lg p-6 w-80 text-center" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-lg font-semibold mb-2">¿Desea cerrar sesión?</h2>
                        <h3 className="pb-6">¿Realmente desea cerrar sesión?</h3>
                        <div className="flex justify-around">
                            <button
                                onClick={HandleLogout}
                                className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cerrar Sesión
                            </button>
                            <button
                                onClick={() => SetModalOpen(false)}
                                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}