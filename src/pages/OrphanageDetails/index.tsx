import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from 'expo-vector-icons';

import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import mapMarkerImg from '../../assets/Local.png';

import styles from './styles';
import api from '../../services/api';

interface OrphanageProps {
  latitude: number;
  longitude: number;
  id: string;
  name: string;
  about: string;
  instructions: string;
  open_on_weekends: string;
  open_hours: string;
  images: [
    {
      id: string;
      path: string;
      avatar_url: string;
    },
  ];
}

interface OrphanageParams {
  orphanageId: string;
}

const OrphanageDetails: React.FC = () => {
  const route = useRoute();
  const params = route.params as OrphanageParams;

  const [orphanage, setOrphanage] = useState<OrphanageProps | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrphanage(): Promise<void> {
      try {
        const { orphanageId } = params;

        const response = await api.get(`orphanages/${orphanageId}`);

        setOrphanage(response.data);
      } finally {
        setLoading(false);
      }
    }

    loadOrphanage();
  }, [params]);

  if (loading) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>
      {orphanage && (
        <>
          <View style={styles.imagesContainer}>
            <ScrollView horizontal pagingEnabled>
              {orphanage.images.map(i => (
                <Image
                  key={i.id}
                  style={styles.image}
                  source={{
                    uri: __DEV__
                      ? i.avatar_url.replace('localhost', '10.0.3.2')
                      : i.avatar_url,
                  }}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{orphanage.name}</Text>
            <Text style={styles.description}>{orphanage.about}</Text>

            <View style={styles.mapContainer}>
              <MapView
                initialRegion={{
                  latitude: Number(orphanage.latitude),
                  longitude: Number(orphanage.longitude),
                  latitudeDelta: 0.008,
                  longitudeDelta: 0.008,
                }}
                zoomEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                rotateEnabled={false}
                style={styles.mapStyle}
              >
                <Marker
                  icon={mapMarkerImg}
                  coordinate={{
                    latitude: Number(orphanage.latitude),
                    longitude: Number(orphanage.longitude),
                  }}
                />
              </MapView>

              <RectButton
                onPress={() => {
                  Linking.openURL(
                    `https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`,
                  );
                }}
                style={styles.routesContainer}
              >
                <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
              </RectButton>
            </View>

            <View style={styles.separator} />

            <Text style={styles.title}>Instruções para visita</Text>
            <Text style={styles.description}>{orphanage.instructions}</Text>

            <View style={styles.scheduleContainer}>
              <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
                <Feather name="clock" size={40} color="#2AB5D1" />
                <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
                  Segunda à Sexta {orphanage.open_hours}
                </Text>
              </View>
              {orphanage.open_on_weekends && (
                <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                  <Feather name="info" size={40} color="#39CC83" />
                  <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                    Atendemos fim de semana
                  </Text>
                </View>
              )}
            </View>

            {/* <RectButton
          style={styles.contactButton}
          onPress={() => {
            console.log('teste');
          }}
        >
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton> */}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default OrphanageDetails;
