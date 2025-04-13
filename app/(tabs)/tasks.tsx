import React, { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { TaskItem, Task } from '@/components/TaskItem';
import { IconSymbol } from '@/components/ui/IconSymbol';

// サンプルデータ
const initialTasks: Task[] = [
  {
    id: '1',
    title: '洗濯',
    assignedTo: '田中',
    isCompleted: false,
  },
  {
    id: '2',
    title: '風呂掃除',
    assignedTo: '佐藤',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'ゴミ出し',
    assignedTo: '田中',
    isCompleted: true,
  },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleTaskPress = (task: Task) => {
    setTasks(tasks.map(t => 
      t.id === task.id 
        ? { ...t, isCompleted: !t.isCompleted }
        : t
    ));
  };

  const handleAddTask = () => {
    router.push('/modal/add-task');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>家事分担</ThemedText>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddTask}
          >
            <IconSymbol size={24} name="plus.circle.fill" color="#007AFF" />
          </TouchableOpacity>
        </ThemedView>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem task={item} onPress={handleTaskPress} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 0,
  },
  addButton: {
    padding: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
}); 