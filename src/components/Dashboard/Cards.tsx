import { useEffect, useState } from "react";
import { getDocuments } from "../../services/authService";

const Cards = () => {
  const [totalDocs, setTotalDocs] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadDocuments() {
      try {
        const data = await getDocuments();
        setTotalDocs(data.length); 
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);
  return (
    <div className="w-full my-8 text-center">
      <div className="bg-[#1A193D] p-6 rounded-xl shadow-md hover:shadow-sky-500/20 transition">
        <h3 className="text-sm text-gray-400">Documentos</h3>
        <p className="text-3xl font-bold text-sky-400">
          {loading ? "..." : totalDocs ?? 0}
        </p>
      </div>
    </div>
  );
};

export default Cards;