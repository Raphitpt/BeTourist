import React, { useEffect, useState } from "react";
import { geocode, setDefaults, RequestType } from "react-geocode";

import Card from "../card/card";
import Top from "./top";

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Define searchTerm state
  const data = [
    {
      id: "restaurant",
      displayName: {
        text: "Restaurants",
      },
      imageUrl:
        "/assets/image/restaurant-nolinski-paris-5-etoiles-luxe-12-guillaume-de-laubier.webp",
      bookmarks: false,
    },
    {
      id: "hotel",
      displayName: {
        text: "Hôtels",
      },
      imageUrl: "/assets/image/184305239.webp",
      bookmarks: false,
    },
    {
      id: "museum",
      displayName: {
        text: "Musées",
      },
      imageUrl: "/assets/image/dom-museum-wien-2017-ausstellungsansicht.webp",
      bookmarks: false,
    },
    {
      id: "park",
      displayName: {
        text: "Parcs",
      },
      imageUrl: "/assets/image/bandeau_jardin_royal.jpg.webp",
      bookmarks: false,
    },
    {
      id: "movie_theater",
      displayName: {
        text: "Cinémas",
      },
      imageUrl: "/assets/image/9_w_2560%2Cc_limit_108387402.webp",
      bookmarks: false,
    },
    {
      id: "store",
      displayName: {
        text: "Boutiques",
      },
      imageUrl: "/assets/image/boutique-vetements-clair-eggo.webp",
      bookmarks: false,
    },
    {
      id: "gym",
      displayName: {
        text: "Salles de sport",
      },
      imageUrl: "/assets/image/pcc-actus-debuter-salle-sport.webp",
      bookmarks: false,
    },
    {
      id: "gas_station",
      displayName: {
        text: "Stations essence",
      },
      imageUrl: "/assets/image/Station_service_lambda_Fotolia.webp",
      bookmarks: false,
    },
  ];

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
        key:
          import.meta.env.VITE_GOOGLE_PLACES_API_KEY ||
          process.env.VITE_GOOGLE_PLACES_API_KEY,
        language: "fr",
        region: "fr",
      });

      if (locations.length > 0) {
        const lat = locations[locations.length - 1].latitude.toString();
        const lng = locations[locations.length - 1].longitude.toString();

        geocode(RequestType.LATLNG, `${lat},${lng}`, {
          result_type: "locality",
        })
          .then(({ results }) => {
            if (
              results.length > 0 &&
              results[0].address_components.length > 1
            ) {
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
    }
  }, [locations]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!locations.length) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={styles.backgroundContainer}>
      <div style={styles.top}>
        <h1 style={styles.title}>BeTourist</h1>
        <h2>
          La première application utile pour le tourisme, après{" "}
          <b>GoogleMaps</b>, <b>Tripadvisor</b>, <b>Booking</b> ....
        </h2>
      </div>

      <div style={styles.container}>
        <p style={styles.advisor}>
          Pour plus de praticité, l'application est optimisée pour les mobiles.
        </p>
        <Top city={city} />
        <p style={styles.description}>
          Voici les recommandations aux alentours de {city}
        </p>
        <div style={styles.cardGrid} className="home__gridcard">
          {data.map((place) => (
            <Card
              key={place.id}
              data={place}
              lat={locations[locations.length - 1].latitude}
              lng={locations[locations.length - 1].longitude}
            />
          ))}
        </div>
      </div>
      {showPopup && (
        <div style={styles.popup}>
          <p>
            La géolocalisation est désactivée. Veuillez l'activer pour afficher
            votre emplacement.
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  backgroundContainer: {
    backgroundColor: "#faf9f7",
  },
  top: {
    width: "90%",
    margin: "0 auto",
    maxWidth: 1000,
    marginBlock: "2rem",
  },
  title: {
    fontFamily: "SFProDisplay",
    fontWeight: 700,
    fontSize: "3rem",
    color: "#00AF87",
  },
  container: {
    width: "90%",
    margin: "0 auto",
    marginBottom: "6rem",
    maxWidth: 1000,
    // minWidth: 360,
  },
  cardGrid: {
    padding: "10px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "17px",
  },
  description: {
    color: "#373737",
    fontFamily: "SFProDisplay",
    textAlign: "center",
    fontWeight: 600,
  },
  advisor: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: "1rem",
    fontFamily: "SFProDisplay",
    marginBottom: 10,
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    zIndex: 9999,
  },
};

export default Home;
