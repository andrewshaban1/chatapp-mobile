import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface FormInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
}

/**
 * A TextInput wired to React Hook Form via <Controller>.
 * Displays the field error automatically beneath the input.
 *
 * Usage:
 *   <FormInput control={control} name="email" label="Email" keyboardType="email-address" />
 */
export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  ...textInputProps
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.wrapper}>
          {label && <Text style={styles.label}>{label}</Text>}
          {console.log('value', value)}
          {console.log('error', error)}
          <TextInput
            style={[styles.input, error && styles.inputError]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholderTextColor="#9ca3af"
            {...textInputProps}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#ef4444',
  },
});
