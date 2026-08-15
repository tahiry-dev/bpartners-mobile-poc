import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { MobileContainer } from './src/components/MobileContainer';
import { Header } from './src/components/Header';
import { CashflowChart } from './src/components/CashflowChart';
import { InvoiceForm } from './src/components/InvoiceForm';
import { InvoiceList } from './src/components/InvoiceList';
import { LeadMatcher } from './src/components/LeadMatcher';
import { BottomTabs } from './src/components/BottomTabs';

export default function App() {
  const [activeTab, setActiveTab] = useState('cashflow');

  return (
    <Provider store={store}>
      <MobileContainer>
        <View style={styles.container}>
          {/* Header avec flèches de navigation */}
          <Header activeTab={activeTab} onNavigate={(tab) => setActiveTab(tab)} />

          {/* Tab Content */}
          <View style={styles.content}>
            {activeTab === 'cashflow' ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                <CashflowChart />
                <InvoiceForm />
                <InvoiceList />
              </ScrollView>
            ) : (
              <LeadMatcher onNavigateToCashflow={() => setActiveTab('cashflow')} />
            )}
          </View>

          {/* Bottom Navigation Menu */}
          <BottomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
      </MobileContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});