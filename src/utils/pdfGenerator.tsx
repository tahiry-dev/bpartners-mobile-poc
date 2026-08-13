import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { Linking } from 'react-native';
import { Invoice } from '../types';
import { InvoicePDFDocument } from '../components/InvoicePDFDocument';

// Direct vector PDF download generator
export const downloadInvoicePDF = async (invoice: Invoice) => {
  // Pass docElement as any to satisfy @react-pdf/renderer internal signature
  const docElement = <InvoicePDFDocument invoice={invoice} />;
  const blob = await pdf(docElement as any).toBlob();
  
  // Trigger instant direct download of .pdf file
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `Facture_${invoice.clientName.replace(/\s+/g, '_')}_${invoice.id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
};

// Email trigger
export const sendInvoiceEmail = (invoice: Invoice) => {
  const formattedDate = new Date(invoice.createdAt).toLocaleDateString('fr-FR');
  const subject = encodeURIComponent(`Facture Bpartners N° ${invoice.id} - ${invoice.clientName}`);

  const bodyText = `Bonjour,

Veuillez trouver ci-dessous le récapitulatif de votre facture N° ${invoice.id} émise le ${formattedDate} :

- Client : ${invoice.clientName}
- Montant Total TTC : ${invoice.totalAmount.toLocaleString('fr-FR')} €

Cordialement,
L'équipe Bpartners`;

  const body = encodeURIComponent(bodyText);
  const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;

  if (typeof window !== 'undefined') {
    window.location.href = mailtoUrl;
  } else {
    Linking.openURL(mailtoUrl);
  }
};