import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import AuthActions from '../Redux/AuthRedux'
import RegistrationForm from '../Components/RegistrationForm'

// Styles
import styles from './Styles/LaunchScreenStyles'

class RegistrationScreen extends Component {
  handleRegisterSubmit = (values) => {
    this.props.register(values)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <RegistrationForm onSubmit={this.handleRegisterSubmit} />
          <TouchableOpacity onPress={() => this.props.navigateLogin()}>
            <Text style={styles.sectionText}>Already a member? Login Here</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  register: (_) => {
    dispatch(AuthActions.registrationRequest(_.email, _.password, _.password_confirmation, _.name))
  },
  navigateLogin: () => {
    dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
