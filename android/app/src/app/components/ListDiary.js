import React, { Component } from 'react'
import {View,TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'native-base'
import {withNavigation} from 'react-navigation'

class ListDiary extends Component {
    touchable = () => {
        // Pindah ke screen Detail dengan membawa object diary nya
        // object diary berada di this.props.data.item
        this.props.navigation.navigate('DetailDiary', {data_diary:this.props.data.item})
    }

    render() {
        return(
            <TouchableOpacity onPress={this.touchable}>
                <View style={styles.list}>
                    <Text>{this.props.data.item.title}</Text>
                    <Text>{this.props.data.item.date}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgb(241, 210, 247)',
        padding : 10,
        marginVertical: 5,
    }
})

export default withNavigation(ListDiary)