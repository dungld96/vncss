import { Box, Typography } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { get } from 'lodash';
import React, { createRef, useEffect, useState } from 'react';

import mapStyles from './MapStyles.json';

import SearchBox from './SearchBoxPosition';

export const centerDefault = {
  lat: 21.027627,
  lng: 105.833166,
};

interface Props {
  selectedPosition: any;
  handleSelectedPosition: any;
}

const SelectPosition: React.FC<Props> = ({ selectedPosition, handleSelectedPosition }) => {
  const googleMapRef = createRef<any>();
  const [center, setCenter] = useState(centerDefault);
  // const [loadedGeoService, setLoadedGeoService] = useState(false);
  // const [openPopupPosition, setOpenPopupPosition] = useState(false);
  // const [anchorElPopupPosition, setAnchorElPopupPosition] = useState(false);
  const [loadedMapApi, setLoadedMapApi] = useState(false);
  const [map, setMap] = useState(null);
  const [googlemaps, setGooglemaps] = useState(null);

  const mapOption = (maps: any) => {
    return {
      styles: mapStyles,
      disableDefaultUI: true,
      backgroundColor: 'none',
      draggableCursor: 'default',
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_CENTER,
        style: maps.ZoomControlStyle.SMALL,
      },
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT,
      },
      mapTypeControl: true,
      fullscreenControl: true,
      zoomControl: true,
    };
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        // setLoadedGeoService(true);
      });
    } else {
      console.log('khong tim thay vi tri hien tai');
    }
  }, []);

  const onMapClick = (e: any) => {
    // setAnchorElPopupPosition(e.event.target);
    // setOpenPopupPosition(true);
    handleSelectedPosition({
      lat: e.lat.toFixed(6),
      lng: e.lng.toFixed(6),
    });
  };

  // const handleClosePopupPosition = () => {
  //   setOpenPopupPosition(false);
  // };

  const onGoogleApiLoaded = ({ map, maps }: any) => {
    setLoadedMapApi(true);
    setMap(map);
    setGooglemaps(maps);
  };

  //   const onZoomIn = () => {
  //     googleMapRef.current.map_.setZoom(googleMapRef.current.map_.getZoom() + 1);
  //   };

  //   const onZoomOut = () => {
  //     googleMapRef.current.map_.setZoom(googleMapRef.current.map_.getZoom() - 1);
  //   };

  const handleSearch = (places: any) => {
    console.log(places);
  };
  return (
    <Box
      sx={{
        height: '100%',
        width: 'calc(100% + 64px)',
        position: 'relative',
        boxSizing: 'border-box ',
        paddingBottom: '24px',
        marginLeft: '-32px',
      }}
    >
      {selectedPosition && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: '1',
            background: '#fff',
            borderRadius: '8px',
            width: '143px',
            padding: '8px 12px',
            left: '32px',
            bottom: '48px',
          }}
        >
          <Typography
            color="inherit"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              lineHeight: '20px',
              marginBottom: '8px',
            }}
          >
            <span style={{ fontWeight: '400' }}>Kinh độ:</span>
            <span style={{ fontWeight: '700', color: '#8F0A0C' }}>{get(selectedPosition, 'lng', '--')}</span>
          </Typography>
          <Typography
            color="inherit"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              lineHeight: '20px',
            }}
          >
            <span style={{ fontWeight: '400' }}>Vĩ độ:</span>
            <span style={{ fontWeight: '700', color: '#8F0A0C' }}>{get(selectedPosition, 'lat', '--')}</span>
          </Typography>
        </Box>
      )}
      {loadedMapApi && (
        <SearchBox
          style={{
            width: '286px',
            position: 'absolute',
            zIndex: '9999',
            background: '#fff',
            left: '32px',
            top: '24px',
            borderRadius: '8px',
          }}
          placeholder={'Tìm kiếm vị trí.'}
          onPlacesChanged={handleSearch}
          map={map}
          maps={googlemaps}
        />
      )}

      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyD30G1X8I2BXdxp9H-nGWQVB5IkAQqpXmI',
          libraries: ['places'],
        }}
        defaultZoom={13}
        options={mapOption}
        center={center}
        ref={googleMapRef}
        onGoogleApiLoaded={onGoogleApiLoaded}
        onClick={onMapClick}
        yesIWantToUseGoogleMapApiInternals
      >
        {/* {loadedGeoService && (
          <MyLocation
            lat={center.lat}
            lng={center.lng}
            text="My Marker"
            color="#DC3545"
            name="my marker 1"
            message="Vị trí của bạn"
            shortName="LC"
            id={13}
            onMarkerClick={noop}
          />
        )}
        {selectedPosition && (
          <MakerSelected
            lat={selectedPosition.lat}
            lng={selectedPosition.lng}
            position={selectedPosition}
            open={openPopupPosition}
            handleClose={handleClosePopupPosition}
            anchorEl={anchorElPopupPosition}
          />
        )} */}
      </GoogleMapReact>
    </Box>
  );
};

export default SelectPosition;
