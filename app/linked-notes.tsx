import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

type Note = {
  id: string;
  title: string;
  content: string;
  links: string[];
};

export default function LinkedNotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createNote = () => {
    if (title.trim() && content.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        links: extractLinks(content),
      };
      setNotes([...notes, newNote]);
      setTitle('');
      setContent('');
      alert('Nota criada com sucesso!');
    }
  };

  const extractLinks = (text: string) => {
    const linkRegex = /\[\[(.*?)\]\]/g;
    const links: string[] = [];
    let match;
    while ((match = linkRegex.exec(text)) !== null) {
      links.push(match[1]);
    }
    return links;
  };

  const openNote = (title: string) => {
    const note = notes.find((n) => n.title === title);
    if (note) {
      setCurrentNote(note);
    } else {
      alert('Nota não encontrada!');
    }
  };

  return (
    <View style={styles.container}>
      {currentNote ? (
        <View>
          <ThemedText type="title">{currentNote.title}</ThemedText>
          <Text style={styles.content}>{currentNote.content}</Text>
          <ThemedText type="subtitle">Links:</ThemedText>
          {currentNote.links.map((link, index) => (
            <TouchableOpacity key={index} onPress={() => openNote(link)}>
              <Text style={styles.link}>[[{link}]]</Text>
            </TouchableOpacity>
          ))}
          <Button title="Voltar" onPress={() => setCurrentNote(null)} />
        </View>
      ) : (
        <View>
          <ThemedText type="title">Notas Interligadas</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Título da nota"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conteúdo da nota (use [[título]] para links)"
            value={content}
            onChangeText={setContent}
            multiline
          />
          <Button title="Criar Nota" onPress={createNote} />
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openNote(item.title)}>
                <Text style={styles.noteTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  noteTitle: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  content: {
    marginVertical: 8,
    fontSize: 16,
  },
  link: {
    color: '#0a7ea4',
    textDecorationLine: 'underline',
  },
});
