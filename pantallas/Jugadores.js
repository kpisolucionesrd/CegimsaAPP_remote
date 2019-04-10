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
  
  async componentDidUpdate(prevProps) {
    console.log("prueba");
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
        alert("orderlist null")
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
          alert("orderlist not undefined")
          return dataOrdenadaSaved[equipo]
        }else{
          alert("orderlist undefined")
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
            this.EsdatisticasEquipo(item.label)
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
    this.props.navigation.navigate("GaleriaImagenes",{
      jugador:jugador
    });
  };

  guardarOrderList=async(objeto)=>{
    const { navigation } = this.props;
    var equipo = navigation.getParam('equipo', 'NO-ID');
    var dataOrdenadaSaved=await JSON.parse(await AsyncStorage.getItem("orderList"));
    var ordenlist

    if(dataOrdenadaSaved==null){
      ordenlist={
        equipo:[objeto]
      }
      await AsyncStorage.setItem("orderList",await JSON.stringify(ordenlist));
      alert("orden list guardada")
    }else{
      dataOrdenadaSaved[equipo]=[objeto];
      await AsyncStorage.setItem("orderList",await JSON.stringify(dataOrdenadaSaved));
      alert("orden list guardada")
    }
  }

  prueba=async()=>{
    var dataOrdenadaSaved=await AsyncStorage.getItem("orderList");
    alert(dataOrdenadaSaved);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image source={img} style={styles.logoIMG}/>
        <Text onPress={this.prueba}>PRUEBA</Text>

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
      height:'30%',
      marginBottom:'25%'
    },
    btnMenu:{
      backgroundColor:'rgb(236,73,16)',
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