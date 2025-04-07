import React from "react";

export const LocalUser = ({ name, description, phone, img }) => {
  const avatarUrl = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${name.split(' ')[0]}`;

  return (
    <div
      style={{
        display: "inline-flex", // Inline-flex pour que le bloc soit insécable et pousse les autres éléments
        alignItems: "center",
        gap: "1rem",
        padding: "0.5rem",
        border: "1px",
        borderRadius: "80px",
        maxWidth: "100%", // S'adapte au conteneur parent
        width: "fit-content", // S'adapte au contenu
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        whiteSpace: "nowrap", // Empêche les sauts de ligne dans le contenu
        overflow: "hidden", // Évite le débordement si nécessaire
        textOverflow: "ellipsis", // Ajoute "..." si le texte déborde
      }}
    >
      {/* Avatar */}
      <img
        src={img ? img : avatarUrl}
        alt={`${name}'s avatar`}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #ddd",
        }}
      />
      {/* User Details */}
      <div
        style={{
          flex: 1,
          overflow: "hidden", // Empêche les détails utilisateur de déborder
          textOverflow: "ellipsis", // Ajoute "..." si le texte dépasse
        }}
      >
        <p
          style={{
            margin: "0.2rem 0.5rem 0 0",
            fontWeight: "bold",
            fontSize: "1rem",
            overflow: "hidden", // Garde le texte dans les limites
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </p>
        <p
          style={{
            margin: "0",
            color: "#666",
            fontSize: "0.9rem",
            whiteSpace: "pre-line", // Permet les retours à la ligne dans le texte
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
          {phone && `\n${phone}`}
        </p>
      </div>
    </div>
  );
};
