import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapOrphanages from '../pages/MapOrphanages';
import Orphanage from '../pages/Orphanage';

const Stack = createStackNavigator();
const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: { backgroundColor: '#312e38' },
        }}
      >
        <Stack.Screen name="MapOrphanages" component={MapOrphanages} />
        <Stack.Screen name="Orphanage" component={Orphanage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
