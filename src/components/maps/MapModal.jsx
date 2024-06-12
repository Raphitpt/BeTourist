import React, { useState } from "react";
import { Sheet } from "react-modal-sheet";
import { isIOS, isMobile } from "react-device-detect";

const MapModal = ({ isOpen, closeModal, placeData }) => {
  const [currentPlaceData, setCurrentPlaceData] = useState(null);

  let height = 56;
  if (isIOS && isMobile) {
    height += 24;
  }

  const styles = {
    sheetContainer: {
      marginBottom: height,
    },
    modalContent: {
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      overflow: "hidden",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={closeModal}
      initialSnap={1} // Start from the middle point (partially opened)
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content style={styles.sheetContainer}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={styles.modalContent}
          >
            {currentPlaceData && currentPlaceData.displayName && (
              <h2>
                {currentPlaceData.displayName.text || "No name available"}
              </h2>
            )}
            <button onClick={closeModal} style={styles.button}>
              Close
            </button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default MapModal;
