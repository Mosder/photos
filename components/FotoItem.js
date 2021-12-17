import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class FotoItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity style={{ ...styles.div, width: this.props.w, height: this.props.h }}
                onPress={() => { this.props.goTo("BigPhoto", { uri: this.props.uri, id: this.props.num }) }}>
                <Image style={{ ...styles.img, width: this.props.w, height: this.props.h }}
                    source={{ uri: this.props.uri }}
                />
                <Text style={styles.id}>{this.props.num}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    div: {
        marginLeft: 10,
        marginBottom: 10,
    },
    img: {
        borderRadius: 10
    },
    id: {
        color: '#eee',
        position: 'absolute',
        bottom: 5,
        right: 5
    }
})