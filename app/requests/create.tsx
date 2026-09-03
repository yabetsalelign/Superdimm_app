// SuperDimm — Create Request Screen
// Mobile-first form for reporting technical outages, ONT issues, or billing inquiries.

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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
import { api } from '@/services/api';

const CATEGORIES = [
  { id: 'network', label: 'Network Outage', icon: 'wifi-outline' },
  { id: 'sim', label: 'SIM & Mobile', icon: 'cellular-outline' },
  { id: 'billing', label: 'Billing & Charges', icon: 'receipt-outline' },
  { id: 'plan', label: 'Plan Upgrade', icon: 'sparkles-outline' },
  { id: 'provisioning', label: 'ONT / Activation', icon: 'hardware-chip-outline' },
  { id: 'other', label: 'General Inquiry', icon: 'help-circle-outline' },
] as const;

export default function CreateRequestScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('network');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setErrorText('Please enter a summary of the problem.');
      return;
    }

    setIsSubmitting(true);
    setErrorText(null);

    const res = await api.requests.create({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
    });

    setIsSubmitting(false);

    if (res.success) {
      Alert.alert(
        'Ticket Created',
        `Your case has been logged in the queue with reference SR-${res.data.id.slice(-5).toUpperCase()}.`,
        [
          {
            text: 'View My Requests',
            onPress: () => router.replace('/(tabs)/requests'),
          },
        ]
      );
    } else {
      setErrorText(res.error.message || 'Failed to submit request. Please try again.');
    }
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Cancel request"
          >
            <Ionicons name="arrow-back" size={24} color={theme.foreground} />
          </TouchableOpacity>
          <ThemedText variant="h3" style={styles.headerTitle}>
            New Support Request
          </ThemedText>
          <View style={{ width: 24 }} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {errorText ? (
              <View
                style={[
                  styles.errorBanner,
                  {
                    backgroundColor: theme.errorBackground,
                    borderColor: theme.errorBorder,
                  },
                ]}
              >
                <Ionicons name="alert-circle" size={18} color={theme.error} />
                <ThemedText variant="caption" style={{ color: theme.error, flex: 1, fontWeight: '500' }}>
                  {errorText}
                </ThemedText>
              </View>
            ) : null}

            <Card style={styles.formCard}>
              <View style={styles.fieldGroup}>
                <ThemedText variant="label">Issue Category</ThemedText>
                <View style={styles.categoryGrid}>
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <TouchableOpacity
                        key={cat.id}
                        style={[
                          styles.categoryChip,
                          isSelected && {
                            backgroundColor: theme.primary,
                            borderColor: theme.primary,
                          },
                          { borderColor: theme.border },
                        ]}
                        onPress={() => setCategory(cat.id)}
                      >
                        <Ionicons
                          name={cat.icon as any}
                          size={15}
                          color={isSelected ? theme.primaryForeground : theme.mutedForeground}
                        />
                        <ThemedText
                          variant="caption"
                          style={{
                            color: isSelected ? theme.primaryForeground : theme.foreground,
                            fontWeight: '600',
                            fontSize: 12,
                          }}
                        >
                          {cat.label}
                        </ThemedText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText variant="label">Problem Summary *</ThemedText>
                <TextInput
                  value={title}
                  onChangeText={(t) => {
                    setTitle(t);
                    if (errorText) setErrorText(null);
                  }}
                  placeholder="e.g. Red alarm light flashing on ONT unit"
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
                <ThemedText variant="label">Detailed Description (Optional)</ThemedText>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Describe when the issue started, affected devices, and troubleshooting steps taken."
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
                label="Submit Support Ticket"
                variant="primary"
                loading={isSubmitting}
                onPress={handleSubmit}
                style={{ marginTop: Spacing[2] }}
              />
            </Card>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  keyboardView: { flex: 1 },
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
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    padding: Spacing[3],
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  fieldGroup: {
    gap: Spacing[2],
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: Spacing[3],
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  input: {
    height: 48,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing[3],
    fontSize: 14,
  },
  textArea: {
    minHeight: 110,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing[3],
    paddingTop: Spacing[3],
    fontSize: 14,
    textAlignVertical: 'top',
  },
});
