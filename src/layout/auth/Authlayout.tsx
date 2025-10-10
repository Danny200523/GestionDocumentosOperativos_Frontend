import { Outlet } from "react-router-dom";


export const Authlayout = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0F19] via-[#1E1B4B] to-[#111827]'>
      <Outlet />
    </div>
  )
}
