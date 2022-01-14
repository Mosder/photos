import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Current IP:</Text>
                <Text style={styles.text}></Text>
                <Text style={styles.text}>Current Port:</Text>
                <Text style={styles.text}></Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        color: '#eee'
    },
});