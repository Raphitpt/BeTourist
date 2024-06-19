import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Loupe, Micro } from "../../assets/icon/Icon";
import SpeechRecognition from "./SpeechRecognition";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFwaGl0aXRpIiwiYSI6ImNsZ3k0andyMDA1enEzZW05YjhtbnMzYXUifQ.kG7eG6VUDiHTfAbqGA74lg";

const Maps = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const geocoderRef = useRef(null);
  const [currentQuery, setCurrentQuery] = useState("");

  const geolocateUser = (map) => {
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
    map.on("load", function () {
      geolocate.trigger();
    });
    geolocate.on("geolocate", function (e) {
      map.flyTo({
        zoom: 15,
        center: [e.coords.longitude, e.coords.latitude],
      });
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0.15, 45.65],
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
    geolocateUser(map);
    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "calc(100vh - 80px)" }}
      />
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <SpeechRecognition />
      </div>
    </>
  );
};

export default Maps;
