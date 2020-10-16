import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { useNavigation } from '@react-navigation/native';
import {
  Container,
  CalloutContainer,
  CalloutIconButton,
  CalloutText,
  CreateOrphanageButton,
  Footer,
  FooterText,
  PlusIcon,
} from './styles';
import markerImg from '../../assets/Local.png';

const MapOrphanages: React.FC = () => {
  const navigation = useNavigation();

  function handleGotoOrphanage(): void {
    navigation.navigate('OrphanageDetails');
  }

  function handleGotocREATEOrphanage(): void {
    navigation.navigate('OrphanageData');
  }
  return (
    <Container>
      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        initialRegion={{
          latitude: -4.256351899999999,
          longitude: -43.9323455,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={markerImg}
          calloutAnchor={{
            x: 2.8,
            y: 0.8,
          }}
          coordinate={{
            latitude: -4.256351899999999,
            longitude: -43.9323455,
          }}
        >
          <Callout onPress={handleGotoOrphanage} tooltip>
            <CalloutContainer>
              <CalloutText>LAR DAS MENINAS</CalloutText>
              <CalloutIconButton />
            </CalloutContainer>
          </Callout>
        </Marker>
      </MapView>

      <Footer>
        <FooterText>2 orfanatos encontrados</FooterText>
        <CreateOrphanageButton onPress={handleGotocREATEOrphanage}>
          <PlusIcon />
        </CreateOrphanageButton>
      </Footer>
    </Container>
  );
};

export default MapOrphanages;
