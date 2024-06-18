import React from "react";
import {
  LocationFill,
  Stars,
  Bookmarks,
  BookmarksFill,
} from "../../assets/icon/Icon"; // Assurez-vous d'avoir une icône remplie

const bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (savedBookmarks) {
      console.log(savedBookmarks);
      setBookmarks(savedBookmarks);
    }
    setLoading(false);
  }, []);

  const handleGoToMaps = (link) => {
    const confirmed = window.confirm(
      "Vous allez être redirigé vers Google Maps. Continuer ?"
    );
    if (confirmed) {
      window.location.href = link;
    }
  };

  const handleBookmark = (data) => {
    const updatedBookmarks = bookmarks.find(
      (bookmark) => bookmark.formattedAddress === data.formattedAddress
    )
      ? bookmarks.filter(
          (bookmark) => bookmark.formattedAddress !== data.formattedAddress
        )
      : [...bookmarks, data];

    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (formattedAddress) => {
    return bookmarks.some(
      (bookmark) => bookmark.formattedAddress === formattedAddress
    );
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.backgroundContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>Signets</h1>
        <div>
          {bookmarks.length === 0 && <p>Vous n'avez pas de signets.</p>}
          {bookmarks.map((data) => (
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
              <div
                style={styles.cardRight}
                onClick={() => handleBookmark(data)}
              >
                {isBookmarked(data.formattedAddress) ? (
                  <BookmarksFill />
                ) : (
                  <Bookmarks />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  backgroundContainer: {
    backgroundColor: "#faf9f7",
    height: "100%",
  },
  container: {
    width: "90%",
    margin: "0 auto",
    maxWidth: 1000,
    paddingBlock: "2rem",
  },
  title: {
    fontFamily: "SFProDisplay",
    fontWeight: 700,
    fontSize: "3rem",
    color: "#00AF87",
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

export default bookmarks;
