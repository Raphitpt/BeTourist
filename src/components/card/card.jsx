import React from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import zIndex from "@mui/material/styles/zIndex";
import { Bookmarks, Restaurant } from "../../assets/icon/Icon";

const Card = (data) => {
  const navigate = useNavigate(); // Utiliser useNavigate pour la navigation

  const handleClick = () => {
    // Définir l'URL de la page vers laquelle vous voulez naviguer
    const targetUrl = `/page/${data.data.id}`; // Exemple : `/page/123`
    navigate(targetUrl, { state: data.data });
  };

  return (
    <div className="card" style={styles.card} onClick={handleClick}>
      <div
        className="card-background"
        style={{
          ...styles.cardBackground,
          backgroundImage: `url(${data.data.imageUrl})`,
        }}
      ></div>
      <div className="card-overlay" style={styles.cardOverlay}></div>
      <div style={styles.cardTop}>
        {data.data.bookmarks && <Bookmarks fill="#FFF" />}
      </div>
      <div style={styles.cardBottom}>
        <h2 style={styles.cardText}>
          {data.data.displayName.text || "Hôtel de Ville"}
        </h2>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#cecece",
    height: "158px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  cardBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  },
  cardOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    zIndex: 1,
  },
  cardText: {
    color: "#FFF",
    fontSize: "1.2rem",
    fontWeight: "600",
    fontFamily: "SFProDisplay",
    margin: 0,
  },
  cardBottom: {
    position: "relative",
  },
};

export default Card;
