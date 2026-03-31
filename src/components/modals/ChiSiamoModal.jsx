import { Modal, Fade, Backdrop, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ChiSiamoModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 400 } }}
    >
      <Fade in={open}>
        <Box sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0, 0, 0, 0.55)",
          backdropFilter: "blur(14px)",
          outline: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, md: 12 },
          py: 8,
          color: "#fff",
        }}>

          {/* Chiudi */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 28,
              right: 32,
              color: "rgba(255,255,255,0.6)",
              "&:hover": { color: "#fff" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Contenuto */}
          <Box sx={{ maxWidth: 720, width: "100%" }}>

            <Typography sx={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              mb: 3,
            }}>
              Chi Siamo
            </Typography>

            <Typography variant="h2" sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3.5rem" },
              lineHeight: 1.1,
              mb: 5,
            }}>
              Siamo Finimundu.
            </Typography>

            <Typography sx={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
              mb: 3,
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </Typography>

            <Typography sx={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.7)",
            }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </Typography>

          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
