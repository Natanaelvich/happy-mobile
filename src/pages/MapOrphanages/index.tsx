import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import env from '../../../env';
import {
  Container,
  CalloutContainer,
  CalloutIconButton,
  CalloutText,
  CreateOrphanageButton,
  Footer,
  FooterText,
  PlusIcon,
  Input,
  Label,
  ButtonSubmit,
  ButtonSubmitText,
  Form,
  StateCity,
  ButtonEditStateCity,
  IconEdit,
  StateCityContainer,
  Logo,
} from './styles';
import markerImg from '../../assets/Local.png';
import api from '../../services/api';
import logo from '../../assets/Local.png';
import imageBg from '../../assets/bg-mobile.png';

interface OrphanageProps {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}
interface LocationProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

const MapOrphanages: React.FC = () => {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);
  const [cep, setCep] = useState('');
  const [cidadeEstado, setCidadeEstado] = useState('');
  const [location, setLocation] = useState<LocationProps>({
    latitude: undefined,
    longitude: undefined,
  });

  const [loading, setLoading] = useState(true);
  const [loadingGetStateCity, setLoadingGetStateCity] = useState(false);

  useEffect(() => {
    async function loadStorageLocation(): Promise<void> {
      const locationStorage = await AsyncStorage.getItem('@happy:location');

      const cityStorage = await AsyncStorage.getItem('@happy:city');

      if (locationStorage) {
        setLocation(JSON.parse(locationStorage));
      }
      if (cityStorage) {
        setCidadeEstado(cityStorage);
      }
    }

    loadStorageLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const getOrphanages = async (): Promise<void> => {
        const response = await api.get('orphanages');
        setOrphanages(response.data);
        setLoading(false);
      };

      getOrphanages();
    }, []),
  );

  async function getCityStateAndCoords(): Promise<void> {
    try {
      setLoadingGetStateCity(true);

      const cidade = await api.post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&language=pt&key=${env.REACT_APP_GOOGLE_MAP_TOKEN}`,
      );

      const city = cidade.data.results[0].formatted_address.split(',')[0];

      await AsyncStorage.setItem('@happy:city', city);

      setCidadeEstado(city);
      const cityCoords = await api.post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${env.REACT_APP_GOOGLE_MAP_TOKEN}`,
      );

      const locationCoords = cityCoords.data.results[0].geometry.location;

      await AsyncStorage.setItem(
        '@happy:location',
        JSON.stringify({
          latitude: locationCoords.lat,
          longitude: locationCoords.lng,
        }),
      );

      setLocation({
        latitude: locationCoords.lat,
        longitude: locationCoords.lng,
      });
    } catch (error) {
      Alert.alert('Ops!', 'Nenhuma cidade ou estado encontrado');
    } finally {
      setLoadingGetStateCity(false);
    }
  }

  function handleGotoOrphanage(id: string): void {
    navigation.navigate('OrphanageDetails', {
      orphanageId: id,
    });
  }

  function handleGotoCreateOrphanage(): void {
    navigation.navigate('SelectMapPosition');
  }

  function editCep(): void {
    setLocation({
      latitude: undefined,
      longitude: undefined,
    });
  }

  if (loading) {
    return null;
  }

  return (
    <Container source={imageBg}>
      {location.latitude && location.longitude ? (
        <>
          <StateCityContainer>
            <StateCity>{cidadeEstado}</StateCity>
            <ButtonEditStateCity onPress={editCep}>
              <IconEdit />
            </ButtonEditStateCity>
          </StateCityContainer>

          <MapView
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
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
                <Callout
                  onPress={() => handleGotoOrphanage(orphanage.id)}
                  tooltip
                >
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
            <CreateOrphanageButton onPress={handleGotoCreateOrphanage}>
              <PlusIcon />
            </CreateOrphanageButton>
          </Footer>
        </>
      ) : (
        <Form>
          <Logo resizeMode="contain" source={logo} />
          <Label>Digite seu CEP</Label>
          <Input value={cep} onChangeText={(text: string) => setCep(text)} />

          <ButtonSubmit onPress={getCityStateAndCoords}>
            {loadingGetStateCity ? (
              <ActivityIndicator
                size="large"
                color="#fff"
                animating={loadingGetStateCity}
              />
            ) : (
              <ButtonSubmitText>Cadastrar</ButtonSubmitText>
            )}
          </ButtonSubmit>
        </Form>
      )}
    </Container>
  );
};

export default MapOrphanages;
