import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Plus from '../assets/plus.png'

export default class FotoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { check: 0 }
    }
    changeCheck(val) {
        this.setState({ check: val })
        if (val)
            this.props.add(this.props.num)
        else
            this.props.rm(this.props.num)
    }
    render() {
        return (
            <TouchableOpacity style={{ ...styles.div, width: this.props.w, height: this.props.h }}
                onPress={() => { this.state.check ? this.changeCheck(0) : this.props.goTo("BigPhoto", { uri: this.props.uri, id: this.props.num }) }}
                onLongPress={() => { this.state.check ? 0 : this.changeCheck(1) }}>
                <Image style={{ ...styles.img, width: this.props.w, height: this.props.h, opacity: this.state.check ? 0.5 : 1 }}
                    source={{ uri: this.props.uri }}
                />
                <Image style={{ ...styles.plus, width: this.props.h, height: this.props.h, left: (this.props.w - this.props.h) / 2, opacity: this.state.check ? 1 : 0 }}
                    source={Plus}
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
    },
    plus: {
        position: 'absolute',
        top: 0,
    }
})