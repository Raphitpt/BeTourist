import React from "react";
import { Location } from "../../assets/icon/Icon";

const Top = ({ city }) => {
  return (
    <div style={styles.header}>
      <div style={styles.header__left}>
        <Location />
        <h1 style={styles.header__content}>{city || "Impossible"}</h1>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    maxWidth: 1000,
    margin: "0 auto",
  },
  header__left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  header__right: {},
  header__content: {
    fontFamily: "SFProDisplay",
    fontWeight: 700,
    fontSize: "2rem",
    color: "#00AF87",
  },
  popup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#ffffff",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    zIndex: "999",
  },
};

export default Top;
