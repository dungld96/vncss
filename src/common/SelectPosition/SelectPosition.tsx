import { Box, Typography } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { get } from 'lodash';
import React, { createRef, useEffect, useState } from 'react';
import mapStyles from './MapStyles.json';
import SearchBox from './SearchBoxPosition';
import { MakerSelected } from './MakerSelected';

export const centerDefault = {
  lat: 21.037516,
  lng: 105.835331,
};
interface IPosition {
  lat: number;
  lng: number;
}
interface Props {
  selectedPosition: IPosition | null;
  handleSelectedPosition: (position: IPosition) => void;
}

const SelectPosition: React.FC<Props> = ({ selectedPosition, handleSelectedPosition }) => {
  const googleMapRef = createRef<any>();
  const [center, setCenter] = useState(centerDefault);
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
    handleSelectedPosition({
      lat: e.lat.toFixed(6),
      lng: e.lng.toFixed(6),
    });
  };

  const onGoogleApiLoaded = ({ map, maps }: any) => {
    setLoadedMapApi(true);
    setMap(map);
    setGooglemaps(maps);
  };

  const handleSearch = (places: any) => {
    console.log(places);
  };
  return (
    <Box
      sx={{
        height: '100%',
        position: 'relative',
        boxSizing: 'border-box ',
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
          key: 'AIzaSyAjDwo_TVHsOX1nC5u9ySilk6IShSHF5tM',
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
        {selectedPosition && <MakerSelected lat={selectedPosition.lat} lng={selectedPosition.lng} />}
      </GoogleMapReact>
    </Box>
  );
};

export default SelectPosition;
