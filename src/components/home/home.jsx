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
        "https://nolinskiparis.com/wp-content/uploads/2022/06/restaurant-nolinski-paris-5-etoiles-luxe-12-guillaume-de-laubier.jpg",
      bookmarks: false,
    },
    {
      id: "hotel",
      displayName: {
        text: "Hôtels",
      },
      imageUrl:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/184305239.jpg?k=2d22fe63ae1f8960e057238c98fb436f7bd9f65854e3a5e918607c5cfa1d0a52&o=&hp=1",
      bookmarks: false,
    },
    {
      id: "museum",
      displayName: {
        text: "Musées",
      },
      imageUrl:
        "https://www.wien.info/resource/image/296568/3x2/894/596/c84661c3e062eefb6ae724bed2c0de56/475D53C1018447DEFE10732BC2D9A715/dom-museum-wien-2017-ausstellungsansicht.webp",
      bookmarks: false,
    },
    {
      id: "national_park",
      displayName: {
        text: "Parcs",
      },
      imageUrl:
        "https://metropole.toulouse.fr/sites/toulouse-fr/files/styles/paragraphe_image/public/2022-09/bandeau_jardin_royal.jpg.webp?itok=Sqc8rOi1",
      bookmarks: false,
    },
    {
      id: "movie_theater",
      displayName: {
        text: "Cinémas",
      },
      imageUrl:
        "https://media.gqmagazine.fr/photos/603e6a8da9360b0585bcbc6a/16:9/w_2560%2Cc_limit/108387402",
      bookmarks: false,
    },
    {
      id: "store",
      displayName: {
        text: "Boutiques",
      },
      imageUrl:
        "https://eggo-agencement.fr/wp-content/uploads/2023/07/boutique-vetements-clair-eggo.jpg",
      bookmarks: false,
    },
    {
      id: "gym",
      displayName: {
        text: "Salles de sport",
      },
      imageUrl:
        "https://www.pariscountryclub.com/wp-content/uploads/2022/12/pcc-actus-debuter-salle-sport.jpg",
      bookmarks: false,
    },
    {
      id: "gas_station",
      displayName: {
        text: "Stations essence",
      },
      imageUrl:
        "https://www.lagazettedescommunes.com/wp-content/uploads/Station_service_lambda_Fotolia.jpg",
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
