import React, { useEffect, useState } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Loupe, Micro } from "../../assets/icon/Icon";
import Card from "../card/card";
import Top from "./top";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locality, setLocality] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  function handleLocation(data) {
    setLocality(data);
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

  if (!browserSupportsSpeechRecognition) {
    return (
      <span>
        La reconnaissance vocale n'est pas prise en charge par ce navigateur.
      </span>
    );
  }

  if (!isMicrophoneAvailable) {
    return (
      <span>
        Microphone non disponible. Veuillez vérifier vos paramètres de
        microphone.
      </span>
    );
  }

  const handleMicroClick = () => {
    resetTranscript();
    SpeechRecognition.startListening({ language: "fr-FR" });
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Top locality={handleLocation} />
      <div style={styles.container}>
        <div style={styles.search}>
          <Loupe />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            style={styles.searchInput}
            placeholder="Rechercher"
          />
          <Micro style={styles.micro} onClick={handleMicroClick} />
        </div>
        {listening && <div style={styles.listening}>Écoute en cours...</div>}
        <p>Recommendations aux alentours de {locality}</p>
        <div style={styles.cardGrid}>
          {data.map((place) => (
            <Card key={place.id} data={place} />
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    width: "90%",
    margin: "0 auto",
    marginBottom: "6rem",
  },
  search: {
    margin: "0 auto",
    display: "flex",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    alignItems: "center",
    gap: "10px",
    marginBottom: "2rem",
  },
  searchInput: {
    border: "none",
    outline: "none",
    color: "#252525",
    fontFamily: "SFProDisplay",
    fontWeight: "600",
  },
  micro: {
    marginLeft: "auto",
    cursor: "pointer",
  },
  listening: {
    color: "green",
    textAlign: "center",
    marginTop: "10px",
  },
  cardGrid: {
    padding: "10px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "17px",
  },
};

export default Home;
