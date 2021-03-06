import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {
  Screen,
  ScrollView,
  GridRow,
  TouchableOpacity,
  Image,
  Subtitle,
  Card,
  View,
  Caption,
  ListView
} from '@shoutem/ui';

class ItemList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData) {
    const { openItemDetails } = this.props;

    const cellViews = rowData.map((item, id) => {
      return (
        <TouchableOpacity styleName="flexible" key={item.id} onPress={() => openItemDetails(item)}>
          <Card styleName="flexible">
            <Image
              styleName="medium-wide"
              source={{ uri: item.image_file_src  }}
            />
            <View>
              <Subtitle>{item.name}</Subtitle>
              <Caption>${item.price}/{item.unit}</Caption>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }

  render() {
    const groupedData = GridRow.groupByRows(this.props.items, 2, () => {
      return 1;
    });
    return (
      <Screen>
        <ListView
          data={groupedData}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.vendor.items
  }
}

const mapDispatchToProps = (dispatch) => ({
  openItemDetails: (item) => dispatch(NavigationActions.navigate({ routeName: 'ItemDetailsScreen', params: { item: item }}))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
