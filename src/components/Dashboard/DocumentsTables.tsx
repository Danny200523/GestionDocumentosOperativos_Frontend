import { useEffect, useState } from "react";

interface DocumentItem {
  id: number;
  filename: string;
  date: string;
  status: string;
}

const DocumentsTable = () => {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token"); // si usas JWT
        const res = await fetch("http://localhost:8000/documents/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error al cargar los documentos");
        }

        const data: DocumentItem[] = await res.json();
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
  
    if (loading) return <p className="text-gray-400">Cargando documentos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  
    return (
      <div className="bg-[#1A193D] rounded-xl p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-sky-400">Documentos</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="pb-3 px-2">Nombre</th>
              <th className="pb-3 px-2">Fecha</th>
              <th className="pb-3 px-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-700">
                <td className="py-3 pr-2">{doc.filename}</td>
                <td className="pr-2">{doc.date}</td>
                <td>
                  <span className={`px-4 py-1 rounded-full text-sm ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default DocumentsTable;
