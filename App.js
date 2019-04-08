import {createStackNavigator,createAppContainer} from 'react-navigation';
import Equipos from './pantallas/Equipos';
import Menu from './pantallas/Menu';
import AgregarEquipo from './pantallas/AgregarEquipo';
import AgregarJugador from './pantallas/AgregarJugador';
import AgregarFotos from './pantallas/AgregarFotosVideos';
import Jugadores from './pantallas/Jugadores';
import GaleriaImagenes from './pantallas/galeriaIMG';




const App = createStackNavigator(
  {
    Equipos: Equipos,
    Menu:Menu,
    AgregarEquipo:AgregarEquipo,
    AgregarJugador:AgregarJugador,
    AgregarFotos:AgregarFotos,
    Jugadores:Jugadores,
    GaleriaImagenes:GaleriaImagenes
  },
  {
    initialRouteName:"Menu"
  }
);

export default createAppContainer(App);
