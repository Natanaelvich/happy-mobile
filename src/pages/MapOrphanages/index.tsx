import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import api from '../../services/api';

interface OrphanageProps {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const MapOrphanages: React.FC = () => {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(() => {
    async function loadOrphanages(): Promise<void> {
      const response = await api.get('orphanages');

      setOrphanages(response.data);
      setLoading(false);
    }

    loadOrphanages();
  });

  function handleGotoOrphanage(id: string): void {
    navigation.navigate('OrphanageDetails', {
      orphanageId: id,
    });
  }

  function handleGotocREATEOrphanage(): void {
    navigation.navigate('SelectMapPosition');
  }

  if (loading) {
    return null;
  }

  return (
    <Container>
      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        initialRegion={{
          latitude: -4.2560722,
          longitude: -43.9432955,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={markerImg}
            calloutAnchor={{
              x: 2.8,
              y: 0.8,
            }}
            coordinate={{
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude),
            }}
          >
            <Callout onPress={() => handleGotoOrphanage(orphanage.id)} tooltip>
              <CalloutContainer>
                <CalloutText>{orphanage.name}</CalloutText>
                <CalloutIconButton />
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Footer>
        <FooterText>{orphanages.length} orfanatos encontrados</FooterText>
        <CreateOrphanageButton onPress={handleGotocREATEOrphanage}>
          <PlusIcon />
        </CreateOrphanageButton>
      </Footer>
    </Container>
  );
};

export default MapOrphanages;
