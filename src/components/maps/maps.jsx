import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import { Loupe, Micro } from "../../assets/icon/Icon";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFwaGl0aXRpIiwiYSI6ImNsZ3k0andyMDA1enEzZW05YjhtbnMzYXUifQ.kG7eG6VUDiHTfAbqGA74lg"; // Replace with your Mapbox token

const Maps = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState({
    latitude: 45.65,
    longitude: 0.15,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const geocoderRef = useRef(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/raphititi/clx1tr61a01rg01qs3ycedsti",
      center: [userLocation.longitude, userLocation.latitude],
      zoom: 13,
    });

    mapRef.current = map;

    // Add geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      fitBoundsOptions: {
        linear: false,
      },
      trackUserLocation: false,
    });
    map.addControl(geolocate);

    // Add search control
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: "Rechercher un lieu",
      countries: "fr", // Limite la recherche à la France
      types: "poi", // Définition correcte avec un tableau de chaînes de caractères
    });
    document.getElementById("searchInput").appendChild(geocoder.onAdd(map));

    // Handle search result selection
    geocoder.on("result", async (e) => {
      const coordinates = e.result.geometry.coordinates;
      map.flyTo({
        center: coordinates,
        essential: true, // Ensures a smooth animation
        zoom: 15, // You can adjust the zoom level as needed
      });
    });

    // Trigger geolocation after adding geolocate control to map
    geolocate.trigger();

    // Clean up on unmount
    return () => map.remove();
  }, [MAPBOX_TOKEN, userLocation]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMicroClick = () => {
    resetTranscript();
    SpeechRecognition.startListening({ language: "fr-FR" });
  };

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

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "5px 10px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Loupe fill="#00AF87" />
        <input
          id="searchInput"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          style={{
            border: "none",
            outline: "none",
            marginLeft: "10px",
            width: "200px",
          }}
          placeholder="Rechercher"
        />
        <Micro
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onClick={handleMicroClick}
          fill="#00AF87"
        />
      </div>
      {listening && (
        <div
          style={{
            color: "green",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Écoute en cours...
        </div>
      )}
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "calc(100vh - 80px)" }}
      />
    </>
  );
};

export default Maps;
