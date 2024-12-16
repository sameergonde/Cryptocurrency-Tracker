import {
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    TextField,
    TableContainer,
    LinearProgress,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    TableBody,
    Pagination,
  } from "@mui/material";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { CoinList } from "../config/api";
  import { CryptoState } from "../CryptoContext";
  import { useNavigate } from "react-router-dom"; // Updated import for navigation
  
  export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
  
    const navigate = useNavigate(); // Updated hook for navigation
  
    const { currency, symbol } = CryptoState();
  
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchCoins();
    }, [currency]);
  
    const handleSearch = () => {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    };
  
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
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
  
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)} // Updated navigation
                          key={row.id}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{ display: "flex", flexDirection: "column" }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              (row.market_cap / 1e6).toFixed(0) // Formatting market cap
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
  
          <Pagination
            count={Math.ceil(handleSearch()?.length / 10)} // Updated pagination count calculation
            sx={{
              padding: 2,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              "& .MuiPaginationItem-root": {
                color: "gold", // Custom pagination item color
              },
            }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    );
  };
  
  export default CoinsTable;
  