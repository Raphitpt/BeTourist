import React, { useRef } from "react";
import { Location } from "../../assets/icon/Icon";
import { useGeolocated } from "react-geolocated";

export default function Top() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 10000,
    });
  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <div style={styles.header}>
      <div style={styles.header__left}>
        <Location />
        <h1 style={styles.header__content}>Top</h1>
      </div>
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  header__left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  header__right: {},
  header__content: {
    fontFamily: "SFProDisplay",
    fontWeight: "700",
  },
};
