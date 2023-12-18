import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Card, IconButton, Paper, styled, Tooltip } from '@mui/material';
import { Cancel as CancelIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import GoogleMapReact from 'google-map-react';
import { PointFeature } from 'supercluster';
import { useSelector } from 'react-redux';
import useSupercluster from 'use-supercluster';
import { BBox, GeoJsonProperties } from 'geojson';
import { useQueryParams, StringParam } from 'use-query-params';
import mapStyles from './MapStyles.json';
import { useLazyGetControlLocationsFilterQuery, useLazyGetControlLocationsQuery } from '../../services/control.service';
import { selectLocation, ControlLocationType } from '../../state/modules/control/controlReducer';
import { useAuth } from '../../hooks/useAuth';
import { Marker, ClusterMarker, MyLocation } from './Marker';
import { ControlDetail } from './detail/ControlDetail';
import { FilterBar } from './filter/FilterBar';
import { FilterMore } from './filter/FilterMore';
import ControlSearch from './search/ControlSearch';
import LocationRargetIcon from '../../assets/icons/location-target.svg';
import ZoomOutIcon from '../../assets/icons/zoom-out.svg';
import ZoomInIcon from '../../assets/icons/zoom-in.svg';
import Satellite from '../../assets/icons/satellite.png';
import Roadmap from '../../assets/icons/roadmap.png';
import FullscreenIcon from '../../assets/icons/fullscreen.svg';

export const IconButtonMap = styled(IconButton)({
  position: 'absolute',
  borderRadius: '5px',
  padding: '5px',
  zIndex: 1,
  backgroundColor: '#ffffff',
  '& img': {
    padding: '2px',
    width: '24px',
  },
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
});

const PaperButtonMap = styled(Paper)({
  position: 'absolute',
  padding: '3px',
  zIndex: 1,
  backgroundColor: '#ffffff',
  bottom: '32px',
  left: '10px',
  color: '#666666',
  width: '50px',
  height: '47px',
  borderRadius: '5px',
  cursor: 'pointer',
  '& img': {
    width: '100%',
    borderRadius: '5px',
  },
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
});

export const centerDefault = {
  lat: 21.027627,
  lng: 105.833166,
};
export const ControlScreen = () => {
  const [query, setQuery] = useQueryParams({
    locationId: StringParam,
    agencyId: StringParam,
    status: StringParam,
  });
  const googleMapRef = useRef<any>();
  const containerMapRef = useRef<HTMLDivElement>();
  const [center, setCenter] = useState(centerDefault);
  const [currentPosition, setCurrentPosition] = useState(centerDefault);
  const [bounds, setBounds] = useState<BBox>();
  const [zoom, setZoom] = useState(10);
  const [selectedLocation, setSelectedLocation] = useState<ControlLocationType>();
  const [loadedGeoService, setLoadedGeoService] = React.useState(false);
  const [filterExpand, setFilterExpand] = React.useState(false);
  const [imageBtnMapType, setImageBtnMapType] = React.useState(Satellite);

  const defaultFiltersFormValue = {
    status: query.status || 'all',
    agencyId: query.agencyId || 'all',
  };

  const [filtersFormValue, setFiltersFormValue] = React.useState(defaultFiltersFormValue);
  const [getControlLocationsQuery] = useLazyGetControlLocationsQuery();
  const [getControlFilterLocationsQuery] = useLazyGetControlLocationsFilterQuery();
  const {
    auth: { currentUser },
  } = useAuth();

  const locations = useSelector(selectLocation) as ControlLocationType[];

  const statistic =
    locations && locations.length > 0
      ? {
          total: locations.length,
          connected: locations.filter((item) => item.state === 'connected').length,
          alert: locations.filter((item) => item.state === 'alert').length,
          warning: locations.filter((item) => item.state === 'warning').length,
          disconnected: locations.filter((item) => item.state === 'disconnected').length,
        }
      : {
          total: 0,
          connected: 0,
          alert: 0,
          warning: 0,
          disconnected: 0,
        };

  const queryLocationId = query.locationId;
  const queryAgencyId = query.agencyId;
  const queryStatus = query.status;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentUser) {
        getControlLocationsQuery(
          {
            agency_id: currentUser.sub_id,
            // params: {
            //   center_lat: center.lat,
            //   center_lng: center.lng,
            //   visible_radius: 70,
            //   // visible_radius: (containerMapRef.current?.offsetWidth || 100) / 2,
            // },
          },
          false
        );
      }
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [currentUser]);

  useEffect(() => {
    if (queryLocationId && locations.length > 0) {
      const location = locations.find((item) => item.id === queryLocationId);
      if (location && (!selectedLocation || (selectedLocation && selectedLocation.id !== location.id))) {
        setSelectedLocation(location);
        setCenter({
          lat: location.lat,
          lng: location.lng,
        });
        setZoom(19);
      }
    }
  }, [locations, queryLocationId, selectedLocation]);

  useEffect(() => {
    if (currentUser) {
      getControlLocationsQuery({
        agency_id: currentUser.sub_id,
        // params: {
        //   center_lat: center.lat,
        //   center_lng: center.lng,
        //   visible_radius: 70,
        // },
      });
    }
  }, [getControlLocationsQuery, currentUser]);

  useEffect(() => {
    if (currentUser) {
      getControlFilterLocationsQuery({
        agency_id: currentUser.sub_id,
        params: {
          agency_id: queryAgencyId !== 'all' ? queryAgencyId : undefined,
          status: queryStatus !== 'all' ? queryStatus : undefined,
        },
      });
    }
  }, [getControlFilterLocationsQuery, currentUser, queryAgencyId, queryStatus]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: +position.coords.latitude.toFixed(5),
          lng: +position.coords.longitude.toFixed(5),
        });
        setCenter({
          lat: +position.coords.latitude.toFixed(5),
          lng: +position.coords.longitude.toFixed(5),
        });
        setLoadedGeoService(true);
      });
    }
  }, []);

  const points: Array<PointFeature<GeoJsonProperties>> = useMemo(
    () =>
      locations.map((location) => ({
        type: 'Feature',
        properties: { cluster: false, location },
        geometry: {
          type: 'Point',
          coordinates: [location.lng, location.lat],
        },
      })),
    [locations]
  );

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 60, maxZoom: 15, minZoom: 3 },
  });

  const mapOption = () => {
    return {
      styles: mapStyles,
      disableDefaultUI: true,
      backgroundColor: 'none',
    };
  };

  const getColor = (state: string) => {
    switch (state) {
      case 'auto':
        return '#27AE60';
      case 'connected':
        return '#27AE60';
      case 'alert':
        return '#FF451B';
      case 'disconnected':
        return '#8B8C9B';
      case 'warning':
        return '#F2994A';
      default:
        return '#8B8C9B';
    }
  };

  const handleOpenDetail = (localtion: ControlLocationType) => {
    setSelectedLocation(localtion);
    setQuery({ locationId: localtion.id });
  };

  const handleCloseDetail = () => {
    setSelectedLocation(undefined);
    setQuery({ locationId: undefined });
  };

  const onZoomOut = () => {
    googleMapRef.current.map_.setZoom(googleMapRef.current.map_.getZoom() - 1);
  };

  const handleFilter = () => {
    setQuery({ agencyId: filtersFormValue.agencyId, status: filtersFormValue.status });
  };

  const handleClearFilter = () => {
    setFiltersFormValue({ status: 'all', agencyId: 'all' });
    setQuery({
      agencyId: undefined,
      status: undefined,
    });
    onZoomOut();
  };

  const onZoomIn = () => {
    googleMapRef.current.map_.setZoom(googleMapRef.current.map_.getZoom() + 1);
  };

  const onChangeMapType = () => {
    if (googleMapRef.current.map_.getMapTypeId() === 'roadmap') {
      setImageBtnMapType(Roadmap);
      googleMapRef.current.map_.setMapTypeId('satellite');
    } else {
      setImageBtnMapType(Satellite);
      googleMapRef.current.map_.setMapTypeId('roadmap');
    }
  };

  const onGetLocationClick = () => {
    if (!loadedGeoService) {
      return;
    }
    setCenter({
      lat: currentPosition.lat,
      lng: currentPosition.lng,
    });
  };

  const onFullScreenClick = () => {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  };

  const resetLocation = () => {
    onGetLocationClick();
    googleMapRef.current.map_.setZoom(13);
  };

  const onSearch = (id: string) => {
    const location = locations.find((item) => item.id === id);
    if (!loadedGeoService || !location) {
      return;
    }

    const geoLoc = {
      lat: location.lat,
      lng: location.lng,
    };
    googleMapRef.current.map_.setCenter(geoLoc);
    googleMapRef.current.map_.panTo(geoLoc);
    googleMapRef.current.map_.setZoom(19);
  };

  const isFitering = Boolean(queryAgencyId || queryStatus);

  return (
    <Box
      style={{
        height: 'calc(100vh - 64px)',
        width: ' 100%',
        position: 'relative',
      }}
      ref={containerMapRef}
    >
      {selectedLocation && (
        <ControlDetail
          selectedLocationId={selectedLocation.id}
          locationName={selectedLocation.name}
          onClose={handleCloseDetail}
        />
      )}
      <Card
        style={{
          position: 'absolute',
          bottom: filterExpand ? 0 : '32px',
          zIndex: filterExpand ? 10 : 1,
          width: filterExpand ? '100%' : 'calc(100% - 64px)',
          boxShadow: filterExpand ? '0px 1px 4px rgba(0, 0, 0, 0.1)' : 'none',
          borderRadius: filterExpand ? '5px' : 0,
          display: 'flex',
          justifyContent: 'center',
          height: filterExpand ? '540px' : 'auto',
          backgroundColor: filterExpand ? '#ffffff' : 'rgba(0, 0, 0, 0)',
        }}
        elevation={0}
      >
        {filterExpand ? (
          <Box height={'50px'} width="100%">
            <Box
              display="flex"
              justifyContent={'space-between'}
              pr="16px"
              pl="8px"
              boxShadow={'0px 1px 4px rgba(0, 0, 0, 0.1)'}
            >
              <FilterBar
                locationListLength={statistic}
                onStatusClick={() => {}}
                onFilterExpandClick={() => setFilterExpand(!filterExpand)}
                filterExpand={filterExpand}
                isFitering={isFitering}
              />
              <Box
                display="flex"
                alignItems="center"
                px="8px"
                style={{ cursor: 'pointer' }}
                onClick={() => setFilterExpand(!filterExpand)}
              >
                {filterExpand && <ExpandMoreIcon />}
              </Box>
            </Box>
            <FilterMore
              handleOpenLocation={(localtion: ControlLocationType) => handleOpenDetail(localtion)}
              filtersFormValue={filtersFormValue}
              setFiltersFormValue={setFiltersFormValue}
              handleClearFilter={handleClearFilter}
              handleFilter={handleFilter}
            />
          </Box>
        ) : (
          <Box display={'flex'} position="relative" justifyContent={'center'}>
            <FilterBar
              locationListLength={statistic}
              onStatusClick={() => {}}
              onFilterExpandClick={() => setFilterExpand(!filterExpand)}
              filterExpand={filterExpand}
              isFitering={isFitering}
            />
            {isFitering && (
              <Tooltip title="Huỷ bộ lọc">
                <IconButtonMap
                  aria-label="clear"
                  style={{
                    right: '-56px',
                    width: '47px',
                    height: '47px',
                  }}
                  onClick={handleClearFilter}
                >
                  <CancelIcon style={{ color: '#8F0A0C' }} />
                </IconButtonMap>
              </Tooltip>
            )}
          </Box>
        )}
      </Card>
      <IconButtonMap
        style={{ top: '24px', right: '16px', zIndex: 1 }}
        aria-label="fullscreen"
        onClick={onFullScreenClick}
      >
        <img src={FullscreenIcon} alt="" />
      </IconButtonMap>
      <IconButtonMap
        style={{ bottom: '86px', right: '16px', zIndex: 1 }}
        aria-label="zoom in"
        onClick={onGetLocationClick}
      >
        <img src={LocationRargetIcon} alt="" />
      </IconButtonMap>
      <IconButtonMap style={{ bottom: '32px', right: '70px', zIndex: 1 }} aria-label="zoom in" onClick={onZoomIn}>
        <img src={ZoomInIcon} alt="" />
      </IconButtonMap>
      <PaperButtonMap onClick={onChangeMapType}>
        <img src={imageBtnMapType} alt="" />
      </PaperButtonMap>

      <IconButtonMap
        style={{ bottom: '32px', right: '16px', color: '#666666' }}
        aria-label="zoom out"
        onClick={onZoomOut}
      >
        <img src={ZoomOutIcon} alt="" />
      </IconButtonMap>
      <Box
        style={{
          position: 'absolute',
          top: '24px',
          right: '70px',
          zIndex: 1,
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1) !important',
        }}
      >
        <ControlSearch data={locations} onSearch={onSearch} resetLocation={resetLocation} />
      </Box>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyAjDwo_TVHsOX1nC5u9ySilk6IShSHF5tM',
          libraries: ['places'],
          language: 'vi',
          region: 'vi',
        }}
        defaultZoom={13}
        hoverDistance={30}
        options={mapOption}
        center={center}
        zoom={zoom}
        ref={googleMapRef}
        yesIWantToUseGoogleMapApiInternals
        onChange={({ zoom, bounds: b, center: c }) => {
          setZoom(zoom);
          setBounds([b.nw.lng, b.se.lat, b.se.lng, b.nw.lat]);
          setCenter({ lat: +c.lat.toFixed(5), lng: +c.lng.toFixed(5) });
        }}
        // onGoogleApiLoaded={onGoogleApiLoaded}
        // onChange={onBoundsChange}
      >
        {loadedGeoService && (
          <MyLocation lat={currentPosition.lat} lng={currentPosition.lng} message="Vị trí của bạn" />
        )}

        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount, location } = cluster.properties as any;
          if (isCluster) {
            return (
              <ClusterMarker
                key={`ClusterMarker-${cluster.id}`}
                lat={latitude}
                lng={longitude}
                pointCount={pointCount}
              />
            );
          }
          const color = getColor(location?.state);

          return (
            <Marker
              key={`Marker-${location.id}`}
              lat={location.lat}
              lng={location.lng}
              text={location.name}
              color={color}
              name={location.name}
              id={location.id}
              location={location}
              onMarkerClick={(localtion: ControlLocationType) => handleOpenDetail(localtion)}
            />
          );
        })}
      </GoogleMapReact>
    </Box>
  );
};
