import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ChatContext } from '../context/ChatContext';

export default function MemoryPanel({ navigation }) {
  const { memories } = useContext(ChatContext);

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()}><Text>Back</Text></TouchableOpacity><Text style={{ fontSize: 18 }}>Memories</Text></View>
      <FlatList data={memories} keyExtractor={(i) => i.id} renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.cat}>{item.category}</Text>
          <Text style={styles.txt}>{item.text}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({ header: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:12, marginBottom:12 }, item: { padding:12, borderBottomWidth:1, borderColor:'#eee' }, cat: { fontSize:12, color:'#888' }, txt: { marginTop:6 }, date: { marginTop:6, fontSize:11, color:'#aaa' } });
