import { useEffect, useState } from "react";
import { getDocuments } from "../../services/authService";

interface DocumentItem {
  id: number;
  filename: string;
  date: string;
  status: string;
}

interface DocumentsTableProps {
  searchTerm?: string;
}

const DocumentsTable = ({ searchTerm }: DocumentsTableProps) => {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getDocuments();
        setDocs(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error inesperado";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Aprobado": return "bg-green-600";
        case "Rechazado": return "bg-red-600";
        case "Pendiente": return "bg-yellow-600";
        default: return "bg-gray-600";
      }
    };

    const term = (searchTerm || "").toLowerCase();
    const filteredDocs = docs.filter((doc) =>
      doc.filename.toLowerCase().includes(term)
    );
  
    if (loading) return <p className="text-gray-400">Cargando documentos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  
    return (
      <div className="bg-[#1A193D] rounded-xl p-6 overflow-x-auto">
        <table className="min-w-[800px] w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="pb-3 px-2">Nombre</th>
              <th className="pb-3 px-2">Fecha</th>
              <th className="pb-3 px-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-700">
                <td className="py-3 pr-2">{doc.filename}</td>
                <td className="pr-2">{doc.date}</td>
                <td>
                  <span
                    className={`px-4 py-1 rounded-full text-sm ${getStatusColor(
                      doc.status
                    )}`}
                  >
                    {doc.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredDocs.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="text-center text-gray-400 py-4 italic"
                >
                  No se encontraron documentos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default DocumentsTable;
