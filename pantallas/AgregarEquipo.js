import React from 'react';
import { ScrollView, StyleSheet,Text,TextInput,TouchableOpacity,AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';

export default class AgregarEquipo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      equipo:"",
      ciudadEquipo:""
    }
  }

  static navigationOptions = {
    title: 'Agregar Equipo',
  };

  /* Guardar el Equipo */
  guardarEquipo=async()=>{
    if(this.state.equipo=="Default" || this.state.ciudadEquipo=="Default"){
      alert("No puedes dejar equipos en blanco");
    }else{
      var objetoEquipos=await JSON.parse(await AsyncStorage.getItem("Equipos"));
      
      if(objetoEquipos != null){
        if(objetoEquipos.includes(this.state.equipo)){
          alert("El Equipo ya se encuentra guardado");
        }else{
          objetoEquipos.push(this.state.equipo);
          await AsyncStorage.setItem("Equipos",JSON.stringify(objetoEquipos));
          alert("Equipo Guardado Correctamente");

          /* Limpieza de los text input */
          this.setState({
            equipo:"",
            ciudadEquipo:""

          })
        }
      }else{
        objetoEquipos=[];
        objetoEquipos=await [this.state.equipo];
        await AsyncStorage.setItem("Equipos",JSON.stringify(objetoEquipos));
        alert("Equipo Guardado Correctamente");
        /* Limpieza de los text input */
        this.setState({
          equipo:"",
          ciudadEquipo:""
        })
      }
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.labelMenu}>Nombre del Equipo</Text>
        <TextInput
          style={styles.inputMenu}
          placeholder="Agregar nombre del equipo"
          onChangeText={
            (text) => this.setState({
              equipo:text
            })
          }
          value={this.state.equipo}
        />

        <Text style={styles.labelMenu}>Ciudad del Equipo</Text>
        <TextInput
          style={styles.inputMenu}
          placeholder="Agregar nombre de la Ciudad"
          onChangeText={
            (text) => this.setState({
              ciudadEquipo:text
            })
          }
          value={this.state.ciudadEquipo}
        />

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={this.guardarEquipo}
        >
          <Icon 
            name="ios-save"
            type="ionicon"
            color="white"
            size={60}
          />
          <Text style={{color:'white',fontWeight:'bold',fontSize:40}}>Guardar Equipo</Text>
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
  btnMenu:{
    backgroundColor:'rgb(236,73,16)',
    width:'70%',
    height:'28%',
    marginLeft:'auto',
    marginRight:'auto',
    alignItems: 'center',
    paddingTop: 30,
    marginBottom:'5%',
    shadowColor:'black',
    shadowOffset:{
      width:5,
      height:5
    },
    shadowOpacity:15
  }
});