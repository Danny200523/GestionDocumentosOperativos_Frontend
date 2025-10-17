import { useState } from "react";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

const UploadDocumentPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("⚠️ Selecciona un archivo PDF primero");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ No hay sesión activa");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("📤 Subiendo archivo...");

      const res = await fetch(`${API_BASE}/upload/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Error al subir el archivo");
      }

      const data = await res.json();
      console.log("Respuesta del backend:", data);
      setMessage(`✅ ${data.message} (${data.filename})`);
      setFile(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setMessage(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white p-4">
      <Link to="/Dasboard">
        <RiArrowDropLeftLine className="text-4xl cursor-pointer hover:text-sky-400" />
      </Link>
      <div className="flex items-center justify-center mt-10">
        <div className="bg-[#1A193D] p-8 rounded-2xl max-w-xl w-full shadow-xl">
          <div className="text-center mb-6">
            <div className="bg-sky-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-sky-400">Subir Documento PDF</h2>
            <p className="text-gray-400 text-sm mt-2">Selecciona un archivo para subir</p>
          </div>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              
              <label 
                htmlFor="file-input"
                className="block border-2 border-dashed border-gray-600 hover:border-sky-500 rounded-xl p-8 text-center cursor-pointer bg-[#2A275E]/50 transition"
              >
                <svg className="w-10 h-10 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                
                {file ? (
                  <div>
                    <p className="text-sky-400 font-semibold">{file.name}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-400">Haz clic para seleccionar un PDF</p>
                    <p className="text-gray-500 text-sm mt-1">o arrastra y suelta aquí</p>
                  </div>
                )}
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                loading 
                  ? "bg-gray-600 cursor-not-allowed" 
                  : "bg-sky-600 hover:bg-sky-500"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Subir Documento
                </>
              )}
            </button>
          </form>
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              message.includes('❌') || message.includes('⚠️')
                ? 'bg-red-500/20 text-red-300'
                : message.includes('✅')
                ? 'bg-green-500/20 text-green-300'
                : 'bg-blue-500/20 text-blue-300'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentPage;