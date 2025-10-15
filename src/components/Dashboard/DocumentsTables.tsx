const DocumentsTable = () => {
    const docs = [
      { name: "Reporte de ventas", date: "09/01/2022", status: "Aprobado" },
      { name: "Plan de negocios", date: "13/01/2022", status: "Rechazado" },
      { name: "Manual de usuario", date: "10/01/2022", status: "Pendiente" },
      { name: "Manual de usuario", date: "10/01/2022", status: "Rechazado" },
      { name: "Manual de usuario", date: "10/01/2022", status: "Pendiente" },
      { name: "Manual de usuario", date: "10/01/2022", status: "Aprobado" },
      { name: "Manual de usuario", date: "10/01/2022", status: "Pendiente" },
      { name: "Manual de usuario", date: "10/01/2022", status: "Rechazado" },
      { name: "Manual de usuario", date: "10/01/2022", status: "Aprobado" },
      { name: "Manual de usuario", date: "10/01/2022", status: "Pendiente" },
      { name: "Manual de usuario", date: "10/01/2022", status: "Aprobado" },
    ];
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Aprobado": return "bg-green-600";
        case "Rechazado": return "bg-red-600";
        case "Pendiente": return "bg-yellow-600";
        default: return "bg-gray-600";
      }
    };
  
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
              <tr key={doc.name} className="border-b border-gray-700">
                <td className="py-3 pr-2">{doc.name}</td>
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