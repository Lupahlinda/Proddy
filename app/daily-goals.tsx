import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function DailyGoalsScreen() {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState('');

  const addGoal = () => {
    if (goal.trim()) {
      setGoals([...goals, { text: goal, completed: false }]);
      setGoal('');
    }
  };

  const toggleGoal = (index) => {
    setGoals(
      goals.map((goal, i) =>
        i === index ? { ...goal, completed: !goal.completed } : goal
      )
    );
    alert(goals[index].completed ? 'Meta marcada como não concluída!' : 'Meta concluída!');
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Metas Diárias</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova meta"
        value={goal}
        onChangeText={setGoal}
      />
      <Button title="Adicionar Meta" onPress={addGoal} />
      <FlatList
        data={goals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleGoal(index)}>
            <Text style={[styles.goal, item.completed && styles.completedGoal]}>{item.text}</Text>
          </TouchableOpacity>
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
  goal: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  completedGoal: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
