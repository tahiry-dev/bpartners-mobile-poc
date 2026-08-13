import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { Invoice } from '../types';
import { InvoicePDFDocument } from '../components/InvoicePDFDocument';

// Direct vector PDF download generator
export const downloadInvoicePDF = async (invoice: Invoice) => {
  const docElement = <InvoicePDFDocument invoice={invoice} />;
  const blob = await pdf(docElement as any).toBlob();

  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `Facture_${invoice.clientName.replace(/\s+/g, '_')}_${invoice.id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
};