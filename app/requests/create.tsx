// SuperDimm — Create Request Screen
// Form placeholder to submit a network report or customer support ticket.

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';

export default function CreateRequestScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('network');

  const handleSubmit = () => {
    Alert.alert(
      'Phase 1 Notice',
      'Ticket creation API integration will be wired in Phase 2. This is a functional navigation test.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Back"
          >
            <Ionicons name="arrow-back" size={24} color={theme.foreground} />
          </TouchableOpacity>
          <ThemedText variant="h3" style={styles.headerTitle}>
            New Support Request
          </ThemedText>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Card style={styles.formCard}>
            <View style={styles.fieldGroup}>
              <ThemedText variant="label">Issue Category</ThemedText>
              <View style={styles.categoryRow}>
                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    category === 'network' && {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                    { borderColor: theme.border },
                  ]}
                  onPress={() => setCategory('network')}
                >
                  <ThemedText
                    variant="caption"
                    style={{
                      color: category === 'network' ? theme.primaryForeground : theme.foreground,
                      fontWeight: '600',
                    }}
                  >
                    Network Outage
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    category === 'billing' && {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                    { borderColor: theme.border },
                  ]}
                  onPress={() => setCategory('billing')}
                >
                  <ThemedText
                    variant="caption"
                    style={{
                      color: category === 'billing' ? theme.primaryForeground : theme.foreground,
                      fontWeight: '600',
                    }}
                  >
                    Billing Query
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    category === 'hardware' && {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                    { borderColor: theme.border },
                  ]}
                  onPress={() => setCategory('hardware')}
                >
                  <ThemedText
                    variant="caption"
                    style={{
                      color: category === 'hardware' ? theme.primaryForeground : theme.foreground,
                      fontWeight: '600',
                    }}
                  >
                    Hardware / ONT
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <ThemedText variant="label">Summary / Headline</ThemedText>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Red optical alarm light flashing"
                placeholderTextColor={theme.placeholderText}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.input,
                    borderColor: theme.border,
                    color: theme.foreground,
                  },
                ]}
              />
            </View>

            <View style={styles.fieldGroup}>
              <ThemedText variant="label">Detailed Description</ThemedText>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Describe when the issue began, affected devices, and troubleshooting steps taken."
                placeholderTextColor={theme.placeholderText}
                multiline
                numberOfLines={4}
                style={[
                  styles.textArea,
                  {
                    backgroundColor: theme.input,
                    borderColor: theme.border,
                    color: theme.foreground,
                  },
                ]}
              />
            </View>

            <Button
              label="Submit Ticket (Phase 1 Stub)"
              variant="primary"
              onPress={handleSubmit}
              style={{ marginTop: Spacing[2] }}
            />
          </Card>
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
    gap: Spacing[4],
    paddingBottom: Spacing[8],
  },
  formCard: {
    padding: Spacing[4],
    gap: Spacing[4],
  },
  fieldGroup: {
    gap: Spacing[2],
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
  },
  categoryChip: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  input: {
    height: 44,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing[3],
    fontSize: 14,
  },
  textArea: {
    minHeight: 100,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing[3],
    paddingTop: Spacing[3],
    fontSize: 14,
    textAlignVertical: 'top',
  },
});
