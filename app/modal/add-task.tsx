import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Task } from '@/components/TaskItem';

type AddTaskModalProps = {
  onAddTask: (task: Task) => void;
};

export default function AddTaskModal() {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !assignedTo.trim()) {
      Alert.alert('エラー', 'タスク名と担当者を入力してください');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      assignedTo: assignedTo.trim(),
      isCompleted: false,
    };

    // TODO: タスクを保存する処理を追加
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>新しいタスク</ThemedText>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText>タスク名</ThemedText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="例：洗濯"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText>担当者</ThemedText>
          <TextInput
            style={styles.input}
            value={assignedTo}
            onChangeText={setAssignedTo}
            placeholder="例：田中"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
        >
          <ThemedText style={styles.buttonText}>追加</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 