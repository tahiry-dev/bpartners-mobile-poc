import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addInvoice } from '../store/invoicesSlice';
import { incrementPendingSync } from '../store/offlineSlice';
import { Invoice, Installment } from '../types';

export const InvoiceForm: React.FC = () => {
  const dispatch = useDispatch();
  const { isOnline } = useSelector((state: RootState) => state.offline);

  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');
  const [downPaymentPercent, setDownPaymentPercent] = useState('30'); // Default 30% upfront

  const handleCreateInvoice = () => {
    const totalAmount = parseFloat(amount);

    if (!clientName.trim() || isNaN(totalAmount) || totalAmount <= 0) {
      alert('Please fill in a valid client name and total amount.');
      return;
    }

    const pct = Math.min(Math.max(parseFloat(downPaymentPercent) || 0, 0), 100);
    const upfrontAmount = (totalAmount * pct) / 100;
    const remainingAmount = totalAmount - upfrontAmount;

    // Generate invoice installments
    const installments: Installment[] = [
      {
        id: `inst-${Date.now()}-1`,
        dueDate: new Date().toISOString().split('T')[0],
        percentage: pct,
        amount: upfrontAmount,
        status: 'PAID',
      },
    ];

    if (pct < 100) {
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);
      installments.push({
        id: `inst-${Date.now()}-2`,
        dueDate: nextMonth.toISOString().split('T')[0],
        percentage: 100 - pct,
        amount: remainingAmount,
        status: 'PENDING',
      });
    }

    // New invoice object
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      clientName: clientName.trim(),
      totalAmount,
      createdAt: new Date().toISOString(),
      syncStatus: isOnline ? 'SYNCED' : 'PENDING_SYNC',
      installments,
    };

    // Dispatch actions
    dispatch(addInvoice(newInvoice));

    if (!isOnline) {
      dispatch(incrementPendingSync());
    }

    // Reset form fields
    setClientName('');
    setAmount('');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Create New Invoice</Text>

      {/* Client Name Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Client Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Acme Corp"
          value={clientName}
          onChangeText={setClientName}
        />
      </View>

      {/* Total Amount Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Total Amount (€)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 5000"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* Payment Schedule Option */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Upfront Down Payment (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="30"
          keyboardType="numeric"
          value={downPaymentPercent}
          onChangeText={setDownPaymentPercent}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, { backgroundColor: isOnline ? '#2563EB' : '#D97706' }]}
        onPress={handleCreateInvoice}
      >
        <Text style={styles.buttonText}>
          {isOnline ? 'Create Invoice' : 'Save Locally (Offline)'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#FAFAFA',
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});