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
  phone: string;
  email: string;
  projectType: string;
  estimatedBudget: number;
  matchScore: number;
  location: string;
  urgency: 'Immédiat' | 'Sous 15 jours' | '1 mois';
  aiRecommendation: string;
  description: string;
}

interface LeadMatcherProps {
  onNavigateToCashflow?: () => void;
}

export const LeadMatcher: React.FC<LeadMatcherProps> = ({ onNavigateToCashflow }) => {
  const dispatch = useDispatch();
  const [trade, setTrade] = useState('Plomberie & Chauffage');
  const [location, setLocation] = useState('Paris 11e');
  const [minBudget, setMinBudget] = useState('3000');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSearchLeads = () => {
    setIsAnalyzing(true);
    setLeads([]);

    setTimeout(() => {
      const mockLeads: Lead[] = [
        {
          id: `lead-${Date.now()}-1`,
          clientName: 'Résidence Les Platanes',
          phone: '+33 6 12 34 56 78',
          email: 'contact@lesplatanes-paris.fr',
          projectType: 'Rénovation complète système de chauffage',
          estimatedBudget: 8500,
          matchScore: 96,
          location: '14 Rue Saint-Maur, Paris 11e (0.8 km)',
          urgency: 'Immédiat',
          aiRecommendation:
            'Proposer une visite technique sous 24h et valider l\'acompte de 30% pour réserver la chaudière.',
          description:
            'Changement nécessaire de la centrale thermique suite à un audit. Le client est prêt à démarrer la semaine prochaine.',
        },
        {
          id: `lead-${Date.now()}-2`,
          clientName: 'Sci Dupont & Associés',
          phone: '+33 1 43 55 90 00',
          email: 'gestion@scidupont.com',
          projectType: 'Remplacement de 3 chaudières individuelles',
          estimatedBudget: 12000,
          matchScore: 89,
          location: '88 Boulevard Voltaire, Paris 11e (1.2 km)',
          urgency: 'Sous 15 jours',
          aiRecommendation:
            'Budget d\'investissement déjà validé. Proposer un contrat multi-sites avec acompte échelonné.',
          description:
            'Modernisation de 3 appartements locatifs avant remise en bail au 1er du mois prochain.',
        },
        {
          id: `lead-${Date.now()}-3`,
          clientName: 'Mme Valérie Bernard',
          phone: '+33 6 98 76 54 32',
          email: 'v.bernard@gmail.com',
          projectType: 'Installation complète salle de bain',
          estimatedBudget: 4200,
          matchScore: 82,
          location: '3 Rue Charonne, Paris 11e (1.8 km)',
          urgency: '1 mois',
          aiRecommendation:
            'Proposer une première visite de métrage et présenter le catalogue matériel.',
          description:
            'Remplacement d\'une baignoire par une douche à l\'italienne et meuble vasque.',
        },
      ];

      const threshold = parseFloat(minBudget) || 0;
      const filteredLeads = mockLeads.filter((l) => l.estimatedBudget >= threshold);

      setLeads(filteredLeads);
      setIsAnalyzing(false);
    }, 1200);
  };

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
    setSelectedIndex(null);

    if (onNavigateToCashflow) {
      onNavigateToCashflow();
    }
  };

  const selectedLead = selectedIndex !== null ? leads[selectedIndex] : null;

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.title}>🎯 Moteur de Match Prospect</Text>
          <Text style={styles.subtitle}>
            L'IA analyse le marché local et sélectionne les chantiers les plus rentables.
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

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Secteur</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Secteur..."
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Budget Min (€)</Text>
              <TextInput
                style={styles.input}
                value={minBudget}
                keyboardType="numeric"
                onChangeText={setMinBudget}
                placeholder="3000"
              />
            </View>
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
              <Text style={styles.buttonText}>Lancer l'Analyse IA</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Results List */}
        {leads.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>
              {leads.length} Prospects Qualifiés Sélectionnés
            </Text>

            {leads.map((lead, idx) => (
              <View key={lead.id} style={styles.leadCard}>
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

                <View style={styles.aiBox}>
                  <Text style={styles.aiBoxTitle}>💡 Conseil Stratégique IA</Text>
                  <Text style={styles.aiBoxContent}>{lead.aiRecommendation}</Text>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.detailsButton}
                    onPress={() => setSelectedIndex(idx)}
                  >
                    <Text style={styles.detailsButtonText}>🔍 Détails & Contact</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.convertButton}
                    onPress={() => handleConvertToInvoice(lead)}
                  >
                    <Text style={styles.convertButtonText}>➕ Facture Acompte</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Pop-up confiné avec flèches de navigation de prospect à prospect */}
      {selectedLead && selectedIndex !== null && (
        <View style={styles.customPopUpOverlay}>
          <View style={styles.customPopUpCard}>
            {/* Header de la pop-up avec flèches */}
            <View style={styles.modalHeaderRow}>
              <TouchableOpacity
                disabled={selectedIndex === 0}
                style={[styles.modalNavBtn, selectedIndex === 0 && styles.disabledNav]}
                onPress={() => setSelectedIndex(selectedIndex - 1)}
              >
                <Text style={styles.modalNavText}>◄ Préc.</Text>
              </TouchableOpacity>

              <Text style={styles.modalCounter}>
                {selectedIndex + 1} / {leads.length}
              </Text>

              <TouchableOpacity
                disabled={selectedIndex === leads.length - 1}
                style={[styles.modalNavBtn, selectedIndex === leads.length - 1 && styles.disabledNav]}
                onPress={() => setSelectedIndex(selectedIndex + 1)}
              >
                <Text style={styles.modalNavText}>Suiv. ►</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>{selectedLead.clientName}</Text>
            <Text style={styles.modalSubtitle}>{selectedLead.projectType}</Text>

            <View style={styles.modalDetailRow}>
              <Text style={styles.modalLabel}>Téléphone :</Text>
              <Text style={styles.modalValue}>{selectedLead.phone}</Text>
            </View>

            <View style={styles.modalDetailRow}>
              <Text style={styles.modalLabel}>E-mail :</Text>
              <Text style={styles.modalValue}>{selectedLead.email}</Text>
            </View>

            <View style={styles.modalDetailRow}>
              <Text style={styles.modalLabel}>Adresse Chantier :</Text>
              <Text style={styles.modalValue}>{selectedLead.location}</Text>
            </View>

            <View style={styles.modalDescriptionBox}>
              <Text style={styles.modalDescriptionTitle}>Description du Besoin :</Text>
              <Text style={styles.modalDescriptionText}>{selectedLead.description}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalConvertBtn}
              onPress={() => handleConvertToInvoice(selectedLead)}
            >
              <Text style={styles.modalConvertBtnText}>
                Convertir en Facture d'Acompte (30%)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalCloseBtn}
              onPress={() => setSelectedIndex(null)}
            >
              <Text style={styles.modalCloseBtnText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 10,
  },
  rowInputs: {
    flexDirection: 'row',
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
  button: {
    marginTop: 6,
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  resultsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  leadCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  scoreBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scoreText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  urgencyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#DC2626',
  },
  clientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  projectType: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 2,
  },
  locationText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    marginVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  budgetLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  budgetValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  aiBox: {
    backgroundColor: '#EFF6FF',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
    marginBottom: 10,
  },
  aiBoxTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1D4ED8',
    marginBottom: 2,
  },
  aiBoxContent: {
    fontSize: 11,
    color: '#1E40AF',
    lineHeight: 15,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 6,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#374151',
    fontSize: 11,
    fontWeight: '600',
  },
  convertButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  convertButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  customPopUpOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    zIndex: 100,
  },
  customPopUpCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalNavBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  disabledNav: {
    backgroundColor: '#F3F4F6',
    opacity: 0.4,
  },
  modalNavText: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '600',
  },
  modalCounter: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  modalDetailRow: {
    marginBottom: 6,
  },
  modalLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  modalValue: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '500',
  },
  modalDescriptionBox: {
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  modalDescriptionTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  modalDescriptionText: {
    fontSize: 11,
    color: '#4B5563',
  },
  modalConvertBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  modalConvertBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  modalCloseBtn: {
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  modalCloseBtnText: {
    color: '#6B7280',
    fontSize: 12,
  },
});