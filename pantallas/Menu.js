import React from 'react';
import img from '../imgs/logo.png';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,AsyncStorage
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class Menu extends React.Component {
  static navigationOptions = {
    header: null,
  };

  irRegistrarEquipo=async()=>{
    this.props.navigation.navigate('AgregarEquipo');
  };

  irRegistrarJugador=async()=>{
    this.props.navigation.navigate('AgregarJugador');
  };

  irAgregarFotosVideos=async()=>{
    this.props.navigation.navigate('AgregarFotos');
  };

  irEstadisticasEquipos=async()=>{
    this.props.navigation.navigate('Equipos');
  };

  render() {
    //AsyncStorage.clear()
    return (
      <View style={styles.container}>
        <Image source={img} style={styles.logoIMG}/>

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={this.irRegistrarEquipo}
        >
          <Icon 
            name="ios-contacts"
            type="ionicon"
            color="white"
            size={60}
          />
          <Text style={{color:'white',fontWeight:'bold',fontSize:50,lineHeight:80}}>Registrar Equipo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={this.irRegistrarJugador}
        >
          <Text style={{color:'white',fontWeight:'bold',fontSize:50,lineHeight:80}}>Registrar Jugador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={this.irAgregarFotosVideos}
        >
          <Text style={{color:'white',fontWeight:'bold',fontSize:50,lineHeight:80}}>Agregar Fotos & Videos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={this.irEstadisticasEquipos}
        >
          <Text style={{color:'white',fontWeight:'bold',fontSize:50,lineHeight:80}}>Estadísticas</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(15,24,130)',
  },
  logoIMG:{
    resizeMode:'contain',
    width:'50%',
    marginLeft:'auto',
    marginRight:'auto',
    height:'30%',
    marginBottom:'25%'
  },
  btnMenu:{
    backgroundColor:'rgb(236,73,16)',
    width:'70%',
    height:'18%',
    marginLeft:'auto',
    marginRight:'auto',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom:'5%',
    shadowColor:'black',
    shadowOffset:{
      width:5,
      height:5
    },
    shadowOpacity:15

  }
});