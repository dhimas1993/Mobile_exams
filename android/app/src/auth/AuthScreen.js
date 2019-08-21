import React, { Component } from 'react'
import {View, StyleSheet, ImageBackground} from 'react-native'
import {Container, Button, Text, Form, Item, Input, Label} from 'native-base'
import {connect} from 'react-redux'
import Fire from '../firebase/index'
import {onLogin} from '../store/actions/index'


class AuthScreen extends Component {

    state = {
        email: '',
        password: '',
        confirm: '',
        fullName: '',
        nickName: '',
        age: '',
        login: true
    }

    onSwitch = () => {
        this.setState({login: !this.state.login})
    }

    componentDidMount(){
        // Cek apakah ada user yang sedang login
        Fire.auth().onAuthStateChanged((user) => {
            // jika user ditemukan
            if(user){
                // login ke redux
                this.props.onLoginUser(
                    user.uid, user.email
                )

                // Pindah ke halaman utama
                this.props.navigation.navigate('Main')
            }
        })
    }

    // Function yang akan di jalanakna ketika klik button register
    authButton = async () => {
        let email = this.state.email
        let password = this.state.password
        let confirm = this.state.confirm

        if(this.state.login){
            // LOGIN

            try {
                // Login di firebase
                let res = await Fire.auth().signInWithEmailAndPassword(email, password)
               
                // Login di app
                this.props.onLoginUser(
                    res.user.uid, res.user.email
                )

                // Pindah ke halaman utama
                this.props.navigation.navigate('Main')
            } catch (error) {
                // jika terjadi error pada block kode 'try', akan kita munculkan pesan errornya
                alert(error.message)
            }
        } else {
            // REGISTER

            if(password.length < 6){
                alert('Password harus minimal 6 karakter')
            } else {
                if (password == confirm) {
                    // Create data user di Authentication
                    let res = await Fire.auth()
                                .createUserWithEmailAndPassword(email, password)
                    
                    let user = res.user
                    // Create data user di Database
                    // Menggunakan 'set' agar tidak memili id seperti 'push'
                    await Fire.database().ref(`users/${user.uid}`)
                    .set({
                        fullName: this.state.fullName,
                        nickName: this.state.nickName,
                        age: this.state.age
                    })

                    // Login di Redux
                    this.props.onLoginUser(
                        user.uid,
                        user.email
                    )
                    
                    this.props.navigation.navigate('Main')
                } else {
                    alert('Password dan Confirm harus sama')
                }
            }
        }
        
        
    }

    render() {
        let titleTopButton, form

        if(!this.state.login){
            // RENDER REGISTER
            titleTopButton = 'Switch to Login'
            titleBotBottom = 'Register'
            form = (
                <Form>
                    {/* style: stackedLabel */}
                    <Item stackedLabel>
                        <Label>Full Name</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({fullName: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Nick Name</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({nickName: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </Item>
                    
                    <Item stackedLabel>
                        <Label>Age</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({age: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input 
                            // Agar yang kita ketik akan di hide
                            secureTextEntry
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Confirm Password</Label>
                        <Input 
                            // Agar yang kita ketik akan di hide
                            secureTextEntry
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({confirm: text})}
                        />
                    </Item>
                </Form>
            )
        } else {
            // RENDER LOGIN
            titleTopButton = 'Switch to Register'
            titleBotBottom = 'Login'
            form = (
                <Form>
                    {/* style: stackedLabel */}
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input 
                            // Agar yang kita ketik akan di hide
                            secureTextEntry
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </Item>
                </Form>
            )
            
        }

        return (
            <Container>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Authentication Screen</Text>
                </View>

                <View style={styles.button}>
                    <Button bordered primary onPress={this.onSwitch}>
                        <Text>{titleTopButton}</Text>
                    </Button>
                </View>

                {form}
            
                    <Button block primary onPress={this.authButton}>
                        <Text>{titleBotBottom}</Text>
                    </Button>
                
            </Container>
    )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 15
    },
    title : {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLoginUser: (uid, email) => {dispatch(onLogin(uid, email))}
    }
}

export default connect(null, mapDispatchToProps)(AuthScreen)