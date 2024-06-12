import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFwaGl0aXRpIiwiYSI6ImNsZ3k0andyMDA1enEzZW05YjhtbnMzYXUifQ.kG7eG6VUDiHTfAbqGA74lg"; // Remplacez par votre token Mapbox
const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_PLACES_API_KEY ||
  process.env.VITE_GOOGLE_PLACES_API_KEY; // Remplacez par votre clé API Google Maps

const Maps = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState({
    latitude: 45.65,
    longitude: 0.15,
  }); // Default location
  const [selectedPlace, setSelectedPlace] = useState(null);
  let navigate = useNavigate();

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

      map.on("click", async (e) => {
        console.log("Map clicked at", e.lngLat);

        const features = map.queryRenderedFeatures(e.point, {
          layers: ["poi-label"],
        });

        console.log("Features found:", features);

        if (features.length > 0) {
          const feature = features[0];
          setSelectedPlace(feature);
          // const placeData = await fetchPlaceData(
          //   feature.geometry.coordinates,
          //   feature.properties.name
          // );
          navigate(`/place/12`);
        }
      });
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
    return () => map.remove();
  }, []);

  const fetchPlaceData = async (coordinates, name) => {
    try {
      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
          },
          body: JSON.stringify({
            textQuery: name,
            locationBias: {
              circle: {
                center: {
                  latitude: coordinates[1],
                  longitude: coordinates[0],
                },
                radius: 500.0,
              },
            },
          }),
        }
      );
      const data = await response.json();
      if (data && data.places && data.places.length > 0) {
        // Dans cet exemple, nous renvoyons simplement le premier résultat
        return data.places[0];
      }
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
    return null;
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "calc(100vh - 80px)" }}
      />
    </>
  );
};

export default Maps;
