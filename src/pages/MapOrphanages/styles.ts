import { MaterialCommunityIcons } from 'expo-vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  flex: 1;
`;
export const CalloutContainer = styled.View`
  flex-direction: row;
  width: 160px;
  height: 46px;
  justify-content: space-between;
  padding: 12px;
  background: #fff;
  align-items: center;
  border-width: 1px;
  border-color: #0089a5;
  border-radius: 6px;
`;
export const CalloutText = styled.Text`
  font-family: Nunito_700Bold;
  color: #0089a5;
  font-size: 14px;
`;
export const CalloutIconButton = styled(MaterialCommunityIcons).attrs({
  name: 'arrow-right',
  size: 24,
  color: '#0089a5',
})``;
export const Footer = styled.View`
  position: absolute;
  height: 56px;
  bottom: 12px;
  z-index: 999;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 20px;
  width: 80%;
  align-self: center;
  elevation: 2;
`;
export const FooterText = styled.Text`
  font-family: Nunito_700Bold;
  font-size: 15px;
  color: #8fa7b3;
  margin-left: 24px;
`;
export const CreateOrphanageButton = styled(RectButton)`
  width: 56px;
  height: 56px;
  background: #15c3d6;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;
export const PlusIcon = styled(MaterialCommunityIcons).attrs({
  name: 'plus',
  size: 31,
  color: '#fff',
})``;
