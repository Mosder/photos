import * as React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";
import FotoItem from "./FotoItem";

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = { layout: 1, photos: {} }
        this.props.navigation.addListener("focus", () => this.getPhotos());
    }
    async getPhotos() {
        let photos = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo'
        });
        this.setState({ photos: photos.assets });
    }
    changeLayout() {
        this.setState({ layout: Math.abs(this.state.layout - 1) });
    }
    goTo(screen, obj) {
        this.props.navigation.navigate(screen, obj);
    }
    render() {
        const renderItem = ({ item }) => {
            let width = (Dimensions.get('window').width / (this.state.layout * 4 + 1)) - 10 * (this.state.layout * (-4 / 5) + 2)
            let height = this.state.layout ? width : 150
            return (
                <FotoItem w={width} h={height} uri={item.uri} num={item.id} goTo={(screen, obj) => this.goTo(screen, obj)} />
            )
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => this.changeLayout()}>
                    <Text style={styles.buttonText}>GRID / LIST</Text>
                </TouchableOpacity>
                <FlatList numColumns={this.state.layout * 5} key={this.state.layout}
                    keyExtractor={(item) => item.id} renderItem={renderItem} style={styles.list}
                    data={this.state.photos}
                />
            </View>
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
        margin: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#eee'
    },
    list: {
        width: "100%",
    }
});