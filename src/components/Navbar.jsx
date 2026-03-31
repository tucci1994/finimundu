import { useState } from "react";
import { Box } from "@mui/material";
import ChiSiamoModal from "./modals/ChiSiamoModal";

const NAV_ITEMS = [
  { label: "Chi Siamo",  key: "chi-siamo"  },
  { label: "Progetti",   key: "progetti"   },
  { label: "Vision",     key: "vision"     },
  { label: "Contattaci", key: "contattaci" },
  { label: "News",       key: "news"       },
];

export default function Navbar() {
  const [chiSiamoOpen, setChiSiamoOpen] = useState(false);

  const handleClick = (key) => {
    if (key === "chi-siamo") setChiSiamoOpen(true);
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          px: 4,
          py: 3,
          pointerEvents: "none",
        }}
      >
        <Box sx={{
          display: "flex",
          gap: { xs: 3, md: 5 },
          pointerEvents: "auto",
        }}>
          {NAV_ITEMS.map(({ label, key }) => (
            <Box
              key={key}
              component="button"
              onClick={() => handleClick(key)}
              sx={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                fontFamily: '"NectoMono", monospace',
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: 0,
                opacity: 0.75,
                transition: "opacity 0.2s",
                "&:hover": { opacity: 1 },
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
      </Box>

      <ChiSiamoModal
        open={chiSiamoOpen}
        onClose={() => setChiSiamoOpen(false)}
      />
    </>
  );
}
