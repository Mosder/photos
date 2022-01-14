import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from "./components/Main"
import Gallery from "./components/Gallery"
import BigPhoto from "./components/BigPhoto"
import CameraScreen from "./components/CameraScreen"
import Settings from "./components/Settings"

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
                <Stack.Screen name="Gallery" component={Gallery} options={{
                    headerTitle: "Zdjęcia z folderu DCIM",
                    headerStyle: { backgroundColor: '#f8a' },
                    headerTitleStyle: { color: '#eee' },
                    headerTintColor: '#eee'
                }} />
                <Stack.Screen name="BigPhoto" component={BigPhoto} options={{
                    headerTitle: "Wybrane zdjęcie",
                    headerStyle: { backgroundColor: '#f8a' },
                    headerTitleStyle: { color: '#eee' },
                    headerTintColor: '#eee'
                }} />
                <Stack.Screen name="CameraScreen" component={CameraScreen} options={{
                    headerTitle: "Kamera",
                    headerStyle: { backgroundColor: '#f8a' },
                    headerTitleStyle: { color: '#eee' },
                    headerTintColor: '#eee'
                }} />
                <Stack.Screen name="Settings" component={Settings} options={{
                    headerTitle: "Settings",
                    headerStyle: { backgroundColor: '#f8a' },
                    headerTitleStyle: { color: '#eee' },
                    headerTintColor: '#eee'
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
