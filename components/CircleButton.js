import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';

export default class MyButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity style={{ ...styles.container, width: this.props.size, height: this.props.size }} onPress={() => { this.props.press() }}>
                <Image
                    style={styles.image}
                    source={this.props.img}
                />
                <View style={{ ...styles.bg, width: this.props.size, height: this.props.size, borderRadius: this.props.size }}>

                </View>
            </TouchableOpacity>
        );
    }
}
MyButton.propTypes = {
    img: PropTypes.number.isRequired,
    press: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: "100%",
        height: "100%",
        zIndex: 1
    },
    bg: {
        position: 'absolute',
        opacity: 0.3,
        top: 0,
        left: 0,
        backgroundColor: '#000'
    }
});