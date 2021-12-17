import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, Dimensions, View } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';

export default class BigPhoto extends React.Component {
    constructor(props) {
        super(props)
    }
    async delete(id) {
        let result = await MediaLibrary.deleteAssetsAsync([id]);
        if (result)
            this.props.navigation.goBack();
    }
    async share(url) {
        let check = Sharing.isAvailableAsync()
        if (check) {
            await Sharing.shareAsync(url);
        }
        else {
            console.log('sus')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imgCont}>
                    <Image style={styles.img} source={{ uri: this.props.route.params.uri }} />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.share(this.props.route.params.id)}>
                        <Text style={styles.buttonText}>SHARE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.delete(this.props.route.params.id)}>
                        <Text style={styles.buttonText}>DELETE</Text>
                    </TouchableOpacity>
                </View>
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
        resizeMode: 'cover',
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