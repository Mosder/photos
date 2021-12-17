import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Gallery")}>
                    <Text style={styles.buttonText}>Photos App</Text>
                </TouchableOpacity>
                <Text style={styles.text}>show gallery pictures</Text>
                <Text style={styles.text}>delete photo from device</Text>
                <Text style={styles.text}>share photo</Text>
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
    }
});