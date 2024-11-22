import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';

export default function LoginForm({navigation}) {
  return (
    <View style={styles.container}>
    
          <Text>Formulario Login</Text>
          <Button onPress={()=>{navigation.navigate('Home')}} title='Home'/>
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