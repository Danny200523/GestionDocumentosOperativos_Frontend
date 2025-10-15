import DocumentsTable from "../Dashboard/DocumentsTables";
import Header from "../Dashboard/Header";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const DocumentsTables = () => {
    return (
      <div className="flex flex-col overflow-x-hidden md:flex-rowmin-h-screen bg-gradient-to-br from-[#0B0F19] via-[#1E1B4B] to-[#111827] text-gray-100">
        <div>
            <Link to={"/Dasboard "}><RiArrowDropLeftLine  className="text-4xl mt-6 ml-6 cursor-pointer text-white hover:text-sky-400 inline-block"/></Link>
        </div>
        <main className="flex-1 p-6 md:p-8 ml-0 overflow-y-auto">
          <Header />
          <DocumentsTable />
        </main>
      </div>
    );
  };
export default DocumentsTables;