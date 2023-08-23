import { StyleSheet} from 'react-native';
import { View } from '@/components/Themed';

export function Separator(){
    return(
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    )
}

const styles = StyleSheet.create({
    separator: {
      marginTop: 10,
      height: 1,
      width: '80%',
    },
  });