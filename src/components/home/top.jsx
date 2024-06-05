import React, { useState, useEffect } from "react";
import { Location } from "../../assets/icon/Icon";
import { geocode, setDefaults, RequestType } from "react-geocode";

export default function Top() {
  const [locations, setLocations] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

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

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => appendLocation(location, "fetched"),
        (err) => setError(err.message)
      );
      watchId = navigator.geolocation.watchPosition(
        (location) => appendLocation(location),
        (err) => setError(err.message)
      );
    } else {
      setError("Geolocation API not supported.");
    }

    // Cleanup the watchPosition on component unmount
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      setDefaults({
        key: "AIzaSyDl1lhnrUdghkWhrlBHo9yf9_4sNKuc9Jg",
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
};