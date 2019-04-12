import React, {Component,PureComponent} from 'react';
import {Platform,TouchableOpacity,StyleSheet, Text,ScrollView,AsyncStorage,Image,View} from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';
var RNFS=require('react-native-fs');



type Props = {};
export default class GaleriaImagenes extends Component<Props> {

  constructor(props){
    super(props);

    this.state={
      media:["prueba","prueba1"],
      media2:["prueba","prueba1"]
    }

    this.Initialsconfigurations().then(result=>{

      var vectorObjetos=result.map((elemento)=>{
        return RNFS.DocumentDirectoryPath+"/images/"+elemento
      });

      this.setState({
        media:vectorObjetos
      });
    });
  }
  
  static navigationOptions = {
    title: 'Galeria Imagenes',
  };

  async componentDidMount(){
    this.Initialsconfigurations().then(result=>{

      var vectorObjetos=result.map((elemento)=>{
        return RNFS.DocumentDirectoryPath+"/images/"+elemento
      });

      this.setState({
        media:vectorObjetos
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
    alert(JSON.stringify(this.state.media));
  }

  render() {
   
    return (
      <View>
        { this.state.media2.map((valor)=>{
          return(<Text>{valor}</Text>)
        })
        }
        <Text onPress={this.prueba}>ACTUAL</Text>
      </View>

      // <PhotoBrowser
      //   mediaList={media}
      //   startOnGrid={true}
      // />
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