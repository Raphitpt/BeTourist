import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReturnArrow } from "../../assets/icon/Icon";

const DetailCard = () => {
  const { state } = useLocation();
  const card = state;

  //   const fetchPlaces = async (query) => {
  //     const url = `https://places.googleapis.com/v1/places:searchNearby`;
  //     const dataQuery = {
  //       includedPrimaryTypes: ["restaurant"],
  //       maxResultCount: 10,
  //       locationRestriction: {
  //         circle: {
  //           center: {
  //             latitude: 45.648186,
  //             longitude: 0.139799,
  //           },
  //           radius: 10000,
  //         },
  //       },
  //       rankPreference: "POPULARITY",
  //       excludedTypes: ["fast_food_restaurant"],
  //     };
  //     const headers = {
  //       "Content-Type": "application/json",
  //       "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
  //       "X-Goog-FieldMask": "places.displayName,places.photos",
  //     };
  //     try {
  //       const response = await axios.post(url, dataQuery, { headers });
  //       const data = response.data.places;
  //       setPlaces(data || []);
  //       console.log("Places data:", places);
  //     } catch (error) {
  //       console.error("Error fetching places data:", error);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchPlaces(searchTerm);
  //   }, [searchTerm]);

  //   useEffect(() => {
  //     setSearchTerm(transcript);
  //   }, [transcript]);
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="card" style={styles.container}>
      <div style={styles.topBackground}>
        <div style={styles.imageContainer}>
          <img src={card.imageUrl} alt="Card" style={styles.image} />
        </div>
        <div style={styles.topContent}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={styles.topArrow}>
              <ReturnArrow stroke="#fff" onPress={handleBack} />
            </div>
            <h1 style={{ margin: "0 auto", textAlign: "center" }}>
              {card.displayName.text}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <div style={styles.card}>
          <h2>{card.displayName.text}</h2>
        </div>
        <div style={styles.card}>
          <h2>{card.displayName.text}</h2>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FAF9F7",
  },
  topBackground: {
    height: "200px",
    position: "relative",
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    filter: "brightness(50%)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  topContent: {
    position: "absolute",
    top: "30px",
    left: "0",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    color: "#FFF",
    padding: "10px", // Espacement entre le haut de l'image et le contenu
  },
  topArrow: {
    position: "absolute",
    left: "10px", // Placer la flèche à gauche
  },
  card: {
    padding: "10px",
    width: "90%",
    margin: "20px auto",
    backgroundColor: "#FFF",
    borderRadius: "16px",
  },
};
export default DetailCard;
