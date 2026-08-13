import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BottomTabsProps {
  activeTab: 'cashflow' | 'leads';
  setActiveTab: (tab: 'cashflow' | 'leads') => void;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      {/* Cashflow Tab */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.tab}
        onPress={() => setActiveTab('cashflow')}
      >
        <Text style={styles.icon}>📊</Text>
        <Text
          style={[
            styles.label,
            activeTab === 'cashflow' && styles.activeLabel,
          ]}
        >
          Cashflow
        </Text>
      </TouchableOpacity>

      {/* IA Leads Tab */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.tab}
        onPress={() => setActiveTab('leads')}
      >
        <Text style={styles.icon}>🎯</Text>
        <Text
          style={[
            styles.label,
            activeTab === 'leads' && styles.activeLabel,
          ]}
        >
          IA Leads
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeLabel: {
    color: '#2563EB',
    fontWeight: '700',
  },
});