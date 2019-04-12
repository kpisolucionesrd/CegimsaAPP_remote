import React, {Component,PureComponent} from 'react';
import {Platform,TouchableOpacity,StyleSheet, Text,ScrollView,AsyncStorage,Image,View} from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';
var RNFS=require('react-native-fs');
import img from '../imgs/logo.png';



type Props = {};
export default class GaleriaImagenes extends Component<Props> {

  constructor(props){
    super(props);

    this.state={
      media:["prueba","prueba1"],
      media2:["../imgs/logo.png"]
    }

    this.Initialsconfigurations().then(result=>{

      var vectorObjetos=result.map((elemento)=>{
        return RNFS.DocumentDirectoryPath+"/images/"+elemento
      });

      var vectorObjetos2=vectorObjetos.filter((valor)=>{
        return valor!=""
      })

      this.setState({
        media:vectorObjetos2
      });
    });
  }
  
  static navigationOptions = {
    title: 'Galeria Imagenes',
  };

  async componentDidMount(){
    this.Initialsconfigurations().then(result=>{

      //Concatenacion del path
      var vectorObjetos=result.map((elemento)=>{
        return RNFS.DocumentDirectoryPath+"/images/"+elemento
      });

      //Filtro de las imagenes: eliminar las rutas no validas
      var vectorObjetos2=vectorObjetos.filter((valor)=>{
        return valor!=""
      });

      //Creando objeto con los requires


      this.setState({
        media:vectorObjetos2
      });
    });
  };

  /* Configuraciones Iniciales */
  Initialsconfigurations=async()=>{
      const { navigation } = this.props;
      const jugador = navigation.getParam('jugador', 'NO-ID');

      /* Extrayendo Equipos */
      var objetoImagenes=await JSON.parse(await AsyncStorage.getItem("objetoImagenesJugador"));
      var jugadoresConImagenes=await Object.keys(objetoImagenes);

      if(jugadoresConImagenes.includes(jugador)){
        var vector=await objetoImagenes[jugador]
        return vector;
      }else{
          alert("No hay Jugadores para mostrar");
          return ["No Hay Jugadores"]
      }
  };

  prueba=async()=>{
    //alert(await AsyncStorage.getItem("objetoImagenesJugador"));
    this.state.media.map((valor)=>{
      alert(JSON.stringify(valor));
    })
    //await AsyncStorage.clear();

    // { this.state.media.map((valor)=>{
    //   return(<Image source={require(valor)}/>)
    //   })
    // }
  }

  render() {
    
    return (
      <View>
        <Image source={require("../imgs/logo.png")}/>
        { this.state.media.map((valor)=>{
          return(<Image source={{uri:valor}}/>)
          })
        }
        <Text onPress={this.prueba}>ACTUAL</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-around',
      alignItems:'center'
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
      backgroundColor:'darkblue',
      width:'70%',
      height:'35%',
      marginLeft:'auto',
      marginRight:'auto',
      alignItems: 'center',
      paddingTop: 10,
      marginBottom:'5%'
    },
    labelMenu:{
      color:'white',
      fontWeight:'bold',
      fontSize:25,
      marginBottom:5
    },
  });