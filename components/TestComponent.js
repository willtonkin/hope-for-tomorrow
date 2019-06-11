import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { updateText } from '../actions';

function TestComponent({ text, state, dispatch }) {
  return (
    <View style={styles.container}>
      <Text>
        {text}
      </Text>
      <Button onPress={() => {dispatch(updateText('some more ' + text)) }} title='press me' />
      <Text>
        state: {JSON.stringify(state)}
      </Text>
    </View>
  );
}

TestComponent.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

function mapStateToProps(state) {
  const { text } = state;

  return { text, state };
}

export default connect(mapStateToProps)(TestComponent);
