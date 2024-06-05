import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Loupe, Micro } from "../../assets/icon/Icon";
import Card from "../card/card";

const fetchTripadvisorData = async (searchTerm) => {
  const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=9BBAD07536B447B8B46F629DB4DEE13F&searchQuery=${encodeURIComponent(
    searchTerm
  )}&language=en`;
  const options = { method: "GET", headers: { accept: "application/json" } };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("Angoulême");
  const [tripadvisorData, setTripadvisorData] = useState({});
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

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

  useEffect(() => {
    setSearchTerm(transcript);
  }, [transcript]);

  useEffect(() => {
    if (searchTerm) {
      fetchTripadvisorData(searchTerm).then((data) => setTripadvisorData(data));
    }
  }, [searchTerm]);

  return (
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
      <div style={styles.cardGrid}>
        {tripadvisorData.data ? (
          tripadvisorData.data.map((item) => (
            <Card key={item.location_id} data={item} />
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "90%",
    margin: "0 auto",
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
