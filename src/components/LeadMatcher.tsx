import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../store/invoicesSlice';
import { Invoice, Installment } from '../types';

interface Lead {
  id: string;
  clientName: string;
  projectType: string;
  estimatedBudget: number;
  matchScore: number;
  location: string;
  urgency: 'Immédiat' | 'Sous 15 jours' | '1 mois';
  aiRecommendation: string;
}

export const LeadMatcher: React.FC = () => {
  const dispatch = useDispatch();
  const [trade, setTrade] = useState('Plomberie & Chauffage');
  const [location, setLocation] = useState('Paris 11e');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleSearchLeads = () => {
    setIsAnalyzing(true);
    setLeads([]);

    // Simuler le temps de traitement de l'algorithme d'IA
    setTimeout(() => {
      const mockLeads: Lead[] = [
        {
          id: `lead-${Date.now()}-1`,
          clientName: 'Résidence Les Platanes',
          projectType: 'Rénovation complète système de chauffage',
          estimatedBudget: 8500,
          matchScore: 96,
          location: 'Paris 11e (0.8 km)',
          urgency: 'Immédiat',
          aiRecommendation:
            'Proposer une visite sous 24h avec un acompte de 30% pour sécuriser le matériel.',
        },
        {
          id: `lead-${Date.now()}-2`,
          clientName: 'Sci Dupont & Associés',
          projectType: 'Remplacement de 3 chaudières individuelles',
          estimatedBudget: 12000,
          matchScore: 89,
          location: 'Paris 10e (1.5 km)',
          urgency: 'Sous 15 jours',
          aiRecommendation:
            'Budget validé. Envoyer un devis estimatif avec échéancier à 30/70.',
        },
        {
          id: `lead-${Date.now()}-3`,
          clientName: 'Mme Valérie Bernard',
          projectType: 'Installation salle de bain complète',
          estimatedBudget: 4200,
          matchScore: 82,
          location: 'Paris 12e (2.1 km)',
          urgency: '1 mois',
          aiRecommendation:
            'Client indécis sur les finitions. Proposer un rendez-vous conseil.',
        },
      ];

      setLeads(mockLeads);
      setIsAnalyzing(false);
    }, 1200);
  };

  // Convertir un prospect directement en facture avec acompte de 30%
  const handleConvertToInvoice = (lead: Lead) => {
    const upfront = (lead.estimatedBudget * 30) / 100;
    const remaining = lead.estimatedBudget - upfront;

    const installments: Installment[] = [
      {
        id: `inst-${Date.now()}-1`,
        dueDate: new Date().toISOString().split('T')[0],
        percentage: 30,
        amount: upfront,
        status: 'PAID',
      },
      {
        id: `inst-${Date.now()}-2`,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        percentage: 70,
        amount: remaining,
        status: 'PENDING',
      },
    ];

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      clientName: lead.clientName,
      totalAmount: lead.estimatedBudget,
      createdAt: new Date().toISOString(),
      syncStatus: 'SYNCED',
      installments,
    };

    dispatch(addInvoice(newInvoice));
    alert(`Facture créée pour ${lead.clientName} dans le module Cashflow !`);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Search Filter Card */}
      <View style={styles.card}>
        <Text style={styles.title}>🎯 Moteur de Match Prospect</Text>
        <Text style={styles.subtitle}>
          L'IA sélectionne les chantiers les plus rentables selon votre zone et votre corps d'état.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Métier / Corps d'état</Text>
          <TextInput
            style={styles.input}
            value={trade}
            onChangeText={setTrade}
            placeholder="e.g. Plomberie..."
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Zone géographique</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. Paris 11e..."
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isAnalyzing}
          style={styles.button}
          onPress={handleSearchLeads}
        >
          {isAnalyzing ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Lancer l'analyse IA</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Recommended Leads List */}
      {leads.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            {leads.length} Prospects Qualifiés Identifiés
          </Text>

          {leads.map((lead) => (
            <View key={lead.id} style={styles.leadCard}>
              {/* Header Badge */}
              <View style={styles.leadHeader}>
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreText}>🔥 {lead.matchScore}% Match</Text>
                </View>
                <Text style={styles.urgencyText}>⚡ {lead.urgency}</Text>
              </View>

              <Text style={styles.clientName}>{lead.clientName}</Text>
              <Text style={styles.projectType}>{lead.projectType}</Text>
              <Text style={styles.locationText}>📍 {lead.location}</Text>

              <View style={styles.budgetRow}>
                <Text style={styles.budgetLabel}>Budget Estimé</Text>
                <Text style={styles.budgetValue}>
                  {lead.estimatedBudget.toLocaleString('fr-FR')} €
                </Text>
              </View>

              {/* AI Strategy Box */}
              <View style={styles.aiBox}>
                <Text style={styles.aiBoxTitle}>💡 Conseil Stratégique IA</Text>
                <Text style={styles.aiBoxContent}>{lead.aiRecommendation}</Text>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.convertButton}
                onPress={() => handleConvertToInvoice(lead)}
              >
                <Text style={styles.convertButtonText}>
                  ➕ Créer la Facture d'Acompte
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
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
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  resultsContainer: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  leadCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  scoreText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  urgencyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DC2626',
  },
  clientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  projectType: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 2,
  },
  locationText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  budgetLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  aiBox: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
    marginBottom: 12,
  },
  aiBoxTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1D4ED8',
    marginBottom: 2,
  },
  aiBoxContent: {
    fontSize: 12,
    color: '#1E40AF',
    lineHeight: 16,
  },
  convertButton: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  convertButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});