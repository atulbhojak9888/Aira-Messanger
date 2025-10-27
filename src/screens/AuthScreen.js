import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(true);
  const [error, setError] = useState('');

  const onLogin = () => {
    setError('');
    if (!email || !password) return setError('Enter email and password');
    if (email === 'test@aira.ai' && password === 'password') {
      navigation.replace('Chat');
    } else setError('Invalid credentials — try test@aira.ai / password');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AiRA</Text>
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <View style={{ width: '100%' }}>
        <TextInput placeholder="Password" style={styles.input} secureTextEntry={hide} value={password} onChangeText={setPassword} />
        <TouchableOpacity onPress={() => setHide((h) => !h)} style={styles.toggle}>
          <Text>{hide ? 'Show' : 'Hide'}</Text>
        </TouchableOpacity>
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={onLogin}><Text style={{color:'#fff'}}>Log in</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 36, marginBottom: 24 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ddd', padding: 12, marginBottom: 12, borderRadius: 8 },
  toggle: { position: 'absolute', right: 14, top: 14 },
  button: { marginTop: 12, backgroundColor: '#0a84ff', padding: 14, width: '100%', alignItems: 'center', borderRadius: 8 },
  error: { color: 'red', marginTop: 6 }
});
