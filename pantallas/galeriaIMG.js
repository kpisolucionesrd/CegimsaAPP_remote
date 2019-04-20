import React, {Component,PureComponent} from 'react';
import {Platform,TouchableOpacity,StyleSheet,ScrollView,AsyncStorage,Image,View,Modal,Dimensions} from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';
import ImageZoom from 'react-native-image-pan-zoom';
import PhotoView from 'react-native-photo-view';
import { Icon } from 'react-native-elements';
import Video from 'react-native-video';
var RNFS=require('react-native-fs');

type Props = {};
export default class GaleriaImagenes extends Component<Props> {

  constructor(props){
    super(props);

    this.state={
      media:{
        "imagenDefault":require("../imgs/logo.png")
      },
      mediaVideos:{
        "videoDefault":require("../imgs/videoPrueba.mov")
      },
      vectorImagenesName:["imagenDefault"],
      vectorVideosName:["videoDefault"],
      vectorImagenes:["../imgs/logo.png"],
      vectorVideos:["../imgs/videoPrueba.mov"],
      modalVisible:false,
      modalVisibleVideo:false,
      imgModal:require("../imgs/logo.png"),
      videoModal:require("../imgs/videoPrueba.mov")
    }

    this.Initialsconfigurations().then(result=>{

      //Concatenacion del path
      var vectorObjetos=result.map((elemento)=>{
        return "/images/"+elemento
      });

      //Filtro de las imagenes: eliminar las rutas no validas
      var vectorImagenes=vectorObjetos.filter((valor)=>{
        return valor!="" && (valor.includes("jpg") || valor.includes("png"))
      });

      //Filtro de los videos: eliminar las rutas no validas y tomar solo los videos
      var vectorVideos=vectorObjetos.filter((valor)=>{
        return (valor.includes(".MOV") || valor.includes(".mov"))
      });
      
      //Estado Imagenes
      if(vectorImagenes.length>0){
        this.setState({
          vectorImagenes:vectorImagenes
        })
      }

      //Estado Videos
      if(vectorVideos.length>0){
        this.setState({
          vectorVideos:vectorVideos
        })
      }
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

      //Filtro de las imagenes: eliminar las rutas no validas y tomar solo las imagenes
      var vectorImagenes=vectorObjetos.filter((valor)=>{
        return valor!="" && (valor.includes("jpg") || valor.includes("png"))
      });


      //Filtro de los videos: eliminar las rutas no validas y tomar solo los videos
      var vectorVideos=vectorObjetos.filter((valor)=>{
        return (valor.includes(".MOV") || valor.includes(".mov"))
      });


      //Estado Imagenes
      if(vectorImagenes.length>0){
        this.setState({
          vectorImagenes:vectorImagenes
        })
      }

      //Estado Videos
      if(vectorVideos.length>0){
        this.setState({
          vectorVideos:vectorVideos
        })
      }
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
    var objetoVideos={};
    var counting=1;

    //IMAGENES
    await this.state.vectorImagenes.forEach(async (imagen)=>{
      objetoImagenes["img"+counting]=await {uri:"File://"+RNFS.DocumentDirectoryPath+imagen}
      counting=counting+1
    });

    //VIDEOS
    await this.state.vectorVideos.forEach(async (video)=>{
      if(video!="../imgs/videoPrueba.mov"){
        objetoVideos["vid"+counting]=await {uri:RNFS.DocumentDirectoryPath+video}
      }
      counting=counting+1
    });

    await this.setState({
      media:await objetoImagenes,
      mediaVideos:await objetoVideos,
      vectorImagenesName:await Object.keys(objetoImagenes),
      vectorVideosName:await Object.keys(objetoVideos)
    });
  };

  mostrarImagen=async(imagen)=>{
    this.setState({
      imgModal:this.state.media[imagen],
      modalVisible:true
    })
  }

  mostrarVideo=async(video)=>{
    this.setState({
      videoModal:this.state.mediaVideos[video],
      modalVisibleVideo:true
    })
  }

  render() {
    return (
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <ScrollView style={{marginTop: 22}}>
            <View>
            <PhotoView
              source={this.state.imgModal}
              minimumZoomScale={1}
              maximumZoomScale={3}
              onLoad={() => console.log("Image loaded!")}
              style={{width:'100%', height: 1500,marginBottom:20}} />
            </View>

          <TouchableOpacity
            style={styles.btnModal}
            onPress={()=>{
              this.setState({
                modalVisible:false
              })
            }}
          >
            <Icon 
              name="ios-close-circle"
              type="ionicon"
              color="white"
              size={60}
            />
          </TouchableOpacity>

          </ScrollView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisibleVideo}
        >
          <ScrollView style={{marginTop: 22}}>
            <View>
            <Video source={this.state.videoModal}
                  ref={(ref) => {
                    this.player = ref
                  }}
                  onBuffer={this.onBuffer}
                  onError={this.videoError}
                  style={{width:'100%',height:700,marginLeft:'auto',marginRight:'auto',marginBottom:10}}/>
            </View>

          <TouchableOpacity
            style={styles.btnModal}
            onPress={()=>{
              this.setState({
                modalVisibleVideo:false
              })
            }}
          >
            <Icon 
              name="ios-close-circle"
              type="ionicon"
              color="white"
              size={60}
            />
          </TouchableOpacity>

          </ScrollView>
        </Modal>

        <TouchableOpacity
          style={styles.btnModal}
          onPress={this.ActualizarGaleria}
        >
          <Icon 
            name="ios-refresh-circle"
            type="ionicon"
            color="white"
            size={60}
          />
        </TouchableOpacity>


        <View style={styles.container}>
          {
            this.state.vectorImagenesName.map((valor)=>{
              if(valor!="imagenDefault"){
              return(
                <TouchableOpacity onPress={()=>
                  {
                    this.mostrarImagen(valor)
                  }
                }>
                  <Image source={this.state.media[valor]} style={styles.imgGaleria}/>
                </TouchableOpacity>
              )}
            })
          }
          {
            this.state.vectorVideosName.map((valor)=>{
              if(valor!="videoDefault"){
              return(
                <TouchableOpacity onPress={()=>
                  {
                    this.mostrarVideo(valor)
                  }
                }>
                <Video source={this.state.mediaVideos[valor]}
                  ref={(ref) => {
                    this.player = ref
                  }}
                  onBuffer={this.onBuffer}
                  onError={this.videoError}
                  style={styles.backgroundVideo}/>
                </TouchableOpacity>
              )}
            })
          }

        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'row'
    },
    btnModal:{
      backgroundColor:'rgb(236,73,16)',
      width:'40%',
      height:100,
      marginLeft:'auto',
      marginRight:'auto',
      alignItems: 'center',
      paddingTop: 5,
      marginBottom:'5%',
      shadowColor:'black',
      shadowOffset:{
        width:5,
        height:5
      },
      shadowOpacity:15
    },
    backgroundVideo: {
      width:100,
      height:100,
      marginLeft:10,
      marginTop:10
    },
    imgGaleria:{
      width:100,
      height:100,
      marginLeft:10,
      marginTop:10
    }
  });