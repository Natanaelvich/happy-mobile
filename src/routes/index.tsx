import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapOrphanages from '../pages/MapOrphanages';
import Orphanage from '../pages/Orphanage';
import OrphanageData from '../pages/OrphanageData';
import OrphanageDetails from '../pages/OrphanageDetails';
import SelectMapPosition from '../pages/SelectMapPosition';
import Header from '../components/Header';

const Stack = createStackNavigator();
const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f2f3f5' },
        }}
      >
        <Stack.Screen name="MapOrphanages" component={MapOrphanages} />
        <Stack.Screen name="Orphanage" component={Orphanage} />
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => <Header title="Adicione um orfanato" />,
          }}
          name="OrphanageData"
          component={OrphanageData}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => <Header title="Orfanato" />,
          }}
          name="OrphanageDetails"
          component={OrphanageDetails}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => <Header title="Adicione um orfanato" />,
          }}
          name="SelectMapPosition"
          component={SelectMapPosition}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
