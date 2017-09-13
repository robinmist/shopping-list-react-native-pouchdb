import React, { Component } from 'react';
import { Text,  TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addItem, updateNewItemText } from '../actions/index';
import ShoppingListManage from '../components/shopping_list_manage';

class ShoppingListScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.list.title,
    headerRight: (
      <TouchableHighlight underlayColor='transparent' onPress={() => navigation.state.params.onDonePressed()}>
        <Text style={{ fontSize: 17, color: '#FFFFFF' }}>{navigation.state.params.buttonTitle ? navigation.state.params.buttonTitle : ''}</Text>
      </TouchableHighlight>
    ),
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#4A90E2',
      paddingRight: 10
    }
  });

  constructor(props) {
    super(props);
  }

  handleDonePressed() {
    if (this.props.newItemText != '') {
      this.props.addItem(this.props.newItemText, this.props.navigation.state.params.list);
      this.props.updateNewItemText('');
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ buttonTitle: '', onDonePressed: () => this.handleDonePressed() })
  }

  componentWillUpdate(nextProps) {
    let buttonTitle = (! nextProps.newItemText || nextProps.newItemText == '') ? '' : 'Done';
    if (buttonTitle != nextProps.navigation.state.params.buttonTitle) {
      nextProps.navigation.setParams({ buttonTitle: buttonTitle, onDonePressed: () => this.handleDonePressed() })
    }
  }

  render() {
    return (
      <ShoppingListManage list={this.props.navigation.state.params.list} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNewItemText: updateNewItemText,
    addItem: addItem 
  }, dispatch);
}

function mapStateToProps(state) {
	return {
    newItemText: state.newItemText
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListScreen);