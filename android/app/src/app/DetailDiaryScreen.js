import React, { Component } from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Button,
    Item, Input, Textarea
} from 'native-base'

import Fire from '../firebase'

// Untuk mengambil data dari navigate menggunakan
// navigation.getParam('nama parameternya') / 'data_diary'
class DetailDiaryScreen extends Component {

    state = {
        // objDiary = {title: 'Contoh judul', diary: 'Kemarin minggu saya dirumah', id: Lwe45Dsdkk}
        objDiary: this.props.navigation.getParam('data_diary'),
        edit: false,
        title: this.props.navigation.getParam('data_diary').title,
        diary: this.props.navigation.getParam('data_diary').diary
        
    }

    onDeleteButton = async () => {
        // DUA
        // Menghapus data
       await Fire.database().ref(`diary/${this.props.uid}/${this.state.objDiary.id}`).remove()
        // kembali ke halaman sebelumnya. 
       this.props.navigation.goBack()
    }

    onSaveButton = () => {
        // EMPAT
        Fire.database().ref(`diary/${this.props.uid}/${this.state.objDiary.id}`)
        .update({
            title: this.state.title,
            diary: this.state.diary
        })

    }

    onEditButton = () => {
        // Mengubah state.edit menjadi true
        this.setState({edit: true})
    }

    onCancelButton = () => {
        // Mengubah state.edit menjadi true
        this.setState({edit: false})
    }



    render() {
       if(this.state.edit) {
            // Tampilkan mode edit
            var diary = this.state.objDiary
            return (
                <Container>
                        <View style={styles.container}>
                            <Text style={{fontSize: 20}}>Edit Diary</Text>
                            <View style={styles.wrapper}>
                                <Item rounded>
                                    <Input
                                        value = {this.state.title}
                                        placeholder='Title'
                                        onChangeText={(text) => this.setState({title: text})}
                                    />
                                </Item>
                                <Textarea
                                    value = {this.state.diary}
                                    placeholder = 'Your Story'
                                    bordered
                                    rowSpan = {15}
                                    onChangeText={(text) => this.setState({diary: text})}
                                />
                                <View style={styles.button}>
                                    <Button block onPress={this.onSaveButton}>
                                        <Text>SAVE</Text>
                                    </Button>
                                    <Button block onPress={this.onCancelButton}>
                                        <Text>CANCEL</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </Container>
            )
       } else {
            // Tampilkan mode read
            var diary = this.state.objDiary
            return (
                <Container>
                    <Content>
                        <Card>
                            <CardItem header bordered style={styles.row}>
                                <Text style={styles.headerText}>{diary.title}</Text>
                                <Text>{diary.date}</Text>
                            </CardItem>
                            <CardItem>
                                <Text>{diary.diary}</Text>
                            </CardItem>
                            <View style={styles.button}>
                                <Button block onPress={this.onEditButton}><Text>Edit</Text></Button>
                                <Button block onPress={this.onDeleteButton}><Text>Delete</Text></Button>
                            </View>
                        </Card>
                    </Content>
                </Container>
            )
       }
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        height: 100,
        justifyContent: 'space-between',
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps)(DetailDiaryScreen)