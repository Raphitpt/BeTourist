import React, { useState, useEffect } from "react";
import { Location } from "../../assets/icon/Icon";
import { geocode, setDefaults, RequestType } from "react-geocode";

export default function Top({ locality }) {
  const [locations, setLocations] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let watchId;

    const appendLocation = (location, verb = "updated") => {
      const newLocation = {
        verb,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocations((prevLocations) => [...prevLocations, newLocation]);
    };

    const successHandler = (location) => {
      appendLocation(location, "fetched");
      setShowPopup(false);
    };

    const errorHandler = (err) => {
      setError(err.message);
      setShowPopup(true);
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
      watchId = navigator.geolocation.watchPosition(
        successHandler,
        errorHandler
      );
    } else {
      setError("Geolocation API not supported.");
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      setDefaults({
        key: import.meta.env.VITE_GOOGLE_PLACES_API_KEY || process.env.VITE_GOOGLE_PLACES_API_KEY,
        language: "fr",
        region: "fr",
      });

      const lat = locations[locations.length - 1].latitude.toString();
      const lng = locations[locations.length - 1].longitude.toString();

      geocode(RequestType.LATLNG, `${lat},${lng}`, {
        result_type: "locality",
      })
        .then(({ results }) => {
          if (results.length > 0 && results[0].address_components.length > 1) {
            setCity(results[0].address_components[0].long_name);
            locality(results[0].address_components[0].long_name);
          } else {
            setError("Unable to fetch city name.");
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Failed to fetch city name.");
        });
    }
  }, [locations]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!locations.length) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.header}>
      {showPopup && (
        <div style={styles.popup}>
          <p>
            La géolocalisation est désactivée. Veuillez l'activer pour afficher
            votre emplacement.
          </p>
        </div>
      )}
      <div style={styles.header__left}>
        <Location />
        <h1 style={styles.header__content}>{city || "Impossible"}</h1>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  header__left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  header__right: {},
  header__content: {
    fontFamily: "SFProDisplay",
    fontWeight: "700",
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
