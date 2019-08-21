import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Container, Text, Textarea, Button, Item, Input} from 'native-base'

import DatePick from './components/DatePick'

import Fire from '../firebase'

class AddDiaryScreen extends Component {

    state = {
        title: '',
        diary: '',
        date: new Date()
    }

    // variable tanggal akan di isi tanggal yang dipilih oleh user
    getDate = (tanggal) => {
        this.setState({date: tanggal})
    }

    addDiary = async () => {
        // SATU
        await Fire.database().ref(`diary/${this.props.uid}`)
        .push({
            title: this.state.title,
            diary: this.state.diary,
            date: this.state.date.toString().substr(4,12)
        })

        // kembali ke halaman sebelumnya
        this.props.navigation.goBack()

    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>Create Diary</Text>
                    <View style={styles.wrapper}>
                        <DatePick funDate={this.getDate}/>
                        <Item rounded>
                            <Input
                                placeholder='Title'
                                onChangeText={(text) => this.setState({title: text})}
                            />
                        </Item>
                        <Textarea
                            placeholder = 'Your Story'
                            bordered
                            rowSpan = {15}
                            onChangeText={(text) => this.setState({diary: text})}
                        />
                        <View style={styles.button}>
                            <Button block onPress={this.addDiary}>
                                <Text>Create Diary</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
    button: {
        marginTop: 10
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(AddDiaryScreen)