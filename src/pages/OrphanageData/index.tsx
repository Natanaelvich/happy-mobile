import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Feather } from 'expo-vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import styles from './styles';
import api from '../../services/api';

interface LocationProps {
  location: {
    latitude: number;
    longitude: number;
  };
}

const OrphanageData: React.FC = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as LocationProps;

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instruction, setInstruction] = useState('');
  const [open_on_weekends, setOpen_on_weekends] = useState(true);
  const [open_hours, setOpen_hours] = useState('');
  const [images, setImages] = useState<string[]>([]);

  async function pickImage(): Promise<void> {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Descule, nós precisamos da sua permisão para continuar!');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setImages(oldimages => [...oldimages, result.uri]);
    }
  }

  async function createNewOrphanage(): Promise<void> {
    const { location } = params;
    const { latitude, longitude } = location;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instruction);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('open_hours', open_hours);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    images.map((i, index) =>
      data.append('images', {
        name: `image_${index}`,
        type: 'image/jpg',
        uri: i,
      } as any),
    );

    await api.post('orphanages', data);

    Alert.alert('Orfanado cadastrado');

    navigation.dispatch(StackActions.popToTop());
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        value={about}
        onChangeText={text => setAbout(text)}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput
      value={}
      onChangeText={text => set(text)}
      style={styles.input} /> */}

      <Text style={styles.label}>Fotos</Text>
      <TouchableOpacity style={styles.imagesInput} onPress={pickImage}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingVertical: 9 }}
        persistentScrollbar
      >
        {images.map(i => (
          <Image
            key={i}
            source={{ uri: i }}
            style={{ width: 100, height: 100, marginLeft: 12, borderRadius: 6 }}
          />
        ))}
      </ScrollView>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        value={instruction}
        onChangeText={text => setInstruction(text)}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        value={open_hours}
        onChangeText={text => setOpen_hours(text)}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          onValueChange={() => setOpen_on_weekends(!open_on_weekends)}
          value={open_on_weekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={createNewOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
};

export default OrphanageData;
