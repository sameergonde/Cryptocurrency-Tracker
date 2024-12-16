import React from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Carousel from './Carousel';

const BannerContainer = styled('div')({
  backgroundImage: 'url(./banner2.jpg)',
});

const BannerContent = styled(Container)({
  height: 250,
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 25,
  justifyContent: 'space-around',
});

const Tagline = styled('div')({
  textAlign: 'center',
});

const Banner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Montserrat',
            }}
          >
            CryptoTrack Master
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
      </BannerContent>
      <Carousel />
    </BannerContainer>
  );
}

export default Banner;
