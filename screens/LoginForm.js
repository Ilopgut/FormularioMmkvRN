import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,TouchableOpacity,TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Nombre muy corto')
    .max(50, 'Nombre muy largo')
    .required('Nombre requerido'),
  password: Yup.string()
    .min(8, 'Contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Debe contener al menos una mayúscula, una minúscula y un número'
    )
    .required('Contraseña requerida'),

});

export default function LoginForm({navigation}) {
  const [savedName, setSavedName] = useState('');

  return (
    <View style={styles.container}>

        <View style={styles.formContainer}>

            <Text style={styles.formTitle}>Formulario Login</Text>

            <Formik
                initialValues={{
                    fullName:'',
                    password:'',
                }}
                validationSchema={validationSchema}
                onSubmit={(values)=>{
                  navigation.navigate('Home');
                }}
            >

            {( {handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue} )=>{

                const customHandleSubmit = async () => {
                  if(!errors.fullName && !errors.password && values.fullName!='' && values.password!=''){
                      try {
                        await AsyncStorage.setItem('@nombre_usuario', values.fullName);
                        await AsyncStorage.setItem('@password_usuario', values.password);
                      } catch (e) {
                        console.error('Error al guardar los datos:', e);
                      }
                  }

                  // Ahora llamas a handleSubmit para que Formik maneje la validación y el envío
                  handleSubmit();
                };
                return (
                    <View style={styles.formFields}>
                        <Text style={styles.formLabel}>Nombre de usuario</Text>
                        <TextInput
                            value={values.fullName}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            placeholder="Nombre completo"
                        />
                        {touched.fullName && errors.fullName && (
                            <Text style={{color: 'red'}}>{errors.fullName}</Text>
                        )}

                        <Text style={styles.formLabel}>Contraseña</Text>
                        <TextInput
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            placeholder="Contraseña"
                        />
                        {touched.password && errors.password && (
                            <Text style={{color: 'red'}}>{errors.password}</Text>
                        )}

                        <TouchableOpacity style={styles.confirm} onPress={()=>{customHandleSubmit()}}>
                            <Text style={{textAlign:'center',fontWeight:800,fontSize:17,color:'#ddd'}}>Continuar</Text>
                        </TouchableOpacity>

                    </View>
                );
            }}
            </Formik>
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
    formContainer: {
        width:'90%',
        height:300,
        backgroundColor:'#fff',
    },
    formTitle:{
        fontSize:20,
        textAlign:'center',
        marginTop:10,
    },
    formFields:{
        padding:10,
        height:'80%',
        gap:3,
    },
    confirm:{
        backgroundColor:'#008800',
        width:'100%',
        padding:10,
        borderRadius:10,
        position:'absolute',
        bottom:0,
        left:10,

    }
}