import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function MessageBubble({ m }) {
  const isUser = m.sender === 'user';
  return (
    <View style={[styles.row, isUser ? styles.rowRight : styles.rowLeft]}>
      {!isUser && <Image source={require('../../assets/avatar-ai.png')} style={styles.avatar} />}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={isUser ? {color:'#fff'} : {}}>{m.text}</Text>
        {m.memoryTag && <Text style={styles.tag}>Remembered: {m.memoryTag}</Text>}
      </View>
      {isUser && <View style={{ width: 36 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', marginVertical: 6, paddingHorizontal: 12 },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },
  avatar: { width: 36, height: 36, marginRight: 8, borderRadius: 18 },
  bubble: { maxWidth: '78%', padding: 10, borderRadius: 12 },
  aiBubble: { backgroundColor: '#f1f3f5' },
  userBubble: { backgroundColor: '#0a84ff' },
  tag: { marginTop: 6, fontSize: 11, color: '#666' }
});
