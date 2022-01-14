import * as React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Dimensions, ToastAndroid, Alert } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import FotoItem from "./FotoItem";

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = { layout: 1, photos: [], selected: [] }
        this.props.navigation.addListener("focus", () => this.getPhotos());
    }
    async getPhotos() {
        let photos = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: "photo",
            sortBy: 'modificationTime'
        });
        this.setState({ photos: photos.assets });
        console.log(photos.assets)
    }
    changeLayout() {
        this.setState({ layout: Math.abs(this.state.layout - 1) });
    }
    goTo(screen, obj) {
        this.props.navigation.navigate(screen, obj);
    }
    addSel(id) {
        this.setState({ selected: [...this.state.selected, id] })
    }
    rmSel(id) {
        this.setState({ selected: this.state.selected.filter(x => x != id) })
    }
    async delSel() {
        let result = await MediaLibrary.deleteAssetsAsync(this.state.selected);
        if (result) {
            this.getPhotos();
            ToastAndroid.showWithGravity(
                'Usunięto zaznaczone zdjęcia',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
    }
    async upSel() {
        const data = new FormData();
        for (id of this.state.selected) {
            data.append('photo', {
                uri: this.state.photos.filter(val => val.id == id)[0].uri,
                type: 'image/jpeg',
                name: id
            });
        }
        let response = await fetch("http://192.168.1.102:3000/upload", {
            method: 'POST',
            body: data
        })
        if (response.ok) {
            Alert.alert('Alert', 'Photos uploaded', [
                {
                    text: 'OK'
                }
            ]);
        }
    }
    render() {
        const renderItem = ({ item }) => {
            let width = (Dimensions.get('window').width / (this.state.layout * 4 + 1)) - 10 * (this.state.layout * (-4 / 5) + 2)
            let height = this.state.layout ? width : 150
            return (
                <FotoItem w={width} h={height} uri={item.uri} num={item.id} goTo={(screen, obj) => this.goTo(screen, obj)}
                    add={(id) => this.addSel(id)} rm={(id) => this.rmSel(id)} />
            )
        }
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                    <TouchableOpacity style={styles.button} onPress={() => this.changeLayout()}>
                        <Text style={styles.buttonText}>GRID /{'\n'}LIST</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CameraScreen')}>
                        <Text style={styles.buttonText}>OPEN{'\n'}CAM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.delSel()}>
                        <Text style={styles.buttonText}>REMOVE{'\n'}SELECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.upSel()}>
                        <Text style={styles.buttonText}>UPLOAD{'\n'}SELECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Settings')}>
                        <Text style={styles.buttonText}>SETS</Text>
                    </TouchableOpacity>
                </View>
                <FlatList numColumns={this.state.layout * 5} key={this.state.layout}
                    keyExtractor={(item) => item.id} renderItem={renderItem} style={styles.list}
                    data={this.state.photos}
                />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginVertical: 5,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#eee'
    },
    list: {
        width: "100%",
    }
});