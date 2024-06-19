import React, { useState, useEffect } from "react";
import { Micro } from "../../assets/icon/Icon";

const SpeechRecognition = ({ onInterimResult }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error(
        "Votre navigateur ne supporte pas l'API Web Speech Recognition."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "fr-FR"; // Changez la langue si nécessaire

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Reconnaissance vocale démarrée. Parlez maintenant.");
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Reconnaissance vocale arrêtée.");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (!event.results[i].isFinal) {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      if (onInterimResult) {
        onInterimResult(interimTranscript);
      }
      console.log("Interim result:", interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Erreur de reconnaissance vocale : " + event.error);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, onInterimResult]);

  const handleButtonClick = () => {
    setIsListening((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        <Micro /> {/* Votre icône Micro */}
        {isListening
          ? " Arrêter la reconnaissance"
          : " Démarrer la reconnaissance"}
      </button>
    </div>
  );
};

export default SpeechRecognition;
