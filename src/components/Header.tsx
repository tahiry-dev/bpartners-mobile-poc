import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
  activeTab?: 'cashflow' | 'leads';
  onNavigate?: (tab: 'cashflow' | 'leads') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab = 'cashflow', onNavigate }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.navRow}>
        {/* Bouton Précédent */}
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={activeTab === 'cashflow'}
          style={[styles.arrowButton, activeTab === 'cashflow' && styles.disabledArrow]}
          onPress={() => onNavigate?.('cashflow')}
        >
          <Text style={styles.arrowText}>◄</Text>
        </TouchableOpacity>

        {/* Brand Title */}
        <View style={styles.titleBox}>
          <Text style={styles.brandTitle}>Bpartners</Text>
          <Text style={styles.subtitle}>
            {activeTab === 'cashflow' ? '📊 Cashflow & Invoicing' : '🎯 IA Lead Matcher'}
          </Text>
        </View>

        {/* Bouton Suivant */}
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={activeTab === 'leads'}
          style={[styles.arrowButton, activeTab === 'leads' && styles.disabledArrow]}
          onPress={() => onNavigate?.('leads')}
        >
          <Text style={styles.arrowText}>►</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledArrow: {
    backgroundColor: '#F3F4F6',
    opacity: 0.4,
  },
  arrowText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: 'bold',
  },
  titleBox: {
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
});