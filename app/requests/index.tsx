// SuperDimm — Requests Sub-route List View
// Full list of customer service requests with filters placeholder.

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing } from '@/constants';

export default function RequestsListScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Sub-header with back button */}
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Back"
          >
            <Ionicons name="arrow-back" size={24} color={theme.foreground} />
          </TouchableOpacity>
          <ThemedText variant="h3" style={styles.headerTitle}>
            All Requests
          </ThemedText>
          <Button
            label="+ New"
            size="sm"
            onPress={() => router.push('/requests/create')}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/requests/1' as any)}
          >
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <ThemedText variant="mono" primary style={styles.ref}>
                  SD-2026-0819
                </ThemedText>
                <Badge label="In Progress" variant="warning" />
              </View>
              <ThemedText variant="label" style={styles.title}>
                Intermittent optical loss on ONT port
              </ThemedText>
              <ThemedText variant="caption" muted>
                Submitted on Sep 01, 2026
              </ThemedText>
            </Card>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderBottomWidth: 1,
  },
  backButton: {
    padding: Spacing[1],
  },
  headerTitle: {
    fontSize: 18,
  },
  scroll: {
    padding: Spacing[4],
    gap: Spacing[3],
  },
  card: {
    padding: Spacing[4],
    gap: Spacing[2],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ref: {
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 15,
  },
});
