import React from 'react';
import { ScrollView, StyleSheet,Text,TouchableOpacity,AsyncStorage,ImagePickerIOS,CameraRoll } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements';

export default class AgregarFotos extends React.Component {
  constructor(props){
    super(props);
    this.state={
      equipos:["Sin Equipo"],
      jugadores:["Sin Jugador"],
      ojbetoEquipos:{},
      JugadorSeleccionado:null,
      EquipoSeleccionado:null,
      vectorFotos:[]
    }
    this.Initialsconfigurations().then(result=>{
      this.setState({
        equipos:result["equipos"],
        ojbetoEquipos:result["ojbetoEquipos"]
      });
    });
  };
  
  async componentDidUpdate(prevProps) {
    /* Extrayendo Equipos */
    var equipos=JSON.parse(await AsyncStorage.getItem("Equipos"));
    var ojbetoEquipos=JSON.parse(await AsyncStorage.getItem("ObjetoEquipos"));
    if(equipos==null || ojbetoEquipos==null){
      this.setState({
        equipos:[""],
        ojbetoEquipos:[""]
      })
    }else{
    this.setState({
      equipos:equipos,
      ojbetoEquipos:ojbetoEquipos
    })
    }
  }

  static navigationOptions = {
    title: 'Agregar Fotos/Videos Jugador',
  };

  /* Configuraciones Iniciales */
  Initialsconfigurations=async()=>{

    /* Extrayendo Equipos */
    var equipos=JSON.parse(await AsyncStorage.getItem("Equipos"));
    var ojbetoEquipos=JSON.parse(await AsyncStorage.getItem("ObjetoEquipos"));
    if(equipos==null || ojbetoEquipos==null){
      return{
        equipos:["Equipo Default","defaul1"],
        ojbetoEquipos:{}
      }
    }
    return{
      equipos:equipos,
      ojbetoEquipos:ojbetoEquipos
    }
  };

  /* Seleccionar Imagen */
  _pickImage = async () => {
    
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    var objetoImagenesJugador=await JSON.parse(await AsyncStorage.getItem("objetoImagenesJugador"));
    var JugadorSeleccionado=this.state.JugadorSeleccionado;
    var EquipoSeleccionado=this.state.EquipoSeleccionado;
    var vectorFotos=this.state.vectorFotos;
    if(JugadorSeleccionado!=null && EquipoSeleccionado!=null){
      ImagePicker.launchImageLibrary(options,async(result)=>{

      if (!result.didCancel) {
          const URI=String(result.uri)
          /* Verificar si el objetoImagenesJugador es null */
          if(objetoImagenesJugador==null){
            let objetoImagenesJugador={}
            let vectorImagenes=[];
  
            objetoImagenesJugador[JugadorSeleccionado]=vectorImagenes.push(URI);
            await AsyncStorage.setItem("objetoImagenesJugador",await JSON.stringify(objetoImagenesJugador));
            alert(URI);
            alert(JugadorSeleccionado)
            this.setState({
              JugadorSeleccionado:null,
              EquipoSeleccionado:null,
              vectorFotos:vectorFotos.push(URI)
            })
          }else{
            /* Si el Jugador estaba en el objeto */
            var jugadoresConImgs=await Object.keys(objetoImagenesJugador);
            if(jugadoresConImgs.includes(JugadorSeleccionado)){
              alert(URI);
              alert(JugadorSeleccionado);

              objetoImagenesJugador[JugadorSeleccionado].push(URI);
              await AsyncStorage.setItem("objetoImagenesJugador",await JSON.stringify(objetoImagenesJugador));
              this.setState({
                JugadorSeleccionado:null,
                EquipoSeleccionado:null,
                vectorFotos:vectorFotos.push(URI)
              })
            }else{
              var vectorImagenes=[];
              objetoImagenesJugador[JugadorSeleccionado]=vectorImagenes.push(URI);
              alert(JugadorSeleccionado)
              await AsyncStorage.setItem("objetoImagenesJugador",await JSON.stringify(objetoImagenesJugador));
              alert(URI);
  
              this.setState({
                JugadorSeleccionado:null,
                EquipoSeleccionado:null,
                vectorFotos:vectorFotos.push(URI)
              })
            }
          }
        }else{
        alert("Se Cancelo la seleccion de la imagen");
      }
    });
  }else{
      alert("Debe seleccionar un jugador y Equipo");
  }
  }

  _pickImage1_1 = async () => {
    
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
          waitUntilSaved:true
        },
        mediaType:'mixed'
      };
    
    var JugadorSeleccionado=this.state.JugadorSeleccionado;
    var EquipoSeleccionado=this.state.EquipoSeleccionado;
    if(JugadorSeleccionado!=null && EquipoSeleccionado!=null){
      ImagePicker.launchImageLibrary(options,async(result)=>{
      var objetoImagenesJugador=await JSON.parse(await AsyncStorage.getItem("objetoImagenesJugador"));
      if (!result.didCancel) {
          const URI=String(result.uri);
          var vectorImg=await URI.split("/");
          var nameImage=vectorImg[vectorImg.length-1];
          /* Verificar si el objetoImagenesJugador es null */
          if(objetoImagenesJugador==null){
            var objetoImagenesJugador={};
            var vectorImagenes=[];
            await vectorImagenes.push(nameImage);

            objetoImagenesJugador[JugadorSeleccionado]=await vectorImagenes;
            await AsyncStorage.setItem("objetoImagenesJugador",await JSON.stringify(objetoImagenesJugador));
            alert("Imagen Cargada Correctamente");
            this.setState({
              JugadorSeleccionado:null,
              EquipoSeleccionado:null,
              image:nameImage
            })
          }else{
            /* Si el Jugador estaba en el objeto */
            var jugadoresConImgs=await Object.keys(objetoImagenesJugador);
            if(jugadoresConImgs.includes(JugadorSeleccionado)){
              alert("Imagen Cargada Correctamente");
              var vector=await objetoImagenesJugador[JugadorSeleccionado];
              await vector.push(nameImage);
              objetoImagenesJugador[JugadorSeleccionado]=await vector;
              await AsyncStorage.setItem("objetoImagenesJugador",await JSON.stringify(objetoImagenesJugador));
              this.setState({
                JugadorSeleccionado:null,
                EquipoSeleccionado:null,
                image:nameImage
              })
            }else{
              var vectorImagenes=[nameImage];
              objetoImagenesJugador[JugadorSeleccionado]=await vectorImagenes
              await AsyncStorage.setItem("objetoImagenesJugador",await JSON.stringify(objetoImagenesJugador));
              alert("Imagen Cargada Correctamente");
  
              this.setState({
                JugadorSeleccionado:null,
                EquipoSeleccionado:null,
                image:nameImage
              })
            }
          }
        }else{
        alert("Se Cancelo la seleccion de la imagen");
      }
    });
    }else{
      alert("Debe seleccionar un jugador y Equipo");
    }
  }

  async pickImage2(){
    var objetoImagenesJugador=await JSON.parse(await AsyncStorage.getItem("objetoImagenesJugador"));
    var JugadorSeleccionado=this.state.JugadorSeleccionado;
    var EquipoSeleccionado=this.state.EquipoSeleccionado;
    var vectorFotos=this.state.vectorFotos;
    if(JugadorSeleccionado!=null && EquipoSeleccionado!=null){
      ImagePickerIOS.openSelectDialog({},async (imageuri)=>{
        const URI=String(imageuri);
        /* Verificar si el objetoImagenesJugador es null */
        if(objetoImagenesJugador==null){
          var objetoImagenesJugador={}
          var vectorImagenes=[];
    
          objetoImagenesJugador[JugadorSeleccionado]=vectorImagenes.push(URI);
          await AsyncStorage.setItem("objetoImagenesJugador",await JSON.stringify(objetoImagenesJugador));
          alert(URI);
          this.setState({
            JugadorSeleccionado:null,
            EquipoSeleccionado:null
          })
        }else{
          /* Si el Jugador estaba en el objeto */
          var jugadoresConImgs=await Object.keys(objetoImagenesJugador);
          if(jugadoresConImgs.includes(JugadorSeleccionado)){
            alert(URI);
    
            objetoImagenesJugador[JugadorSeleccionado].push(URI);
            await AsyncStorage.setItem("objetoImagenesJugador",await JSON.stringify(objetoImagenesJugador));
            this.setState({
              JugadorSeleccionado:null,
              EquipoSeleccionado:null
            })
          }else{
            var vectorImagenes=[];
            objetoImagenesJugador[JugadorSeleccionado]=vectorImagenes.push(URI);
            await AsyncStorage.setItem("objetoImagenesJugador",await JSON.stringify(objetoImagenesJugador));
            alert(URI);
    
            this.setState({
              JugadorSeleccionado:null,
              EquipoSeleccionado:null
            })
          }
        }
      },(error)=>{console.log(error)})
    }else{
      alert("Debe seleccionar un jugador y Equipo");
    }
  }

  pickImage3=()=>{
    CameraRoll.getPhotos({
      first:20,
      assetType:'photos'
    }).then((r)=>{
      alert(r.edges.node.image.uri)
    }).catch((err)=>{
      alert(err);
    })
  }

  prueba=async()=>{
    var Objeto=await AsyncStorage.getItem("objetoImagenesJugador");
    //alert(this.state.image);
    alert(Objeto);
    //alert(this.state.JugadorSeleccionado);
    //await AsyncStorage.clear();
  }

  limpiar=async()=>{
    await AsyncStorage.clear();
  }

  render() {
    var equipos=this.state.equipos;
    var jugadores=this.state.jugadores;
    let { image } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.labelMenu}>Seleccionar Equipo</Text>
        <ModalDropdown 
          options={equipos}
          style={styles.pickerMenu}
          onSelect={(itemValue, itemIndex) =>
            {
              var equiposConJugadores=Object.keys(this.state.ojbetoEquipos);
              if(equiposConJugadores.includes(itemIndex)){
                this.setState({
                  EquipoSeleccionado: itemIndex,
                  jugadores:this.state.ojbetoEquipos[itemIndex]
                })
              }
              this.Initialsconfigurations;
            }
          }
          dropdownStyle={styles.dropDownBox}
        />

        <Text style={styles.labelMenu}>Seleccionar Jugador</Text>
        <ModalDropdown 
          options={jugadores}
          style={styles.pickerMenu}
          onSelect={(itemValue, itemIndex) =>
            this.setState({JugadorSeleccionado: itemIndex})
        }
          
          dropdownStyle={styles.dropDownBox}
        />

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={this._pickImage1_1}
        >
          <Icon 
            name="ios-camera"
            type="ionicon"
            color="white"
            size={60}
          />
          <Text style={{color:'white',fontWeight:'bold',fontSize:40}}>Seleccionar Imagenes</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'rgb(15,24,130)',
    padding:15,
    paddingTop:80
  },
  labelMenu:{
    color:'white',
    fontWeight:'bold',
    fontSize:45,
    marginBottom:5
  },
  inputMenu:{
    width:'85%',
    height:70,
    backgroundColor:'white',
    marginBottom:25,
    fontSize:20
  },
  pickerMenu:{
    width:'85%',
    marginBottom:35,
    height:70,
    backgroundColor:'white',
    fontSize:20
  },
  dropDownBox:{
    width:'75%',
    height:120,
    backgroundColor:'white',
    fontSize:20

  },
  btnMenu:{
    backgroundColor:'rgb(236,73,16)',
    width:'70%',
    height:'28%',
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
