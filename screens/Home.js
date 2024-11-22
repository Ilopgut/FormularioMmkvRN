import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
          <Text>Bienvenido</Text>
          <Button onPress={()=>{navigation.navigate('Login')}} title='Volver al login'/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = {
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
}