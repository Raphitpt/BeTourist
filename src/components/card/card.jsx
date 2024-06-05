import { Bookmarks, Restaurant } from "../../assets/icon/Icon";

const Card = ({ title, description }) => {
  return (
    <div className="card" style={styles.card}>
      <div style={styles.cardTop}>
        <Restaurant fill="#FFF" width="25" height="25" />
        <Bookmarks fill="#FFF" />
      </div>
      <div style={styles.cardBottom}>
        <h2 style={styles.cardText}>{title || "Hotêl de Ville"}</h2>
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
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  cardText: {
    color: "#FFF",
    fontSize: "1.2rem",
    fontWeight: "600",
    fontFamily: "SFProDisplay",
    margin: 0,
  },
};
export default Card;
