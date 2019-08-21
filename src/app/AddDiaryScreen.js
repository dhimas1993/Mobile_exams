import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Container, Text, Textarea, Button, Item, Input} from 'native-base'

import DatePick from './components/DatePick'

import Fire from '../firebase'

class AddDiaryScreen extends Component {

    state = {
        nama: '',
        usia: 0,
        jabatan: ''
    }

    addKaryawan = async () => {
        // SATU
        await Fire.database().ref(`karyawan/${this.props.uid}`)
        .push({
            nama: this.state.nama,
            usia: this.state.usia,
            jabatan: this.state.jabatan
        })

        // kembali ke halaman sebelumnya
        this.props.navigation.goBack()

    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>Create Karyawan</Text>
                    <View style={styles.wrapper}>

                        <Item rounded>
                            <Input
                                placeholder='Nama'
                                onChangeText={(text) => this.setState({nama: text})}
                            />
                        </Item>

                        <Item rounded>
                            <Input
                                placeholder='Usia'
                                onChangeText={(text) => this.setState({usia: text})}
                            />
                        </Item>

                        <Item rounded>
                            <Input
                                placeholder='Jabatan'
                                onChangeText={(text) => this.setState({jabatan: text})}
                            />
                        </Item>

                        <View style={styles.button}>
                            <Button block onPress={this.addKaryawan}>
                                <Text>Add Karyawan</Text>
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