import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Header } from './src/components/Header';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header />
          {/* Main components (Cashflow chart & Invoice form) will go here */}
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});