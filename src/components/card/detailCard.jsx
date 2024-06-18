import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  ReturnArrow,
  LocationFill,
  Stars,
  Bookmarks,
} from "../../assets/icon/Icon";

const DetailCard = () => {
  const { state } = useLocation();
  const [cardList, setCardList] = useState([]);
  const card = state;

  const fetchPlaces = async (query) => {
    const url = `https://places.googleapis.com/v1/places:searchNearby`;
    const dataQuery = {
      includedPrimaryTypes: [`${query}`],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: 45.648186,
            longitude: 0.139799,
          },
          radius: 10000,
        },
      },
      rankPreference: "POPULARITY",
      excludedTypes: ["fast_food_restaurant"],
    };
    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
      "X-Goog-FieldMask":
        "places.displayName,places.photos,places.rating,places.priceLevel,places.types,places.googleMapsUri,places.formattedAddress",
    };
    try {
      const response = await axios.post(url, dataQuery, { headers });
      const data = response.data.places;
      return data;
    } catch (error) {
      console.error("Error fetching places data:", error);
      return [];
    }
  };
  const getPriceLevel = (priceLevel) => {
    switch (priceLevel) {
      case "PRICE_LEVEL_FREE":
        return "€";
      case "PRICE_LEVEL_INEXPENSIVE":
        return "€";
      case "PRICE_LEVEL_MODERATE":
        return "€€";
      case "PRICE_LEVEL_EXPENSIVE":
        return "€€€";
      case "PRICE_LEVEL_VERY_EXPENSIVE":
        return "€€€€";
      default:
        return "";
    }
  };

  useEffect(() => {
    fetchPlaces(card.id)
      .then((response) => {
        setCardList(response);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  }, [card.id]);

  const handleBack = () => {
    window.history.back();
  };
  const handleGoToMaps = (link) => {
    const confirmed = window.confirm(
      "Vous allez être redirigé vers Google Maps. Continuer ?"
    );
    if (confirmed) {
      window.location.href = link;
    }
  };
  const handleBookmark = (data) => {
    if (!data || !data.formattedAddress) {
      console.log("Invalid data");
      return;
    }

    let bookmarkHistoryArray = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );

    // Check if the bookmark already exists in the array
    const exists = bookmarkHistoryArray.some(
      (bookmark) => bookmark.formattedAddress === data.formattedAddress
    );

    if (!exists) {
      bookmarkHistoryArray.push(data);
      console.log("Saved in local storage");
      localStorage.setItem("bookmarks", JSON.stringify(bookmarkHistoryArray));
    } else {
      console.log("Bookmark already exists");
    }
  };

  if (cardList.length === 0) {
    return (
      <div>
        <h1>Chargement ....</h1>
      </div>
    );
  }

  return (
    <div className="card" style={styles.container}>
      <div style={styles.topBackground}>
        <div style={styles.imageContainer}>
          <img src={card.imageUrl} alt="Card" style={styles.image} />
        </div>
        <div style={styles.topContent}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={styles.topArrow} onClick={handleBack}>
              <ReturnArrow stroke="#fff" />
            </div>
            <h1
              style={{
                ...{ margin: "0 auto", textAlign: "center" },
                ...styles.topTitle,
              }}
            >
              {card.displayName.text}
            </h1>
          </div>
        </div>
      </div>
      <div>
        {cardList.map((data) => (
          <div key={data.displayName.text} style={styles.card}>
            <div style={styles.cardLeft}>
              {data.photos && (
                <img
                  src={`https:${data.photos[0].authorAttributions[0].photoUri}`}
                  alt={data.displayName.text}
                  style={styles.cardImage}
                />
              )}
            </div>
            <div style={styles.cardCenter}>
              <div style={styles.cardInformations}>
                <div style={styles.cardTitleContainer}>
                  <h2 style={styles.cardTitle}>{data.displayName.text}</h2>
                  <span>·</span>
                  <div style={styles.cardPrice}>
                    {data.priceLevel && getPriceLevel(data.priceLevel)}
                  </div>
                </div>
                <div style={styles.cardRating}>
                  <div style={styles.cardStars}>
                    <h3>{data.rating}</h3>
                    <div>
                      {Array.from({ length: Math.floor(data.rating) }).map(
                        (_, i) => (
                          <Stars key={i} />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={styles.cardLocation}
                onClick={() => handleGoToMaps(data.googleMapsUri)}
              >
                <div>
                  <LocationFill />
                </div>
                <p>{data.formattedAddress}</p>
              </div>
            </div>
            <div style={styles.cardRight} onClick={() => handleBookmark(data)}>
              <Bookmarks />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FAF9F7",
  },
  topBackground: {
    height: "200px",
    position: "relative",
    overflow: "hidden",
    maxWidth: 1000,
    margin: "0 auto",
  },
  topTitle: {
    fontFamily: "SFProDisplay",
    fontSize: 25,
    fontWeight: 600,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    filter: "brightness(50%)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  topContent: {
    position: "absolute",
    top: "30px",
    left: "0",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    color: "#FFF",
    padding: "10px",
  },
  topArrow: {
    position: "absolute",
    left: "10px",
  },
  card: {
    padding: "10px",
    width: "90%",
    margin: "20px auto",
    backgroundColor: "#FFF",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    maxWidth: 500,
  },
  cardLeft: {
    backgroundColor: "#BEBEBE",
    minWidth: 87,
    maxWidth: 87,
    height: 114,
    borderRadius: 10,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  },
  cardTitle: {
    fontFamily: "SFProDisplay",
    fontSize: 16,
    fontWeight: 700,
    color: "#252525",
  },
  cardTitleContainer: {
    display: "flex",
    gap: 7,
  },
  cardPrice: {
    fontFamily: "SFProDisplay",
    fontSize: 14,
    fontWeight: 400,
    color: "#737373",
  },
  cardCategories: {
    fontFamily: "SFProDisplay",
    fontSize: 14,
    color: "#737373",
  },
  cardStars: {
    display: "flex",
    gap: 7,
    color: "#737373",
    fontFamily: "SFProDisplay",
  },
  cardLocation: {
    display: "flex",
    gap: 7,
    fontSize: 13,
    width: "80%",
    fontFamily: "SFProDisplay",
    fontWeight: 500,
    color: "#737373",
    alignItems: "center",
    marginTop: 10,
  },
};
export default DetailCard;
