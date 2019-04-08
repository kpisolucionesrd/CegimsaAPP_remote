import React from 'react';
import { ScrollView, StyleSheet,Text,TextInput,TouchableOpacity,AsyncStorage } from 'react-native';

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

  mostrarDatos=async()=>{
    var objetoEquipos=await AsyncStorage.getItem("Equipos");
    alert(objetoEquipos);
  }

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
          <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Guardar Equipo</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.btnMenu}
          onPress={this.mostrarDatos}
        >
          <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Monstrar Equipos</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'red',
    padding:15,
    paddingTop:80
  },
  labelMenu:{
    color:'white',
    fontWeight:'bold',
    fontSize:25,
    marginBottom:5
  },
  inputMenu:{
    width:'85%',
    height:40,
    backgroundColor:'white',
    marginBottom:25
  },
  btnMenu:{
    backgroundColor:'darkblue',
    width:'70%',
    height:'20%',
    marginLeft:'auto',
    marginRight:'auto',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom:'5%'
  }
});