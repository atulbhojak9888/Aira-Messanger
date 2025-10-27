import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TypingIndicator() {
  return (
    <View style={styles.wrap}><Text style={styles.dot}>• • •</Text></View>
  );
}

const styles = StyleSheet.create({ wrap: { padding: 8, marginLeft: 12 }, dot: { fontSize: 18, color: '#666' } });
