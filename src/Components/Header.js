import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

// Styled component for the title container
const HeaderContainer = styled("div")({
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: 900,
  cursor: "pointer",
  fontSize: 20,
});

// Styled component for the toolbar to align children
const ToolbarContainer = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between", // Distributes space between children
  alignItems: "center", // Centers items vertically
});

const Header = () => {

  const {currency, setCurrency} = CryptoState()

  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <ToolbarContainer>
            <Typography onClick={() => navigate("/")} variant="h6">
              <HeaderContainer>
                CryptoTrack Master
              </HeaderContainer>
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </ToolbarContainer>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
