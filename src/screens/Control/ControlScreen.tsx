import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { PointFeature } from 'supercluster';
import { useSelector } from 'react-redux';
import useSupercluster from 'use-supercluster';
import { BBox, GeoJsonProperties } from 'geojson';
import mapStyles from './MapStyles.json';
import { useLazyGetControlLocationsQuery } from '../../services/control.service';
import { selectLocation, ControlLocationType } from '../../state/modules/control/controlReducer';
import { useAuth } from '../../hooks/useAuth';
import { Marker, ClusterMarker, MyLocation } from './Marker';
import { ControlDetail } from './detail/ControlDetail';

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

  const locations = useSelector(selectLocation);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentUser && center) {
        trigger({
          agency_id: currentUser.sub_id,
          params: {
            center_lat: center.lat,
            center_lng: center.lng,
            visible_radius: 70,
            // visible_radius: (containerMapRef.current?.offsetWidth || 100) / 2,
          },
        });
      }
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (currentUser && center) {
      trigger({
        agency_id: currentUser.sub_id,
        params: {
          center_lat: center.lat,
          center_lng: center.lng,
          visible_radius: 70,
        },
      });
    }
  }, [trigger, currentUser, center]);

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
          coordinates: [location.lat, location.lng],
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
      case 'alert':
        return '#DC3545';
      default:
        return '#00A550';
    }
  };

  console.log(points);
  console.log(locations);

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
          onClose={() => setSelectedLocation(undefined)}
        />
      )}
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
              lat={location.lng}
              lng={location.lat}
              text={location.name}
              color={color}
              name={location.name}
              id={location.id}
              location={location}
              onMarkerClick={(localtion: ControlLocationType) => setSelectedLocation(localtion)}
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
