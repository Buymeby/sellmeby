import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native'
import { connect } from 'react-redux'
import VendorActions from '../Redux/VendorRedux'
import ImagePicker from 'react-native-image-picker'
import RoundedButton from '../Components/RoundedButton'

class MainScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.register(values)
  }

  state = {
    logo: null
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      let source = { uri: response.uri };

      var logo = {
        uri: source.uri,
        type: 'image/jpeg',
        name: response.fileName
      }

      this.setState({
        logo: logo
      });
    });
  }

  render () {
    return (
      <View>
        <Text>Welcome to Buymeby! To get started, please fill in the following information</Text>

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.logo === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.logo} />
          }
          </View>
        </TouchableOpacity>
        <RoundedButton text={'Upload'} onPress={this.props.upload_logo.bind(this, this.state.logo)} styles={{marginTop: 10}} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  upload_logo: (logo) => dispatch(VendorActions.logoRequest(logo))
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
