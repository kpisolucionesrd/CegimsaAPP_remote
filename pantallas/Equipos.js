import React, {Component} from 'react';
import {Platform,TouchableOpacity,StyleSheet, Text,ScrollView,AsyncStorage,Image,Modal} from 'react-native';
import img from '../imgs/logo.png';
import { Icon } from 'react-native-elements';


type Props = {};
export default class Equipos extends Component<Props> {

  constructor(props){
      super(props);
      this.state={
        equipos:["Equipo1-D","Equipo2-D"],
        modalVisible:false
      }
  
      this.Initialsconfigurations().then(result=>{
        this.setState({
          equipos:result
        });
      });
    }
  
    async componentDidUpdate(prevProps) {
      /* Extrayendo Equipos */
      var equipos=JSON.parse(await AsyncStorage.getItem("Equipos"));
      if(equipos==null){
        this.setState({
          equipos:["Equipo1-D","Equipo2-D"]
        })
      }
    }
  
    static navigationOptions = {
      title: 'Seleccionar Equipo',
    };
  
    /* Configuraciones Iniciales */
    Initialsconfigurations=async()=>{
  
      /* Extrayendo Equipos */
      var equipos=JSON.parse(await AsyncStorage.getItem("Equipos"));
      if(equipos==null){
          return ["Equipo1-D","Equipo2-D"]
      }else{
          return equipos;    
      }
    };
  
    EsdatisticasEquipo=async(equipo)=>{
      this.props.navigation.navigate("Jugadores",{
        equipo:equipo
      });
    };

  render() {
    var equipoRender=this.state.equipos;
    return (
      <ScrollView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <ScrollView style={{marginTop: 22}}>

          <TouchableOpacity
            style={styles.btnModal}
            onPress={()=>{
              alert("Eliminar Elemento");
              this.setState({
                modalVisible:false
              })
            }}
          >
            <Icon 
              name="ios-trash"
              type="ionicon"
              color="white"
              size={60}
            />
          </TouchableOpacity>

          </ScrollView>
        </Modal>



        <Image source={img} style={styles.logoIMG}/>
        {
          equipoRender.map((equipo)=>{
            return(
            <TouchableOpacity
            style={styles.btnMenu}
            onPress={()=>{
              this.EsdatisticasEquipo(equipo);
            }}
            onLongPress={()=>{
              this.setState({
                modalVisible:true
              })
            }}
            >
            <Text style={styles.labelMenu}>{equipo}</Text>
            </TouchableOpacity>
            )
          })
        }
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
    labelMenu:{
      color:'white',
      fontWeight:'bold',
      fontSize:45,
      marginBottom:5
    },
  });