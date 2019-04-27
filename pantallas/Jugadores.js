import React, {Component} from 'react';
import {Platform,TouchableOpacity,StyleSheet, Text,ScrollView,AsyncStorage,Image} from 'react-native';
import img from '../imgs/logo.png';
import DraggableFlatList from 'react-native-draggable-flatlist'

type Props = {};
export default class Jugadores extends Component<Props> {

  constructor(props){
      super(props);
      this.state={
        data:[{label:"No hay elementos"}]
      }
      this.Initialsconfigurations().then(result=>{
        this.setState({
          data:result,

        })
      });
  }
  
  static navigationOptions = {
    title: 'Seleccionar Jugador',
  };

  /* Configuraciones Iniciales */
  Initialsconfigurations=async()=>{
      const { navigation } = this.props;
      const equipo = navigation.getParam('equipo', 'NO-ID');

      var dataOrdenadaSaved=await JSON.parse(await AsyncStorage.getItem("orderList"));


      /* Extrayendo Equipos */
      var objetoEquipos=await JSON.parse(await AsyncStorage.getItem("ObjetoEquipos"));
      var equiposConJugadores=Object.keys(objetoEquipos);

      //En caso de que no exista orden en los jugadores
      if (dataOrdenadaSaved==null){
        if(equiposConJugadores.includes(equipo)){
            let objetoOrden=await objetoEquipos[equipo].map((valor)=>{
              return{
                label:valor
              }
            })
            return objetoOrden
        }else{
            return [{label:"No Hay jugadores"}]
        }
      }else{
        if(dataOrdenadaSaved[equipo]!=undefined){
          return dataOrdenadaSaved[equipo]
        }else{
          if(equiposConJugadores.includes(equipo)){
            let objetoOrden=await objetoEquipos[equipo].map((valor)=>{
              return{
                label:valor
              }
            })
            return objetoOrden
          }else{
            return [{label:"No Hay jugadores"}]
          }
        }
      }
  };

  /* Render Items */
  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        style={{ 
          height: 50, 
          backgroundColor: isActive ? 'red' : 'white',
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom:15,
          color:'white'
        }}
        onLongPress={move}
        onPressOut={moveEnd}
        onPress={()=>{
            this.EsdatisticasEquipo(item.label);
          }
        }
      >
        <Text style={{ 
          fontWeight: 'bold', 
          color: 'black',
          fontSize: 32,
        }}>{item.label}</Text>
      </TouchableOpacity>
    )
  }
 
  EsdatisticasEquipo=async(jugador)=>{
    const { navigation } = this.props;
    const equipo = navigation.getParam('equipo', 'NO-ID');
    this.props.navigation.navigate("GaleriaImagenes",{
      jugador:jugador,
      equipo:equipo
    });
  };

  guardarOrderList=async(objeto)=>{
    const { navigation } = this.props;
    var equipoName = navigation.getParam('equipo', 'NO-ID');
    var dataOrdenadaSaved=await JSON.parse(await AsyncStorage.getItem("orderList"));
    var ordenlist={}

    if(dataOrdenadaSaved==null){
      ordenlist[equipoName]=objeto
      await AsyncStorage.setItem("orderList",await JSON.stringify(ordenlist));
    }else{
      dataOrdenadaSaved[equipoName]=objeto;
      await AsyncStorage.setItem("orderList",await JSON.stringify(dataOrdenadaSaved));
    }
  }

  prueba=async()=>{
    var dataOrdenadaSaved=await AsyncStorage.getItem("orderList");
    alert(dataOrdenadaSaved);
  }

  borrar=async()=>{
    await AsyncStorage.clear()
  }
  render(){
    return (
      <ScrollView style={styles.container}>
        <Image source={img} style={styles.logoIMG}/>

        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.label}`}
          scrollPercent={3}
          onMoveEnd={({ data }) =>{ 
            this.setState({ data })
            this.guardarOrderList(data)
          }}
        />
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
    logoIMG:{
      resizeMode:'contain',
      width:'50%',
      marginLeft:'auto',
      marginRight:'auto',
      height:240,
      marginBottom:'25%'
    },
    btnMenu:{
      backgroundColor:'rgb(236,73,16)',
      width:'70%',
      height:80,
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