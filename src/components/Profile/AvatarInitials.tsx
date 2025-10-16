interface Props {
  name: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
}

const AvatarInitials = ({ name, size = 64, bgColor = "#0ea5ff", textColor = "#ffffff" }:Props) => {
  // Función para obtener las iniciales a partir del nombre completo
  const getInitials = (fullName:string) => {
    if (!fullName) return "NA"; // Iniciales genéricas si no hay nombre
    const namesArray = fullName.trim().split(" ");
    if (namesArray.length === 1) {
      return namesArray[0].charAt(0).toUpperCase();
    } else {
      return (
        namesArray[0].charAt(0).toUpperCase() +
        namesArray[namesArray.length - 1].charAt(0).toUpperCase()
      );
    }
  };

  const initials = getInitials(name);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: bgColor,
        color: textColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontFamily: "'Poppins', sans-serif",
        fontSize: size / 2, // tamaño proporcional de la fuente
        boxShadow: "0 0 10px rgba(14, 165, 255, 0.5)", // brillo sutil
        userSelect: "none",
      }}
      aria-label={`Avatar de ${name}`}
    >
      {initials}
    </div>
  );
};

export default AvatarInitials;
