import {
  Typography,
  Container,
  useTheme,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../Components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "../Components/CoinsTable";
import parse from 'html-react-parser';

const ContainerStyled = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled('div')(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
}));

const Description = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
}));

const MarketData = styled('div')(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  const description = coin?.description?.en
    ? parse(coin.description.en.split(". ")[0])
    : "No description available.";

  return (
    <ContainerStyled>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Heading variant="h3">
          {coin?.name}
        </Heading>
        <Description variant="subtitle1">
          {description}
        </Description>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">
              Rank:
            </Heading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank ?? "N/A")}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Heading variant="h5">
              Current Price:
            </Heading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {coin?.market_data?.current_price
                ? numberWithCommas(
                    coin.market_data.current_price[currency.toLowerCase()]?.toFixed(2) ?? "N/A"
                  )
                : "N/A"}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">
              Market Cap:
            </Heading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {coin?.market_data?.market_cap
                ? numberWithCommas(
                    (coin.market_data.market_cap[currency.toLowerCase()]?.toString().slice(0, -6) ?? "N/A") + "M"
                  )
                : "N/A"}
            </Typography>
          </span>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </ContainerStyled>
  );
};

export default CoinPage;
