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
        activeOpacity={0.8}
        style={[
          styles.tabItem,
          activeTab === 'cashflow' ? styles.activeTabBg : styles.inactiveTabBg,
        ]}
        onPress={() => setActiveTab('cashflow')}
      >
        <Text style={styles.icon}>📊</Text>
        <Text
          style={[
            styles.label,
            activeTab === 'cashflow' ? styles.activeLabel : styles.inactiveLabel,
          ]}
        >
          Cashflow
        </Text>
      </TouchableOpacity>

      {/* IA Leads Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.tabItem,
          activeTab === 'leads' ? styles.activeTabBg : styles.inactiveTabBg,
        ]}
        onPress={() => setActiveTab('leads')}
      >
        <Text style={styles.icon}>🎯</Text>
        <Text
          style={[
            styles.label,
            activeTab === 'leads' ? styles.activeLabel : styles.inactiveLabel,
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
    height: 56,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    flex: 1, // Prend exactement 50% du conteneur
    height: '100%', // Ocuppe toute la hauteur
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  activeTabBg: {
    backgroundColor: '#EFF6FF', // Bleu clair couvrant tout le bloc
    borderTopWidth: 2,
    borderTopColor: '#2563EB', // Ligne indicatrice bleue sur le haut de l'onglet
  },
  inactiveTabBg: {
    backgroundColor: '#FFFFFF',
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: 12,
  },
  activeLabel: {
    color: '#2563EB',
    fontWeight: '700',
  },
  inactiveLabel: {
    color: '#6B7280',
    fontWeight: '500',
  },
});