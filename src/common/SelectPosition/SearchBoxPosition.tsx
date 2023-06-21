import { InputAdornment, TextField } from '@mui/material';

import { useEffect, useRef } from 'react';
import { ImageIcon } from 'utils/UtilsComponent';
import SearchIcon from '../../assets/icons/search-icon.svg';

interface Props {
  style?: React.CSSProperties;
  placeholder: string;
  onPlacesChanged?: (value: any) => void;
  maps: any;
  map: any;
}

const SearchBox: React.FC<Props> = ({ map, maps, onPlacesChanged, placeholder, style }) => {
  const input = useRef<HTMLDivElement>(null);
  const searchBox = useRef<any>(null);
  const markers = useRef<any>([]);
  useEffect(() => {
    const inputCurrent = Array.from(input.current?.getElementsByTagName('input') || [])[0];

    if (!searchBox.current && maps && maps.places) {
      searchBox.current = new maps.places.SearchBox(inputCurrent);
      map.addListener('bounds_changed', () => {
        searchBox?.current?.setBounds(map.getBounds());
      });
      searchBox.current.addListener('places_changed', () => {
        const places = searchBox.current.getPlaces();
        if (places.length === 0) {
          return;
        }
        markers.current.forEach((marker: any) => {
          marker.setMap(null);
        });
        markers.current = [];
        const bounds = new maps.LatLngBounds();
        places.forEach((place: any) => {
          if (!place.geometry) {
            console.log('Returned place contains no geometry');
            return;
          }
          const icon = {
            url: place.icon,
            size: new maps.Size(71, 71),
            origin: new maps.Point(0, 0),
            anchor: new maps.Point(17, 34),
            scaledSize: new maps.Size(25, 25),
          };
          // Create a marker for each place.
          markers.current.push(
            new maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
            })
          );

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }

    return () => {
      if (maps) {
        searchBox.current = null;
        maps.event.clearInstanceListeners(searchBox);
      }
    };
  }, [map, maps, input.current]);

  return (
    <TextField
      ref={input}
      style={style}
      type="text"
      placeholder={placeholder}
      InputProps={{
        startAdornment: <InputAdornment position="start">{<ImageIcon image={SearchIcon} />}</InputAdornment>,
      }}
      sx={{
        '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
          border: '1px solid #d9d9d9',
        },
        '& .MuiInputBase-root': {
          borderRadius: '8px',
          height: '44px',
          color: '#1E2323',
          fontWeight: '500',
          fontSize: '14px',
        },
        '& .MuiFormHelperText-root': {
          color: '#ec0e0e',
        },
        input: {
          '&::placeholder': {
            color: '#777777',
          },
          '&:-webkit-autofill': {
            transition: ' background-color 5000s ease-in-out 0s',
          },
        },
      }}
    />
  );
};

export default SearchBox;
