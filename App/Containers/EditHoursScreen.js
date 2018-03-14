import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TimePicker from 'react-native-modal-datetime-picker';
import {
  Heading,
  View,
  Tile,
  Text,
  Title,
  Subtitle,
  Caption,
  Icon,
  Overlay,
  Button,
  Row,
  Switch,
  Divider
} from '@shoutem/ui';

// Styles
import styles from './Styles/EditHoursScreenStyle'

class EditHoursScreen extends Component {
  state = {
    days: [
      {
        name: 'Monday',
        open: false,
        open_time: null,
        close_time: null
      },
      {
        name: 'Tuesday',
        open: false,
        open_time: null,
        close_time: null
      },
      {
        name: 'Wednesday',
        open: false,
        open_time: null,
        close_time: null
      },
      {
        name: 'Thursday',
        open: false,
        open_time: null,
        close_time: null
      },
      {
        name: 'Friday',
        open: false,
        open_time: null,
        close_time: null
      },
      {
        name: 'Saturday',
        open: false,
        open_time: null,
        close_time: null
      },
      {
        name: 'Sunday',
        open: false,
        open_time: null,
        close_time: null
      },
    ],
    isTimePickerVisible: false,
    pickingIndex: null,
    pickingKey: null
  };

  _showTimePicker = (index, key) => this.setState({ isTimePickerVisible: true, pickingIndex: index, pickingKey: key});

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false, pickingIndex: null, pickingKey: null });

  _handleTimePicked = (date) => {
    let days = [...this.state.days];
    days[this.state.pickingIndex][this.state.pickingKey] = date
    this.setState({ days })
    this._hideTimePicker();
  };

  renderTimePicker(day, index, key) {
    const label = key === 'open_time' ? 'Open' : 'Close'
    const value = day[key] ? day[key].getHours() + ":" + day[key].getMinutes() : '-'

    return (
      <View styleName="vertical">
        <TouchableOpacity onPress={this._showTimePicker.bind(this, index, key)}>
          <Text>{value}</Text>
        </TouchableOpacity>
        <Caption>{label}</Caption>
      </View>
    )
  }

  renderRow(day, i) {
    const switchOn = this.state.days[i].open
    return (
      <View key={i}>
        <Row styleName="medium">
          <Text>{day.name}</Text>
          {switchOn ?
            this.renderTimePicker(day, i, 'open_time')
            :
            <Title>Closed</Title>
          }
          {switchOn ?
            this.renderTimePicker(day, i, 'close_time')
            :
            <View/>
          }
          <Switch
            onValueChange={value => {
              let days = [...this.state.days];
              days[i].open = value
              this.setState({ days })
            }}
            value={switchOn}/>
        </Row>
        <Divider styleName="line" />
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Title styleName="md-gutter-bottom">Please input your operational hours</Title>
          {
            this.state.days.map((day, i) => this.renderRow(day, i))
          }
          <TouchableOpacity onPress={this._showTimePicker}>
            <Text>Show TimePicker</Text>
          </TouchableOpacity>
          <TimePicker
            mode='time'
            isVisible={this.state.isTimePickerVisible}
            onConfirm={this._handleTimePicked}
            onCancel={this._hideTimePicker}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditHoursScreen)