import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import * as SecureStore from 'expo-secure-store';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ip: '', port: '', tmpIp: '', tmpPort: '', dialogVis: false }
        this.getSets();
    }
    async saveSets(ip, port) {
        await SecureStore.setItemAsync("ip", ip);
        await SecureStore.setItemAsync("port", port);
        this.setSets(ip, port);
    }
    async getSets() {
        let ip = await SecureStore.getItemAsync("ip");
        let port = await SecureStore.getItemAsync("port");
        this.setSets(ip, port);
    }
    setSets(ip, port) {
        this.setState({ ip, port })
    }
    changeVisDialog() {
        this.setState({ dialogVis: !this.state.dialogVis, tmpIp: this.state.ip, tmpPort: this.state.port })
    }
    changeTmpIp(val) {
        this.setState({ 'tmpIp': val })
    }
    changeTmpPort(val) {
        this.setState({ 'tmpPort': val })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Current IP:</Text>
                <Text style={styles.text}>{this.state.ip}</Text>
                <Text style={styles.text}>Current Port:</Text>
                <Text style={styles.text}>{this.state.port}</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.changeVisDialog()}>
                    <Text style={styles.text}>Change settings</Text>
                </TouchableOpacity>
                <Dialog.Container visible={this.state.dialogVis}>
                    <Dialog.Title>Change settings</Dialog.Title>
                    <Dialog.Description>
                        Change ip and/or port
                    </Dialog.Description>
                    <Dialog.Input label={"IP:"} onChangeText={(text) => this.changeTmpIp(text)}>{this.state.tmpIp}</Dialog.Input>
                    <Dialog.Input label={"Port:"} onChangeText={(text) => this.changeTmpPort(text)}>{this.state.tmpPort}</Dialog.Input>
                    <Dialog.Button label="Cancel" onPress={() => this.changeVisDialog()} />
                    <Dialog.Button label="Change" onPress={() => { this.saveSets(this.state.tmpIp, this.state.tmpPort); this.changeVisDialog(); }} />
                </Dialog.Container>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Open web app</Text>
                </TouchableOpacity>
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
    button: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: "#aaa",
        padding: 10,
        marginTop: 20
    }
});