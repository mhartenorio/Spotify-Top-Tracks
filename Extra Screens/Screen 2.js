import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Screen3({ navigation, route }) {
    const { paramName } = route.params 
    class MyWebComponent extends Component {
        render() {
          return <WebView source={{ uri: paramName }} />;
        }
      }
    return <MyWebComponent></MyWebComponent>
};