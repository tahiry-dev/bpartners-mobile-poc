import React from 'react';
import { StyleSheet, View } from 'react-native';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <View style={styles.webWrapper}>
      {/* Coque externe du téléphone */}
      <View style={styles.phoneFrame}>
        {/* Caméra / Dynamic Island en haut */}
        <View style={styles.notchContainer}>
          <View style={styles.notch} />
        </View>

        {/* Écran de l'application avec coins arrondis */}
        <View style={styles.screen}>{children}</View>

        {/* Barre d'accueil iOS / Android en bas */}
        <View style={styles.homeBarContainer}>
          <View style={styles.homeBar} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    backgroundColor: '#0F172A', // Fond sombre d'arrière-plan
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32, // Padding autour du téléphone sur la page web
    minHeight: '100vh' as any,
  },
  phoneFrame: {
    width: '100%',
    maxWidth: 375,
    height: '90vh' as any, // Hauteur adaptable pour ne pas dépasser de l'écran
    maxHeight: 820,
    backgroundColor: '#1E293B', // Bordure sombre du châssis
    borderRadius: 48, // Coins très arrondis
    padding: 12, // Épaisseur de la bordure du téléphone
    borderWidth: 2,
    borderColor: '#334155',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    position: 'relative',
  },
  notchContainer: {
    position: 'absolute',
    top: 18,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  notch: {
    width: 110,
    height: 24,
    backgroundColor: '#0F172A',
    borderRadius: 12,
  },
  screen: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 36, // Arrondi parfait de l'écran intérieur
    overflow: 'hidden', // Empêche le contenu de déborder des coins arrondis
    paddingTop: 36, // Espacement sous la Dynamic Island
  },
  homeBarContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  homeBar: {
    width: 120,
    height: 4,
    backgroundColor: '#64748B',
    borderRadius: 2,
  },
});