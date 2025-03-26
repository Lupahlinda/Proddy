import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function NotesScreen() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote('');
      alert('Nota adicionada com sucesso!');
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
    alert('Nota excluída com sucesso!');
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Notas</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova nota"
        value={note}
        onChangeText={setNote}
      />
      <Button title="Adicionar Nota" onPress={addNote} />
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.note}>{item}</Text>
            <Button title="Excluir" onPress={() => deleteNote(index)} />
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  note: {
    flex: 1,
  },
});
