import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

export type Task = {
  id: string;
  title: string;
  assignedTo: string;
  isCompleted: boolean;
};

type TaskItemProps = {
  task: Task;
  onPress: (task: Task) => void;
};

export function TaskItem({ task, onPress }: TaskItemProps) {
  return (
    <TouchableOpacity onPress={() => onPress(task)}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.taskInfo}>
          <ThemedText type="defaultSemiBold">{task.title}</ThemedText>
          <ThemedText>担当: {task.assignedTo}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.status, task.isCompleted && styles.completed]}>
          <ThemedText>{task.isCompleted ? '完了' : '未完了'}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
  },
  status: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#FFE4E1',
  },
  completed: {
    backgroundColor: '#90EE90',
  },
}); 