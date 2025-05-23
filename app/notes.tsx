import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStorage } from '@/hooks/useStorage';

export default function NotesScreen() {
  const [notes, setNotes] = useStorage<string[]>({
    key: 'notes',
    initialValue: []
  });
  const [note, setNote] = useState('');

  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote('');
      alert('Nota adicionada com sucesso!');
    }
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
    alert('Nota excluída com sucesso!');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Notas</ThemedText>
      <TextInput
        style={[styles.input, styles.text]}
        placeholder="Digite uma nova nota"
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={addNote}
      >
        <ThemedText style={styles.addButtonText}>Adicionar Nota</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.noteContainer}>
            <ThemedText style={[styles.note, styles.text]}>{item}</ThemedText>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteNote(index)}
            >
              <ThemedText style={styles.deleteButtonText}>Excluir</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#333',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  note: {
    flex: 1,
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
