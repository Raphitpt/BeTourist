import React from "react";

const MapModal = ({ isOpen, closeModal, featureName }) => {
  return (
    <div
      className={`map-modal ${isOpen ? "open" : ""}`}
      onClick={closeModal}
      style={{
        position: "fixed",
        bottom: isOpen ? 0 : "-50%",
        left: 0,
        right: 0,
        transition: "bottom 0.3s ease-in-out",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        zIndex: 999,
        overflow: "hidden",
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: "20px" }}
      >
        <h2>{featureName || "No name available"}</h2>
        <button
          onClick={closeModal}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MapModal;
