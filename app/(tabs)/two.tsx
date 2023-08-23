import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import OfferList, { Operation } from '@/components/OfferList';
import Header from '@/components/Header';

export default function TabTwoScreen() {
  return (
    <View style={styles.containerMain}>
      <Header />
      <OfferList fiat='brl' crypto='btc' operation={Operation.Buy} />

    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  }
});
