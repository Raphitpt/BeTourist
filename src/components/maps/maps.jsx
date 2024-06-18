import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Loupe, Micro } from "../../assets/icon/Icon";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFwaGl0aXRpIiwiYSI6ImNsZ3k0andyMDA1enEzZW05YjhtbnMzYXUifQ.kG7eG6VUDiHTfAbqGA74lg";

const Maps = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const geocoderRef = useRef(null);
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    mapRef.current = map;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Rechercher un lieu...",
      marker: {
        color: "orange",
      },
    });

    map.addControl(geocoder);
    geocoderRef.current = geocoder;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "fr-FR";

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log("Transcript:", transcript); // Afficher le transcript dans la console
      setCurrentQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (isListening) {
      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  useEffect(() => {
    if (geocoderRef.current && currentQuery) {
      geocoderRef.current.setInput(currentQuery);
    }
  }, [currentQuery]);

  const handleMicroClick = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setCurrentQuery("");
    }
  };

  return (
    <>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "calc(100vh - 80px)" }}
      />
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <button onClick={handleMicroClick}>
          {isListening ? "Stop" : "Start"} Listening
        </button>
      </div>
    </>
  );
};

export default Maps;
