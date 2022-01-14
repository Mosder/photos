import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as MediaLibrary from "expo-media-library";

export default class Main extends React.Component {
    constructor(props) {
        super(props)
    }
    async componentDidMount() {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Gallery")}>
                    <Text style={styles.buttonText}>Upload App</Text>
                </TouchableOpacity>
                <Text style={styles.text}>show gallery pictures</Text>
                <Text style={styles.text}>delete photo from device</Text>
                <Text style={styles.text}>share photo</Text>
                <Text style={styles.name}>by Maciej Borowiec</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#eee'
    },
    text: {
        fontSize: 25,
        color: '#eee'
    },
    name: {
        fontSize: 30,
        color: '#ddd'
    }
});