import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

export default class Gallery extends React.Component {
    render() {
        return (
            <View>
                <FlatList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});