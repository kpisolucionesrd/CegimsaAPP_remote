import React, {Component,PureComponent} from 'react';
import {Platform,TouchableOpacity,StyleSheet, Text,ScrollView,AsyncStorage,Image,View} from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';
import { Icon } from 'react-native-elements';
var RNFS=require('react-native-fs');

type Props = {};
export default class GaleriaImagenes extends Component<Props> {

  constructor(props){
    super(props);

    this.state={
      media:{
        "default":require("../imgs/logo.png")
      },
      vectorImagenes:["default"],
      vectorObjetos2:["../imgs/logo.png"]
    }

    this.Initialsconfigurations().then(result=>{

      //Concatenacion del path
      var vectorObjetos=result.map((elemento)=>{
        return "/images/"+elemento
      });

      //Filtro de las imagenes: eliminar las rutas no validas
      var vectorObjetos2=vectorObjetos.filter((valor)=>{
        return valor!=""
      });

      this.setState({
        vectorObjetos2:vectorObjetos2
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
        return "/images/"+elemento
      });

      //Filtro de las imagenes: eliminar las rutas no validas
      var vectorObjetos2=vectorObjetos.filter((valor)=>{
        return valor!=""
      });

      this.setState({
        vectorObjetos2:vectorObjetos2
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

  ActualizarGaleria=async()=>{
    var objetoImagenes={};
    var counting=1;

    //alert("file://"+RNFS.DocumentDirectoryPath+this.state.vectorObjetos2[0])
    
    await this.state.vectorObjetos2.forEach((imagen)=>{
      objetoImagenes["img"+1]={uri:"File://"+RNFS.DocumentDirectoryPath+imagen}
    });
    

    this.setState({
      media:objetoImagenes,
      vectorImagenes:Object.keys(objetoImagenes)
    })

    alert("Actualizado")
  }

  render() {
    const imagen={uri:"file://"+RNFS.DocumentDirectoryPath+this.state.vectorObjetos2[0]}
    return (
      <View>

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={this.ActualizarGaleria}
        >
          <Icon 
            name="ios-contacts"
            type="ionicon"
            color="white"
            size={60}
          />
          <Text style={{color:'white',fontWeight:'bold',fontSize:50,lineHeight:80}}>Actualizar</Text>
        </TouchableOpacity>

        {
          this.state.vectorImagenes.map((valor)=>{
            return(<Image source={this.state.media[valor]} style={styles.imgGaleria}/>)
          })
        }
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
    },
    imgGaleria:{
      width:100,
      height:100,
      marginLeft:10,
      marginTop:10
    }
  });