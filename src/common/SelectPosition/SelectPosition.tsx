import React, { createRef, useEffect, useState } from 'react';
import { get, noop } from 'lodash';
import GoogleMapReact from 'google-map-react';
import { Box, Typography } from '@mui/material';

import mapStyles from './MapStyles.json';

// import MyLocation from '../Geo/MyLocation';
// import MakerSelected from './MakerSelected';

export const centerDefault = {
  lat: 21.027627,
  lng: 105.833166,
};

// const SearchBox = ({ map, maps, onPlacesChanged, placeholder }) => {
//   const input = React.useRef(null);
//   const searchBox = React.useRef(null);
//   const markers = React.useRef([]);
//   React.useEffect(() => {
//     if (!searchBox.current && maps && maps.places) {
//       searchBox.current = new maps.places.SearchBox(input.current);
//       map.addListener('bounds_changed', () => {
//         searchBox.current.setBounds(map.getBounds());
//       });
//       searchBox.current.addListener('places_changed', () => {
//         const places = searchBox.current.getPlaces();
//         if (places.length === 0) {
//           return;
//         }
//         markers.current.forEach(marker => {
//           marker.setMap(null);
//         });
//         markers.current = [];
//         const bounds = new maps.LatLngBounds();
//         places.forEach(place => {
//           if (!place.geometry) {
//             console.log('Returned place contains no geometry');
//             return;
//           }
//           const icon = {
//             url: place.icon,
//             size: new maps.Size(71, 71),
//             origin: new maps.Point(0, 0),
//             anchor: new maps.Point(17, 34),
//             scaledSize: new maps.Size(25, 25)
//           };
//           // Create a marker for each place.
//           markers.current.push(
//             new maps.Marker({
//               map,
//               icon,
//               title: place.name,
//               position: place.geometry.location
//             })
//           );

//           if (place.geometry.viewport) {
//             // Only geocodes have viewport.
//             bounds.union(place.geometry.viewport);
//           } else {
//             bounds.extend(place.geometry.location);
//           }
//         });
//         map.fitBounds(bounds);
//       });
//     }

//     return () => {
//       if (maps) {
//         searchBox.current = null;
//         maps.event.clearInstanceListeners(searchBox);
//       }
//     };
//   }, [map, maps]);

//   return (
//     <input
//       style={{
//         position: 'absolute',
//         top: '5px',
//         left: '5px',
//         zIndex: 1,
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         padding: '5px 10px'
//       }}
//       ref={input}
//       placeholder={placeholder}
//       type="text"
//     />
//   );
// };

interface Props {
  selectedPosition: any;
  handleSelectedPosition: any;
}

const SelectPosition: React.FC<Props> = ({ selectedPosition, handleSelectedPosition }) => {
  const googleMapRef = createRef<any>();
  const [center, setCenter] = useState(centerDefault);
  const [loadedGeoService, setLoadedGeoService] = useState(false);
  const [openPopupPosition, setOpenPopupPosition] = useState(false);
  const [anchorElPopupPosition, setAnchorElPopupPosition] = useState(false);
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
        setLoadedGeoService(true);
      });
    } else {
      console.log('khong tim thay vi tri hien tai');
    }
  }, []);

  const onMapClick = (e: any) => {
    setAnchorElPopupPosition(e.event.target);
    setOpenPopupPosition(true);
    handleSelectedPosition({
      lat: e.lat.toFixed(6),
      lng: e.lng.toFixed(6),
    });
  };

  const handleClosePopupPosition = () => {
    setOpenPopupPosition(false);
  };

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

  //   const handleSearch = places => {
  //     console.log(places);
  //   };
  return (
    <Box>
      {selectedPosition && (
        <Box>
          <Typography color="inherit">
            <span>Kinh độ:</span>
            <span>{get(selectedPosition, 'lng', '--')}</span>
          </Typography>
          <Typography color="inherit">
            <span>Vĩ độ:</span>
            <span>{get(selectedPosition, 'lat', '--')}</span>
          </Typography>
        </Box>
      )}
      {/* {loadedMapApi && (
        <SearchBox
          placeholder={'Tìm kiếm vị trí.'}
          onPlacesChanged={handleSearch}
          map={map}
          maps={googlemaps}
        /> */}
      {/* )} */}

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
