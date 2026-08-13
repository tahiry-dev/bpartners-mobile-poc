import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const CashflowChart: React.FC = () => {
  const { list } = useSelector((state: RootState) => state.invoices);

  // Calculate total cashflow metrics from Redux state
  const totalAmount = list.reduce((acc, inv) => acc + inv.totalAmount, 0);
  
  const paidAmount = list.reduce((acc, inv) => {
    const paidInstallments = inv.installments
      .filter((inst) => inst.status === 'PAID')
      .reduce((sum, inst) => sum + inst.amount, 0);
    return acc + paidInstallments;
  }, 0);

  const pendingAmount = totalAmount - paidAmount;
  const collectionRate = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Cashflow Overview</Text>

      {/* Total Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Forecasted Revenue</Text>
        <Text style={styles.balanceValue}>{totalAmount.toLocaleString('fr-FR')} €</Text>
      </View>

      {/* Metrics breakdown */}
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Collected</Text>
          <Text style={[styles.metricValue, { color: '#16A34A' }]}>
            {paidAmount.toLocaleString('fr-FR')} €
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Pending</Text>
          <Text style={[styles.metricValue, { color: '#D97706' }]}>
            {pendingAmount.toLocaleString('fr-FR')} €
          </Text>
        </View>
      </View>

      {/* Collection Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Collection Rate</Text>
          <Text style={styles.progressValue}>{collectionRate}%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${collectionRate}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  balanceContainer: {
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginTop: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E5E7EB',
  },
  metricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
  progressSection: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
});