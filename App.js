import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

//Navigators
import Main from "./Navigators/Main";

//Context API
import Auth from "./Context/store/Auth";

export default function App() {
  return (
    <Auth>
      <NavigationContainer>
        <Main />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Auth>
  );
}
