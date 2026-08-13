import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setNetworkStatus, clearPendingSync } from '../store/offlineSlice';
import { syncPendingInvoices } from '../store/invoicesSlice';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isOnline, pendingSyncCount } = useSelector((state: RootState) => state.offline);

  // Toggle simulated network status and auto-sync when back online
  const handleToggleNetwork = () => {
    const nextStatus = !isOnline;
    dispatch(setNetworkStatus(nextStatus));

    // Auto-sync pending invoices when switching back to online mode
    if (nextStatus && pendingSyncCount > 0) {
      dispatch(syncPendingInvoices());
      dispatch(clearPendingSync());
    }
  };

  return (
    <View style={styles.container}>
      {/* App Title */}
      <View>
        <Text style={styles.title}>Bpartners</Text>
        <Text style={styles.subtitle}>Cashflow & Invoicing</Text>
      </View>

      {/* Network Status Toggle Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleToggleNetwork}
        style={[
          styles.badge,
          { backgroundColor: isOnline ? '#DCFCE7' : '#FEE2E2' },
        ]}
      >
        <View
          style={[
            styles.dot,
            { backgroundColor: isOnline ? '#16A34A' : '#DC2626' },
          ]}
        />
        <Text style={[styles.badgeText, { color: isOnline ? '#15803D' : '#B91C1C' }]}>
          {isOnline ? 'Online' : 'Offline'}
        </Text>
      </TouchableOpacity>

      {/* Pending Sync Indicator */}
      {pendingSyncCount > 0 && (
        <View style={styles.syncContainer}>
          <Text style={styles.syncText}>
            {pendingSyncCount} pending sync{pendingSyncCount > 1 ? 's' : ''}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  syncContainer: {
    position: 'absolute',
    bottom: 4,
    left: 20,
  },
  syncText: {
    fontSize: 10,
    color: '#D97706',
    fontWeight: '500',
  },
});