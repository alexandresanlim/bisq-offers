import { LinearGradient } from 'expo-linear-gradient'
import CurrentBTCPrice from '@/components/CurrentBTCPrice';
import Bullet from '@/components/Bullet';
import { StyleSheet, Button, Alert, View, Text, TouchableOpacity } from 'react-native';


const Header = (props: any) => {
  const { onPress, title = 'Save' } = props;

  return (
    <LinearGradient colors={['#1c8429', '#000']} style={styles.header}>
      <View style={{ backgroundColor: 'transparent' }}>
        <View style={{ flexDirection: 'row', backgroundColor: 'transparent', marginTop: 8 }}>
          <Bullet color='red' size={8} /><Text style={[styles.title, { fontWeight: 'bold' }]}>Live </Text><Text style={styles.title}>USD Bitcoin price</Text>
        </View>
        <CurrentBTCPrice />
        
      </View>
      <View style={{ flexDirection: 'row', backgroundColor:'transparent', marginTop:8 }}>
          <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#2cb43870', padding: 16, borderRadius: 16, marginHorizontal:4 }}>
            <Text style={styles.selectedPair}>BRL - BTC</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#2cb43870', padding: 16, borderRadius: 16, marginHorizontal:4 }}>
            <Text style={styles.selectedPair}>ABOUT BISQ</Text>
          </TouchableOpacity>
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    alignItems: 'center',
  },
  title: {
    color: '#fff'
  },
  selectedPair: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default Header;