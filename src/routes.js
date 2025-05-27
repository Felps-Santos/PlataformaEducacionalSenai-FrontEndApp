import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import ChangePass from "./screens/ChangePass";
import Home from "./screens/Home";
import Tasks from "./screens/Tasks";
import ReportCard from "./screens/ReportCard";
import Grade from "./screens/Grade";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="ChangePass" component={ChangePass}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Tasks" component={Tasks} />
                <Stack.Screen name="ReportCard" component={ReportCard} />
                <Stack.Screen name="Grade" component={Grade} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}