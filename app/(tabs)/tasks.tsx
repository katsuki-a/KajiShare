import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { TaskItem, Task } from '@/components/TaskItem';

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

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>家事分担</ThemedText>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem task={item} onPress={handleTaskPress} />
        )}
        keyExtractor={item => item.id}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
}); 