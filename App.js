import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Header } from './src/components/Header';
import { CashflowChart } from './src/components/CashflowChart';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <CashflowChart />
          {/* Invoice form & list will go here */}
        </ScrollView>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 24,
  },
});