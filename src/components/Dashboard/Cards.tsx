const Cards = () => {
    const data = [
      { title: "Documentos", value: 74 },
      { title: "Aprobados", value: 231 },
      { title: "Rechazados", value: 102 },
      { title: "Pendientes", value: 11 },
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-4 md:gap-6 my-8">
        {data.map((item) => (
          <div
            key={item.title}
            className="bg-[#1A193D] p-6 rounded-xl shadow-md hover:shadow-sky-500/20 transition"
          >
            <h3 className="text-sm text-gray-400">{item.title}</h3>
            <p className="text-3xl font-bold text-sky-400">{item.value}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Cards;