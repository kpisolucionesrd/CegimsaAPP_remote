import React, {Component,PureComponent} from 'react';
import {Platform,TouchableOpacity,StyleSheet, Text,ScrollView,AsyncStorage,Image,View} from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';
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
        return RNFS.DocumentDirectoryPath+"/images/"+elemento
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

  prueba=async()=>{
    var objetoImagenes={};
    var counting=1;

    alert(RNFS.DocumentDirectoryPath+"File://"+this.state.vectorObjetos2[0])
    //"../imgs/logo.png"
    objetoImagenes["default"]={uri:RNFS.DocumentDirectoryPath+"File://"+this.state.vectorObjetos2[0]}

    this.setState({
      media:objetoImagenes
    })
    
    // this.state.vectorObjetos2.forEach(element => {
    //   objetoImagenes["img"]=require("../imgs/logo.png");
    //   alert(element);
    // });

    // await this.state.vectorObjetos2.forEach(img => {
    //   objetoImagenes["img"+counting]=require(img)
    // });

    // setTimeout(() => {
    //   this.setState({
    //     media:objetoImagenes,
    //     vectorImagenes:Object.keys(objetoImagenes)

    //   })
    // }, 2000);
  }

  render() {
    
    return (
      <View>
       
        { this.state.vectorImagenes.map((valor)=>{
          return(<Image source={this.state.media[valor]}/>)
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