import Cards from "../components/Dashboard/Cards";
import DocumentsTable from "../components/Dashboard/DocumentsTables";
import Header from "../components/Dashboard/Header";
import { Sidebar } from "../components/Dashboard/Sidebar";



const Dashboard = () => {
    return (
      <div className="flex flex-col overflow-x-hidden md:flex-rowmin-h-screen bg-gradient-to-br from-[#0B0F19] via-[#1E1B4B] to-[#111827] text-gray-100">
        <Sidebar />
        <main className="flex-1  p-6 md:p-8 ml-0 overflow-y-auto">
          <Header />
          <Cards />
          <DocumentsTable />
        </main>
      </div>
    );
  };
export default Dashboard;