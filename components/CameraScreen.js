import * as React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import CircleButton from './CircleButton'
import Plus from '../assets/plus.png'
import Reset from '../assets/reset.png'

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            lastPhoto: null
        };
    }
    async componentDidMount() {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
    }
    async takePhoto() {
        let foto = await this.camera.takePictureAsync();
        this.setLastPhoto(foto);
        await MediaLibrary.createAssetAsync(foto.uri);
    }
    frontBack() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }
    setLastPhoto(foto) {
        this.setState({ lastPhoto: foto })
    }
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={styles.buttons}>
                            <View style={{ height: 150, justifyContent: 'center' }}>
                                <CircleButton size={100} img={Reset} press={() => this.frontBack()} />
                            </View>
                            <CircleButton size={150} img={Plus} press={() => this.takePhoto()} />
                            <Image source={this.state.lastPhoto}
                                style={{
                                    ...styles.lastPhoto, display: this.state.lastPhoto == null ? 'none' : 'flex',
                                    borderWidth: this.state.lastPhoto == null ? 0 : 5
                                }} />
                        </View>
                    </Camera >
                </View >
            );
        }
    }

}
const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        height: 150,
        margin: 20,
    },
    lastPhoto: {
        width: 75,
        height: 100,
        borderRadius: 5,
        borderColor: '#f8a',
        position: 'absolute',
        top: 0,
        left: (Dimensions.get('window').width - 125) / 2
    }
});