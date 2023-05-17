import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { MovieDetails } from '../screens/MovieDetails';

const Stack = createNativeStackNavigator();

export function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: "slide_from_right"
            }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="MovieDetails" component={MovieDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}