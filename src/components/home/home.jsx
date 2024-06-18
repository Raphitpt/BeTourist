import React, { useEffect, useState } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Card from "../card/card";
import Top from "./top";
import { usePlacesWidget } from "react-google-autocomplete";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locality, setLocality] = useState("");

  const { ref } = usePlacesWidget({
    apiKey:
      import.meta.env.VITE_GOOGLE_PLACES_API_KEY ||
      process.env.VITE_GOOGLE_PLACES_API_KEY,
    onPlaceSelected: (place) => {
      handleLocation(place.formatted_address); // Update the locality based on the selected place
    },
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "fr" },
    },
  });

  function handleLocation(data) {
    setLocality(data); // Update the locality state with the selected place's formatted address
  }
  const data = [
    {
      id: "restaurant",
      displayName: {
        text: `Restaurants`,
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

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
        <Top locality={handleLocation} />
        <p style={styles.description}>
          Voici les recommandations aux alentours de {locality}
        </p>
        <div style={styles.cardGrid} className="home__gridcard">
          {data.map((place) => (
            <Card key={place.id} data={place} />
          ))}
        </div>
      </div>
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
};

export default Home;
