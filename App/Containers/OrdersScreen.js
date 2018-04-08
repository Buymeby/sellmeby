import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import OrdersActions from '../Redux/OrdersRedux'
import styles from './Styles/OrdersScreenStyle'

import {
  Screen,
  Divider,
  ScrollView,
  GridRow,
  TouchableOpacity,
  Image,
  Icon,
  Subtitle,
  View,
  Caption,
  Row,
  Button,
  Title,
  Text
} from '@shoutem/ui';

class OrdersScreen extends Component {
  componentWillMount() {
    this.props.getOrderList()
  }

  render () {
    const orders = this.props.orders;

    return (
      <ScrollView>
        {
          orders.map((order) => (
            <TouchableOpacity key={order.id} onPress={() => this.props.openOrderDetails(order)}>
              <Row>
                <Image
                  styleName="small rounded-corners"
                  source={{ uri: order.image_src || " " }}
                />
                <View styleName="vertical stretch space-between">
                  <Subtitle>{order.name}</Subtitle>
                  <Caption>Total: {order.total_description}</Caption>
                  <View styleName="horizontal">
                    <Caption>{order.created_description}</Caption>
                  </View>
                </View>
                <Button styleName="right-icon">
                  <Icon name="right-arrow"/>
                </Button>
              </Row>
              <Divider styleName="line" />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOrderList: () => dispatch(OrdersActions.ordersRequest()),
  openOrderDetails: (order) => dispatch(NavigationActions.navigate({ routeName: 'OrderDetailsScreen', params: { order: order }}))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen)
