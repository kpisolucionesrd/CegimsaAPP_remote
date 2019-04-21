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

  EliminarJugador=async(jugador)=>{
    /* Este metodo se encarga de eliminar jugadores */
    const { navigation } = this.props;
    const equipo = navigation.getParam('equipo', 'NO-ID');
    

    //-----------------Eliminar del vector objetos-------------------------

    /* Extrayendo Equipos */
    var objetoEquipos=await JSON.parse(await AsyncStorage.getItem("ObjetoEquipos"));
    var vectorJugadores=await objetoEquipos[equipo];
    var indice=await vectorJugadores.indexOf(jugador);
    await vectorJugadores.splice(indice,1);

    if(vectorJugadores.length==0){
      objetoEquipos[equipo]=await ["No Hay Jugadores"];
    }else{
      objetoEquipos[equipo]=await vectorJugadores;
    }

    await AsyncStorage.setItem("ObjetoEquipos",await JSON.stringify(objetoEquipos));

    //-------------------Eliminar de la data ordenada------------------------
    var dataOrdenadaSaved=await JSON.parse(await AsyncStorage.getItem("orderList"));
    var vectorObjetoJugadores=await dataOrdenadaSaved[equipo];
    var indice2=await vectorObjetoJugadores.indexOf({label:jugador});
    await vectorObjetoJugadores.splice(indice2,1)

    if(vectorObjetoJugadores.length==0){
      dataOrdenadaSaved[equipo]=await [{label:"No Hay Jugadores"}]
    }else{
      dataOrdenadaSaved[equipo]=await vectorObjetoJugadores
    }

    //--------------------Eliminar del objeto jugadores-----------------------
    var objetoImagenesJugador=await JSON.parse(await AsyncStorage.getItem("objetoImagenesJugador"));
    vectorImagenesJugador=await objetoImagenesJugador[jugador];
    if(vectorImagenesJugador!=undefined){
      await delete objetoImagenesJugador[jugador]
    }

    await AsyncStorage.setItem("objetoImagenesJugador",await JSON.stringify(objetoImagenesJugador));
    alert("Jugador: "+jugador+" fue Eliminado correctamente.")
  }



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
        onLongPress={()=>{
          this.EliminarJugador(item.label);
        }}
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