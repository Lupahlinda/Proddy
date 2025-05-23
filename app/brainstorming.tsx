import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStorage } from '@/hooks/useStorage';

interface Idea {
  id: string;
  text: string;
  category: string;
}

export default function BrainstormingScreen() {
  const [ideas, setIdeas] = useStorage<Idea[]>({
    key: 'brainstormingIdeas',
    initialValue: []
  });
  const [newIdea, setNewIdea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const categories = ['Criatividade', 'Negócios', 'Tecnologia', 'Marketing', 'Outros'];

  const addIdea = () => {
    if (newIdea.trim() && selectedCategory) {
      setIdeas([
        ...ideas,
        {
          id: Date.now().toString(),
          text: newIdea,
          category: selectedCategory
        }
      ]);
      setNewIdea('');
      setSelectedCategory('');
      setShowAddModal(false);
      
      // Scroll para o final
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const deleteIdea = (id: string) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Brainstorming</ThemedText>
      <ThemedText style={styles.description}>
        Adicione e organize suas ideias por categorias
      </ThemedText>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
      >
        <ThemedText style={styles.addButtonText}>Adicionar Nova Ideia</ThemedText>
      </TouchableOpacity>

      <ScrollView ref={scrollViewRef} style={styles.ideasContainer}>
        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <ThemedText style={styles.categoryTitle}>{category}</ThemedText>
            {ideas
              .filter(idea => idea.category === category)
              .map((idea) => (
                <TouchableOpacity
                  key={idea.id}
                  style={styles.ideaCard}
                  activeOpacity={0.8}
                >
                  <ThemedText style={styles.ideaText}>{idea.text}</ThemedText>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteIdea(idea.id)}
                  >
                    <ThemedText style={styles.deleteButtonText}>🗑️</ThemedText>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Nova Ideia</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Descreva sua ideia..."
              value={newIdea}
              onChangeText={setNewIdea}
              multiline
              numberOfLines={4}
            />
            <View style={styles.categorySelector}>
              <ThemedText style={styles.categoryLabel}>Categoria:</ThemedText>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat && styles.selectedCategory
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <ThemedText style={styles.categoryButtonText}>{cat}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <ThemedText style={styles.modalButtonText}>Cancelar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={addIdea}
              >
                <ThemedText style={styles.modalButtonText}>Salvar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  ideasContainer: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  ideaCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ideaText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#ff4444',
  },
  deleteButtonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryButtonText: {
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#ff4444',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
