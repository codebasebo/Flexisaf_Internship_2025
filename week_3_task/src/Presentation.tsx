import * as React from "react";

// Slides content
const slides = [
  "Virtual DOM",
  "State", 
  "Props",
  "JSX",
  "Components (functional and class)",
  "Lifecycle components",
  "Fragment",
  "Use Event Handlers with React",
  "Presentation of Study/Practise of learning outcome"
];

const Presentation: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  const nextSlide = () => {
    if (index < slides.length - 1) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return React.createElement("div", 
    { style: { 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        height: "100vh", 
        backgroundColor: "#14b8a6", 
        color: "white" 
      } 
    },
    React.createElement("div", 
      { style: { 
          backgroundColor: "white", 
          color: "black", 
          padding: "40px", 
          borderRadius: "16px", 
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
          width: "600px", 
          textAlign: "center" 
        } 
      },
      React.createElement("h1", 
        { style: { fontSize: "24px", fontWeight: "bold" } }, 
        slides[index]
      )
    ),
    React.createElement("div", 
      { style: { marginTop: "24px", display: "flex", gap: "16px" } },
      React.createElement("button", {
        onClick: prevSlide,
        disabled: index === 0,
        style: {
          padding: "8px 16px",
          backgroundColor: index === 0 ? "#6b7280" : "#374151",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: index === 0 ? "not-allowed" : "pointer",
          opacity: index === 0 ? 0.5 : 1
        }
      }, "Prev"),
      React.createElement("button", {
        onClick: nextSlide,
        disabled: index === slides.length - 1,
        style: {
          padding: "8px 16px",
          backgroundColor: index === slides.length - 1 ? "#6b7280" : "#2563eb",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: index === slides.length - 1 ? "not-allowed" : "pointer",
          opacity: index === slides.length - 1 ? 0.5 : 1
        }
      }, "Next")
    ),
    React.createElement("p", 
      { style: { marginTop: "16px", fontSize: "14px" } },
      `Slide ${index + 1} of ${slides.length}`
    )
  );
};

export default Presentation;
