import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const InvoiceList: React.FC = () => {
  const { list } = useSelector((state: RootState) => state.invoices);

  if (list.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No invoices created yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Invoices</Text>

      {list.map((invoice) => (
        <View key={invoice.id} style={styles.card}>
          {/* Header Row */}
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.clientName}>{invoice.clientName}</Text>
              <Text style={styles.dateText}>
                {new Date(invoice.createdAt).toLocaleDateString('fr-FR')}
              </Text>
            </View>

            {/* Sync Badge */}
            <View
              style={[
                styles.syncBadge,
                {
                  backgroundColor:
                    invoice.syncStatus === 'SYNCED' ? '#E0F2FE' : '#FEF3C7',
                },
              ]}
            >
              <Text
                style={[
                  styles.syncBadgeText,
                  {
                    color:
                      invoice.syncStatus === 'SYNCED' ? '#0369A1' : '#B45309',
                  },
                ]}
              >
                {invoice.syncStatus === 'SYNCED' ? 'Synced' : 'Pending Sync'}
              </Text>
            </View>
          </View>

          {/* Amount Row */}
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.amountValue}>
              {invoice.totalAmount.toLocaleString('fr-FR')} €
            </Text>
          </View>

          {/* Schedule / Installments */}
          <View style={styles.installmentsContainer}>
            <Text style={styles.installmentsTitle}>Payment Schedule</Text>
            {invoice.installments.map((inst) => (
              <View key={inst.id} style={styles.installmentRow}>
                <Text style={styles.installmentText}>
                  {inst.percentage}% ({inst.amount.toLocaleString('fr-FR')} €)
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        inst.status === 'PAID' ? '#DCFCE7' : '#F3F4F6',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: inst.status === 'PAID' ? '#15803D' : '#4B5563',
                      },
                    ]}
                  >
                    {inst.status === 'PAID' ? 'Paid (Upfront)' : 'Due at +30d'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  dateText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  syncBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  syncBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  installmentsContainer: {
    marginTop: 4,
  },
  installmentsTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  installmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  installmentText: {
    fontSize: 12,
    color: '#374151',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
  },
});