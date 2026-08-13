import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const LeadMatcher: React.FC = () => {
  const [trade, setTrade] = useState('Plomberie');
  const [location, setLocation] = useState('Paris 11e');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchLeads = () => {
    setIsSearching(true);
    // Logique d'analyse IA à venir
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>🎯 IA Lead Matcher</Text>
        <Text style={styles.subtitle}>
          Trouvez et qualifiez les meilleurs chantiers et prospects pour votre activité.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Métier / Corps d'état</Text>
          <TextInput
            style={styles.input}
            value={trade}
            onChangeText={setTrade}
            placeholder="e.g. Plomberie, Électricité..."
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Zone géographique</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. Bordeaux, Lyon..."
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleSearchLeads}
        >
          <Text style={styles.buttonText}>
            {isSearching ? 'Analyse IA en cours...' : 'Rechercher des prospects'}
          </Text>
        </TouchableOpacity>
      </View>
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
});