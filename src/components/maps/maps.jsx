import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapModal from "./MapModal";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFwaGl0aXRpIiwiYSI6ImNsZ3k0andyMDA1enEzZW05YjhtbnMzYXUifQ.kG7eG6VUDiHTfAbqGA74lg"; // Remplacez par votre token Mapbox

const Maps = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState({
    latitude: 45.65,
    longitude: 0.15,
  }); // Default location
  const [featureName, setFeatureName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/raphititi/clx1tr61a01rg01qs3ycedsti",
      center: [userLocation.longitude, userLocation.latitude],
      zoom: 13,
    });

    mapRef.current = map;

    map.on("load", () => {
      console.log("Map loaded");

      map.on("click", (e) => {
        console.log("Map clicked at", e.lngLat);

        const features = map.queryRenderedFeatures(e.point, {
          layers: ["poi-label"],
        });

        console.log("Features found:", features);

        if (features.length > 0) {
          const feature = features[0];
          setFeatureName(feature.properties.name || "No name available");
          setIsModalOpen(true);
        }
      });

      // Scroll event listener
      window.addEventListener("scroll", handleScroll);
    });

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          map.setCenter([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }

    // Clean up on unmount
    return () => {
      map.remove();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight - (scrollY + windowHeight) < 50) {
      // Adjust this threshold as needed
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "calc(100vh - 80px)" }}
      />
      <MapModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        featureName={featureName}
      />
    </>
  );
};

export default Maps;
