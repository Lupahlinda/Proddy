import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
      alert('Tarefa adicionada com sucesso!');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    alert('Tarefa excluída com sucesso!');
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Tarefas</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova tarefa"
        value={task}
        onChangeText={setTask}
        accessibilityLabel="Campo de entrada para nova tarefa"
      />
      <Button title="Adicionar Tarefa" onPress={addTask} accessibilityLabel="Adicionar nova tarefa" />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item}</Text>
            <Button title="Excluir" onPress={() => deleteTask(index)} accessibilityLabel={`Excluir tarefa ${item}`} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 16,
    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#edf2f7',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  task: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
