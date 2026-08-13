import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Invoice } from '../types';

// PDF dedicated styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
    paddingBottom: 15,
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  brandSubtitle: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  metaText: {
    fontSize: 9,
    color: '#374151',
    textAlign: 'right',
    marginTop: 2,
  },
  clientBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
  },
  clientLabel: {
    fontSize: 8,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  clientName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    padding: 8,
  },
  colType: { width: '50%' },
  colPct: { width: '25%' },
  colAmount: { width: '25%', textAlign: 'right' },
  headerText: {
    fontWeight: 'bold',
    color: '#334155',
  },
  totalContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 4,
  },
});

interface InvoicePDFDocumentProps {
  invoice: Invoice;
}

export const InvoicePDFDocument: React.FC<InvoicePDFDocumentProps> = ({ invoice }) => {
  const formattedDate = new Date(invoice.createdAt).toLocaleDateString('fr-FR');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>Bpartners</Text>
            <Text style={styles.brandSubtitle}>Gestion de Facturation & Cashflow</Text>
          </View>
          <View>
            <Text style={styles.docTitle}>FACTURE</Text>
            <Text style={styles.metaText}>N° : {invoice.id}</Text>
            <Text style={styles.metaText}>Date : {formattedDate}</Text>
          </View>
        </View>

        {/* Client Box */}
        <View style={styles.clientBox}>
          <Text style={styles.clientLabel}>Client</Text>
          <Text style={styles.clientName}>{invoice.clientName}</Text>
        </View>

        {/* Payment Schedule Table */}
        <Text style={styles.sectionTitle}>Échéancier de paiement</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.colType, styles.headerText]}>Type d'échéance</Text>
            <Text style={[styles.colPct, styles.headerText]}>Pourcentage</Text>
            <Text style={[styles.colAmount, styles.headerText]}>Montant</Text>
          </View>
          {invoice.installments.map((inst) => (
            <View key={inst.id} style={styles.tableRow}>
              <Text style={styles.colType}>
                {inst.status === 'PAID' ? 'Acompte (Immédiat)' : 'Solde (+30 jours)'}
              </Text>
              <Text style={styles.colPct}>{inst.percentage}%</Text>
              <Text style={styles.colAmount}>{inst.amount.toLocaleString('fr-FR')} €</Text>
            </View>
          ))}
        </View>

        {/* Total Amount */}
        <View style={styles.totalContainer}>
          <Text style={{ color: '#6B7280' }}>Montant Total TTC :</Text>
          <Text style={styles.totalAmount}>{invoice.totalAmount.toLocaleString('fr-FR')} €</Text>
        </View>
      </Page>
    </Document>
  );
};