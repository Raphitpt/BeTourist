import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFwaGl0aXRpIiwiYSI6ImNsZ3k0andyMDA1enEzZW05YjhtbnMzYXUifQ.kG7eG6VUDiHTfAbqGA74lg";

const Maps = () => {
  const mapContainerRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/raphititi/clx1tr61a01rg01qs3ycedsti",
      center: [0.15, 45.65],
      zoom: 13,
    });

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

  const injectMicroIcon = () => {
    const geocoderContainer = document.querySelector(".mapboxgl-ctrl-geocoder");
    if (geocoderContainer) {
      const microIconContainer = document.createElement("div");
      microIconContainer.classList.add("micro-icon-container");

      const microIcon = document.createElement("div");
      microIcon.classList.add("micro-icon");

      const microIconSvg = document.createElement("div");
      microIconSvg.innerHTML = `<svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_8_56)">
          <path
            d="M12 14.6553C10.5769 14.6553 9.42456 13.4522 9.42456 11.9662V5.68902C9.42456 4.2031 10.5769 3 12 3C13.4232 3 14.5755 4.2031 14.5755 5.68902V11.9662C14.5755 13.4522 13.4232 14.6553 12 14.6553Z"
            fill="black"
          />
          <path
            d="M12.8612 17.7115H11.1429V21H12.8612V17.7115Z"
            fill="black"
          />
          <path
            d="M16.3019 12C16.2978 14.4737 14.3693 16.4873 12 16.4873C10.8113 16.4873 9.7318 15.9808 8.95148 15.1618L7.75067 16.4156C8.83827 17.5511 10.3383 18.2561 12 18.2561C15.3113 18.2561 17.996 15.4531 18 11.9958H16.3019V12Z"
            fill="black"
          />
          <path
            d="M8.95148 15.1618C8.17925 14.3513 7.69811 13.2326 7.69811 12H6C6 13.7223 6.67116 15.2842 7.75067 16.4156L8.95148 15.1618Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_8_56">
            <rect
              width="12"
              height="18"
              fill="white"
              transform="translate(6 3)"
            />
          </clipPath>
        </defs>
      </svg>`;

      microIcon.appendChild(microIconSvg);
      microIconContainer.appendChild(microIcon);
      geocoderContainer.appendChild(microIconContainer);

      microIcon.addEventListener("click", startSpeechRecognition);
    }
  };

  useEffect(() => {
    injectMicroIcon();
  }, []);

  const startSpeechRecognition = () => {
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
    recognition.lang = "fr-FR";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (!event.results[i].isFinal) {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      console.log("Interim result:", interimTranscript);
      geocoderRef.current.query(interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Erreur de reconnaissance vocale : " + event.error);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  };

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "calc(100vh - 80px)" }}
      />
    </div>
  );
};

export default Maps;
