import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, Dimensions, View, Alert } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import Picker from '../assets/picker.png';
import CircleButton from './CircleButton';

export default class BigPhoto extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ip: '', port: '' }
        this.props.navigation.addListener("focus", () => this.getSets());
    }
    async getSets() {
        let ip = await SecureStore.getItemAsync("ip");
        let port = await SecureStore.getItemAsync("port");
        this.setSets(ip, port);
    }
    setSets(ip, port) {
        this.setState({ ip, port })
    }
    async delete(id) {
        let result = await MediaLibrary.deleteAssetsAsync([id]);
        if (result)
            this.props.navigation.goBack();
    }
    async share(url) {
        Sharing.shareAsync(url);
    }
    async upload(uri, id) {
        let name = id;
        let msg = 'Photo uploaded';
        if (id == undefined) {
            name = Date.now();
            msg = 'Photo picked and uploaded';
        }
        const data = new FormData();
        data.append('photo', {
            uri,
            type: 'image/jpeg',
            name: name
        });
        let response = await fetch(`http://${this.state.ip}:${this.state.port}/upload`, {
            method: 'POST',
            body: data
        })
        if (response.ok) {
            Alert.alert('Alert', msg, [
                {
                    text: 'OK'
                }
            ]);
        }
    }
    async picker() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            this.upload(result.uri)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imgCont}>
                    <Image resizeMode={'cover'} style={styles.img} source={{ uri: this.props.route.params.uri }} />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.share(this.props.route.params.uri)}>
                        <Text style={styles.buttonText}>SHARE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.delete(this.props.route.params.id)}>
                        <Text style={styles.buttonText}>DELETE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.upload(this.props.route.params.uri, this.props.route.params.id)}>
                        <Text style={styles.buttonText}>UPLOAD</Text>
                    </TouchableOpacity>
                </View>
                <CircleButton size={100} img={Picker} press={() => this.picker()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
    },
    imgCont: {
        borderRadius: 10,
        width: Dimensions.get('window').width - 20,
        height: 500,
        margin: 10,
    },
    img: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
    },
    buttons: {
        flexDirection: 'row'
    },
    button: {
        margin: 20
    },
    buttonText: {
        color: '#eee',
        fontSize: 25
    }
})