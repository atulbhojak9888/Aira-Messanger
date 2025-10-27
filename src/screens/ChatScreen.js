import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { ChatContext } from '../context/ChatContext';
import { getAiResponse } from '../utils/aiLogic';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';

export default function ChatScreen({ navigation }) {
  const { messages, addMessage, addMemory } = useContext(ChatContext);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatRef = useRef();

  useEffect(()=>{ // scroll to end when messages change
    if(flatRef.current) {
      setTimeout(()=>flatRef.current.scrollToEnd?.({animated:true}), 100);
    }
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now().toString(), sender: 'user', text: text.trim() };
    addMessage(userMsg);
    setText('');

    const ai = getAiResponse(userMsg.text);
    setTimeout(() => simulateStreaming(ai), 300);
  };

  const simulateStreaming = (aiObj) => {
    setIsTyping(true);
    const words = aiObj.text.split(' ');
    let built = '';
    let i = 0;
    const interval = setInterval(() => {
      built += (i ? ' ' : '') + words[i];
      const partial = { id: 'ai-stream', sender: 'ai', text: built, memoryTag: aiObj.memory?.tag };
      addMessage(partial);
      i++;
      if (i >= words.length) {
        clearInterval(interval);
        setIsTyping(false);
        addMessage({ id: Date.now().toString(), sender: 'ai', text: aiObj.text, memoryTag: aiObj.memory?.tag });
        if (aiObj.memory) addMemory({ id: Date.now().toString(), category: 'Conversations', text: aiObj.memory.note || aiObj.text, date: new Date().toISOString().split('T')[0] });
      }
    }, 120);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }} keyboardVerticalOffset={90}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={{ fontSize: 18 }}>AiRA</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Memory')}><Text>Memories</Text></TouchableOpacity>
        </View>

        <FlatList
          ref={el=>flatRef.current=el}
          data={messages}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingBottom: 84 }}
          renderItem={({ item }) => <MessageBubble m={item} />}
        />

        {isTyping && <TypingIndicator />}

        <View style={styles.inputWrap}>
          <TextInput value={text} onChangeText={setText} placeholder="Message AiRA..." style={styles.input} />
          <TouchableOpacity onPress={send} style={styles.send}><Text style={{color:'#fff'}}>Send</Text></TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { height: 56, borderBottomWidth: 1, borderColor: '#eee', paddingHorizontal: 12, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' },
  inputWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 10, flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 14, height: 44 },
  send: { marginLeft: 8, backgroundColor: '#0a84ff', paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }
});
