import HeaderProfile from "../components/Profile/HeaderProfile";
import SidebarProfile from "../components/Profile/SidebarProfile";

export default function Profile() {
  return (
    <div className="flex flex-col overflow-x-hidden md:flex-rowmin-h-screen bg-gray-500/20 rounded-4xl text-gray-100">
        <SidebarProfile />
        <main className="p-6 md:p-8 overflow-y-auto">
          <HeaderProfile />
        </main>
      </div>
  )
}
