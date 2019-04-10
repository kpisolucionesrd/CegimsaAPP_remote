import React from 'react';
import { ScrollView, StyleSheet,Text,TextInput,TouchableOpacity,AsyncStorage,Picker } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';


export default class AgregarJugador extends React.Component {
  constructor(props){
    super(props);
    this.state={
      equipos:["Equipo1-D","Equipo2-D"],
      EquipoSeleccionado:"",
      nombreJugador:"",
      Jugadores:{}
    }
    this.Initialsconfigurations().then(result=>{
      this.setState({
        equipos:result
      });
    });
  }

  static navigationOptions = {
    title: 'Agregar Jugador',
  };

  /* Configuraciones Iniciales */
  Initialsconfigurations=async()=>{

    /* Extrayendo Equipos */
    var equipos=JSON.parse(await AsyncStorage.getItem("Equipos"));
    return equipos;
  };

  guardarJugador=async()=>{
    var ojbetoEquipos=JSON.parse(await AsyncStorage.getItem("ObjetoEquipos"));

    /* Verificanco si el objeto ya existia */
    if(ojbetoEquipos==null){
      ojbetoEquipos={};

      /* Verificando que los campos esten completos */
      if(this.state.EquipoSeleccionado!="" && this.state.nombreJugador!=""){
        let vectorJugadores=[]
        vectorJugadores.push(this.state.nombreJugador);
        ojbetoEquipos[this.state.EquipoSeleccionado]=vectorJugadores;
        alert("Jugador Agregado exitosamente!");
        await AsyncStorage.setItem("ObjetoEquipos",JSON.stringify(ojbetoEquipos));
        
        this.setState({
          nombreJugador:"",
          EquipoSeleccionado:""
        })
      }else{
        alert("Faltan campos por completar");
      }
    }else{
      /* Verificando que los campos esten completos */
      if(this.state.EquipoSeleccionado!="" && this.state.nombreJugador!=""){

        /* Si el equipo ya estaba en el objeto */
        var equiposGuardados=Object.keys(ojbetoEquipos);
        if(equiposGuardados.includes(this.state.EquipoSeleccionado)){
          ojbetoEquipos[this.state.EquipoSeleccionado].push(this.state.nombreJugador);
          alert("Jugador Agregado exitosamente! existe equipo");
          await AsyncStorage.setItem("ObjetoEquipos",JSON.stringify(ojbetoEquipos));
          
          this.setState({
            nombreJugador:"",
            EquipoSeleccionado:""
          })
          
        }else{
          let vectorJugadores=[]
          vectorJugadores.push(this.state.nombreJugador);
          ojbetoEquipos[this.state.EquipoSeleccionado]=vectorJugadores;
          alert("Jugador Agregado exitosamente! no existe equipo");
          await AsyncStorage.setItem("ObjetoEquipos",JSON.stringify(ojbetoEquipos));
          
          this.setState({
            nombreJugador:"",
            EquipoSeleccionado:""
          })
        }
      }else{
        alert("Faltan campos por completar");
      }
    }
  };

  async mostrarJugadores(){
    var ojbetoEquipos=await AsyncStorage.getItem("ObjetoEquipos");
    alert(ojbetoEquipos);
  }

  render() { 
    var equipoRender=this.state.equipos;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.labelMenu}>Seleccionar Equipo</Text>
        <ModalDropdown 
          options={equipoRender}
          style={styles.pickerMenu}
          onSelect={(itemValue, itemIndex) =>
            this.setState({EquipoSeleccionado: itemIndex})
          }
          dropdownStyle={styles.dropDownBox}
        
        />

        <Text style={styles.labelMenu}>Nombre del jugador</Text>
        <TextInput
          style={styles.inputMenu}
          placeholder="Escribir nombre del jugador"
          onChangeText={
            (text) => this.setState({
              nombreJugador:text
            })
          }
          value={this.state.nombreJugador}
        />

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={this.guardarJugador}
        >
          <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Guardar Jugador</Text>
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
    fontSize:25,
    marginBottom:5
  },
  labelMenuEspecial:{
    color:'white',
    fontWeight:'bold',
    fontSize:25,
    marginBottom:5,
    marginTop:90
  },
  inputMenu:{
    width:'85%',
    height:40,
    backgroundColor:'white',
    marginBottom:25
  },
  pickerMenu:{
    width:'85%',
    marginBottom:35,
    height:30,
    backgroundColor:'white'
  },
  dropDownBox:{
    width:'75%',
    height:120,
    backgroundColor:'white',

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