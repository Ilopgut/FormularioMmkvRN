import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
    const [nombreUsuario,setNombreUsuario] = useState('');
    const [passUsuario,setPassUsuario] = useState('');

    const resetData = async () => {
        try {
          //resetear los datos guardados en AsyncStorage
          await AsyncStorage.removeItem('@nombre_usuario');
          await AsyncStorage.removeItem('@password_usuario');
          setNombreUsuario('');
          setPassUsuario('');
          navigation.navigate('Login');
        } catch (e) {
          console.error('Error al borrar los datos:', e);
        }
    }

    useEffect(()=>{
        const recogerDatos = async () => {
            try {
                 //resetear los datos guardados en AsyncStorage
                  setNombreUsuario(await AsyncStorage.getItem('@nombre_usuario'));
                  setPassUsuario(await AsyncStorage.getItem('@password_usuario'));
                } catch (e) {
                  console.error('Error al recoger los datos:', e);
                }
            }

        recogerDatos();
    },[]);

  return (
    <View style={styles.container}>
        <View style={styles.HomeContent}>
          <Text>Bienvenido</Text>
          <Text>Nombre: {nombreUsuario}</Text>
          <Text>Contraseña: {passUsuario}</Text>
          <TouchableOpacity style={styles.closeSession} onPress={()=>{resetData()}}>
            <Text style={{textAlign:'center',fontWeight:800,fontSize:17,color:'white'}}>Cerrar sesion</Text>
          </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = {
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ddd',
    },
    HomeContent: {
        padding:10,
        justifyContent:'space-around',
        width:'90%',
        height:300,
        backgroundColor:'#fff',
    },
    closeSession:{
        backgroundColor:'#ee5555',
        width:'100%',
        padding:10,
        borderRadius:10,

    }
}