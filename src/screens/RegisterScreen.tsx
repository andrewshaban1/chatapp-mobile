import React from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import FormInput from '@/src/components/FormInput';
import { AuthStackParamList } from '@/src/navigation/AuthNavigator';
import { useAuthStore } from '@/src/stores/authstore';
import { RegisterFormValues, registerSchema } from '@/src/validation/schemas';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const { register, isLoading } = useAuthStore();
  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  console.log(control.getFieldState('email'));
  console.log(control.getFieldState('username'));
  console.log(control.getFieldState('password'));

  const onSubmit = async (values: RegisterFormValues) => {
    console.log(values);
    try {
      await register(values);
    } catch (error: unknown) {
      console.error(error);
      Alert.alert(
        'Registration failed',
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Join the chat</Text>

        <FormInput
          style={styles.input}
          control={control}
          name="email"
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
        />

        <FormInput
          style={styles.input}
          control={control}
          name="username"
          placeholder="Username"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
        />

        <FormInput
          style={styles.input}
          control={control}
          name="password"
          placeholder="Password (min 8 chars, 1 uppercase, 1 number)"
          placeholderTextColor="#9ca3af"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={void handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkText}>
            Already have an account?{' '}
            <Text style={styles.linkBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
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
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    color: '#6b7280',
    fontSize: 15,
  },
  linkBold: {
    color: '#6366f1',
    fontWeight: '600',
  },
});
