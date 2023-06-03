import React from 'react';
import { Box } from '@mui/material';
import GoogleMapReact from 'google-map-react';
// import supercluster from 'supercluster';
import mapStyles from './MapStyles.json';

export const centerDefault = {
  lat: 21.027627,
  lng: 105.833166,
};
export const ControlScreen = () => {
  const googleMapRef = React.createRef<GoogleMapReact>();
  const [center, setCenter] = React.useState(centerDefault);

  const mapOption = () => {
    return {
      styles: mapStyles,
      disableDefaultUI: true,
      backgroundColor: 'none',
    };
  };

  return (
    <Box
      style={{
        height: 'calc(100vh - 82px)',
        width: ' 100%',
      }}
    >
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
        // onGoogleApiLoaded={onGoogleApiLoaded}
        // onChange={onBoundsChange}
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
            onMarkerClick={_.noop}
          />
        )}
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
        })}
        {(role.name === 'admin' ||
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
