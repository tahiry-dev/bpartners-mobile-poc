import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../store/invoicesSlice';
import { Invoice, Installment } from '../types';

export const InvoiceForm: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [upfrontPercentage, setUpfrontPercentage] = useState('30');

  const handleSubmit = () => {
    if (!clientName || !totalAmount) {
      alert('Veuillez remplir le nom du client et le montant total.');
      return;
    }

    const total = parseFloat(totalAmount);
    const upfrontPct = parseFloat(upfrontPercentage) || 30;

    const upfrontAmount = (total * upfrontPct) / 100;
    const remainingAmount = total - upfrontAmount;

    const installments: Installment[] = [
      {
        id: `inst-${Date.now()}-1`,
        dueDate: new Date().toISOString().split('T')[0],
        percentage: upfrontPct,
        amount: upfrontAmount,
        status: 'PAID',
      },
      {
        id: `inst-${Date.now()}-2`,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        percentage: 100 - upfrontPct,
        amount: remainingAmount,
        status: 'PENDING',
      },
    ];

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      clientName,
      totalAmount: total,
      createdAt: new Date().toISOString(),
      syncStatus: 'SYNCED',
      installments,
    };

    dispatch(addInvoice(newInvoice));

    // Reset form and close it
    setClientName('');
    setTotalAmount('');
    setUpfrontPercentage('30');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.toggleButton}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.toggleButtonText}>➕ Créer une Facture Manuelle</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Créer une Facture Manuelle</Text>
        <TouchableOpacity onPress={() => setIsOpen(false)}>
          <Text style={styles.closeText}>✕ Fermer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nom du Client</Text>
        <TextInput
          style={styles.input}
          value={clientName}
          onChangeText={setClientName}
          placeholder="e.g. Acme Corp"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Montant Total (€)</Text>
        <TextInput
          style={styles.input}
          value={totalAmount}
          keyboardType="numeric"
          onChangeText={setTotalAmount}
          placeholder="e.g. 5000"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Acompte (%)</Text>
        <TextInput
          style={styles.input}
          value={upfrontPercentage}
          keyboardType="numeric"
          onChangeText={setUpfrontPercentage}
          placeholder="30"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Enregistrer la Facture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  toggleButton: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  closeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: '#111827',
    backgroundColor: '#FAFAFA',
  },
  submitButton: {
    marginTop: 6,
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});