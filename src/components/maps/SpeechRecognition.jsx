import React, { useState, useEffect, useRef } from "react";

const SpeechRecognition = (props) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isMicrophoneAccessible, setIsMicrophoneAccessible] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);

  useEffect(() => {
    // Vérifiez si l'API Web Speech Recognition est disponible
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error(
        "Votre navigateur ne supporte pas l'API Web Speech Recognition."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
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
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + event.results[i][0].transcript + " ");
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
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
  }, [isListening]);

  useEffect(() => {
    // Fonction pour vérifier l'accès au microphone et surveiller les niveaux audio
    const getMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setIsMicrophoneAccessible(true);

        // Créez un contexte audio et un analyseur
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        // Sauvegardez les références pour arrêter l'audio plus tard
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        microphoneRef.current = stream;

        // Fonction pour obtenir les niveaux audio
        const getAudioLevels = () => {
          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(dataArray);
          const maxLevel = Math.max(...dataArray);
          setAudioLevel(maxLevel);
        };

        // Surveillez les niveaux audio à intervalle régulier
        const interval = setInterval(getAudioLevels, 100);
        return () => clearInterval(interval);
      } catch (err) {
        console.error("Erreur d'accès au microphone : ", err);
        setIsMicrophoneAccessible(false);
      }
    };

    getMicrophoneAccess();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (microphoneRef.current) {
        microphoneRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleButtonClick = () => {
    setIsListening((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        {isListening
          ? "Arrêter la reconnaissance"
          : "Démarrer la reconnaissance"}
      </button>
      <div>
        <h2>Transcription</h2>
        <p>{transcript}</p>
      </div>
      <div>
        <h2>État du microphone</h2>
        <p>
          {isMicrophoneAccessible
            ? "Microphone accessible"
            : "Microphone non accessible"}
        </p>
      </div>
      <div>
        <h2>Niveau audio</h2>
        <p>{audioLevel}</p>
      </div>
    </div>
  );
};

export default SpeechRecognition;
