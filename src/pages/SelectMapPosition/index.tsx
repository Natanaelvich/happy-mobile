import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import styles from './styles';

import mapMarkerImg from '../../assets/Local.png';

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  function handleNextStep(): void {
    navigation.navigate('OrphanageData', {
      location,
    });
  }

  function handleSelectMapPosition(e: MapEvent): void {
    const { longitude, latitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -4.2560722,
          longitude: -43.9432955,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {location.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>

      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </View>
  );
};

export default SelectMapPosition;
