import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Card, IconButton, Tooltip } from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import GoogleMapReact from 'google-map-react';
import { PointFeature } from 'supercluster';
import { useSelector } from 'react-redux';
import useSupercluster from 'use-supercluster';
import { BBox, GeoJsonProperties } from 'geojson';
import { useQueryParams, StringParam } from 'use-query-params';
import mapStyles from './MapStyles.json';
import { useLazyGetControlLocationsQuery } from '../../services/control.service';
import { selectLocation, ControlLocationType } from '../../state/modules/control/controlReducer';
import { useAuth } from '../../hooks/useAuth';
import { Marker, ClusterMarker, MyLocation } from './Marker';
import { ControlDetail } from './detail/ControlDetail';
import { agencies } from 'screens/Agencies/mockData';
import { FilterBar } from './FilterBar';

export const centerDefault = {
  lat: 21.027627,
  lng: 105.833166,
};
export const ControlScreen = () => {
  const googleMapRef = useRef<any>();
  const containerMapRef = useRef<HTMLDivElement>();
  const [center, setCenter] = useState(centerDefault);
  const [currentPosition, setCurrentPosition] = useState(centerDefault);
  const [bounds, setBounds] = useState<BBox>();
  const [zoom, setZoom] = useState(10);
  const [selectedLocation, setSelectedLocation] = useState<ControlLocationType>();
  const [loadedGeoService, setLoadedGeoService] = React.useState(false);

  const [trigger] = useLazyGetControlLocationsQuery();
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

  const [query, setQuery] = useQueryParams({
    locationId: StringParam,
  });
  const queryLocationId = query.locationId;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentUser) {
        trigger(
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
      trigger({
        agency_id: currentUser.sub_id,
        // params: {
        //   center_lat: center.lat,
        //   center_lng: center.lng,
        //   visible_radius: 70,
        // },
      });
    }
  }, [trigger, currentUser]);

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
        return '#00A550';
      case 'connected':
        return '#00A550';
      case 'alert':
        return '#DC3545';
      case 'disconnected':
        return '#989898';
      case 'warning':
        return 'orange';
      default:
        return '#989898';
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
          bottom: '50px',
          zIndex: 1,
          width: 'calc(100% - 64px)',
          display: 'flex',
          paddingRight: '10px',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}
        elevation={0}
      >
        {/* {filterExpand ? (
          <Box height={'50px'} width="100%">
            <Box
              display="flex"
              justifyContent={'space-between'}
              pr="16px"
              pl="8px"
              boxShadow={'0px 1px 4px rgba(0, 0, 0, 0.1)'}
            >
              <FilterBar
                filterStatus={filterStatus}
                role={role}
                gwListLength={gwListLength}
                onStatusClick={onStatusClick}
                onFilterExpandClick={onFilterExpandClick}
                filterExpand={filterExpand}
              />
              <Box
                display="flex"
                alignItems="center"
                px="8px"
                style={{ cursor: 'pointer' }}
                onClick={onFilterExpandClick}
              >
                {filterExpand && <ExpandMoreIcon />}
              </Box>
            </Box>
            <FilterMore
              agencies={agencies}
              gatewayTypes={productTypes}
              handleOpenGateway={onClickMarker}
              filtersFormValue={filtersFormValue}
              setFiltersFormValue={setFiltersFormValue}
              handleClearFilter={handleClearFilter}
              handleFilter={handleFilter}
              filteredData={filteredData}
              accessToken={accessToken}
              setAgencyChildenIds={setAgencyChildenIds}
            />
          </Box>
        ) : ( */}
        <Box display={'flex'} position="relative">
          <FilterBar
            locationListLength={statistic}
            onStatusClick={() => {}}
            onFilterExpandClick={() => {}}
            filterExpand={false}
            isFitering={false}
          />
          {/* {isFitering && (
            <Tooltip title="Huỷ bộ lọc">
              <IconButton
                aria-label="clear"
                onClick={handleClearFilter}
                className={cx([styles['btn-map']])}
                style={{
                  right: '-56px',
                  width: '47px',
                  height: '47px',
                }}
              >
                <CancelIcon style={{ color: '#8F0A0C' }} />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>
        {/* )} */}
      </Card>
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
        {/* {locations.map((item) => {
          return (
            <Marker
              key={item.id}
              lat={item.lng}
              lng={item.lat}
              text={item.name}
              color={'#DC3545'}
              name={item.name}
              id={item.id}
              location={item}
              productTypes={[]}
              onMarkerClick={() => {}}
              // showTooltip
            />
          );
        })} */}
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
        {/* 
        {clusters.map((cluster, index) => {
          if (cluster.numPoints === 1) {
            const item = cluster.points[0];
            let color = getColor(item.gatewayStatusId);
            // const gatewayType = productTypes.filter(type => {
            //   return type.id === item.product_type_id;
            // });
            // const gatewayTypeCode = _.upperFirst(
            //   _.get(gatewayType, [0, 'code'], 'GW')
            // );
            // const signal = gatewayTypeCode.match(/\b(\w)/g).join('');
            if (filterStatus === 0 || filterStatus === 5 || filterStatus === item.gatewayStatusId) {
              return (
                <Marker
                  key={item.id}
                  item={item}
                  lat={_.get(item, 'gateway_config.lat')}
                  lng={_.get(item, 'gateway_config.lng')}
                  text={item.name}
                  color={color}
                  name={item.name}
                  id={item.id}
                  gateway={item}
                  productTypes={productTypes}
                  onMarkerClick={onClickMarker}
                  showTooltip
                />
              );
            }
            return null;
          } else {
            return (
              <ClusterMarker
                key={index}
                lat={_.get(cluster, 'y')}
                lng={_.get(cluster, 'x')}
                color="005dff"
                pointCount={cluster.numPoints}
              />
            );
          }
        })} */}
        {/* {(role.name === 'admin' ||
          role.name === 'regulatory_agency_admin' ||
          (role.name === 'agency_admin' && agencyCode === 'CP6GU')) &&
          isShowRa &&
          regulatoryAgencies &&
          regulatoryAgencies.map((item) => {
            const config = JSON.parse(_.get(item, 'configs', '{}'));
            return (
              <RaMaker
                key={item.id}
                lat={config.lat}
                lng={config.lng}
                text={item.name}
                color="#DC3545"
                name={item.name}
                id={item.id}
                ra={item}
                onMarkerClick={onClickRa}
              />
            );
          })} */}
      </GoogleMapReact>
    </Box>
  );
};
