import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStorage } from '@/hooks/useStorage';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'in-progress' | 'completed' | 'pending';
  tasks: string[];
}

export default function ProjectsScreen() {
  const [projects, setProjects] = useStorage<Project[]>({
    key: 'projects',
    initialValue: [
      {
        id: '1',
        title: 'Projeto Padrão',
        description: 'Este é um projeto de exemplo',
        status: 'pending' as const,
        tasks: ['Tarefa 1', 'Tarefa 2'],
      },
    ],
  });
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'pending',
  });

  const addProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      setProjects([
        ...projects,
        {
          id: Date.now().toString(),
          title: newProject.title,
          description: newProject.description,
          status: 'pending' as const,
          tasks: [],
        },
      ]);
      setShowModal(false);
      setNewProject({ title: '', description: '', status: 'pending' });
    }
  };

  const updateStatus = (id: string, status: 'pending' | 'in-progress' | 'completed') => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, status } : project
    ));
  };

  const addTask = (projectId: string, task: string) => {
    if (task.trim()) {
      setProjects(projects.map(project =>
        project.id === projectId
          ? { ...project, tasks: [...project.tasks, task] }
          : project
      ));
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Gerenciador de Projetos</ThemedText>
      <ThemedText style={styles.description}>
        Organize e acompanhe seus projetos complexos
      </ThemedText>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(true)}
      >
        <ThemedText style={styles.addButtonText}>Novo Projeto</ThemedText>
      </TouchableOpacity>

      <ScrollView style={styles.projectsContainer}>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.projectCard}>
              <View style={styles.projectHeader}>
                <ThemedText style={styles.projectTitle}>{item.title}</ThemedText>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    item.status === 'pending' && styles.pendingButton,
                    item.status === 'in-progress' && styles.inProgressButton,
                    item.status === 'completed' && styles.completedButton,
                  ]}
                  onPress={() => {
                    const statuses = ['pending', 'in-progress', 'completed'] as const;
                    const currentIndex = statuses.indexOf(item.status);
                    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                    updateStatus(item.id, nextStatus as 'pending' | 'in-progress' | 'completed');
                  }}
                >
                  <ThemedText style={styles.statusText}>
                    {item.status.replace(/-/g, ' ')}
                  </ThemedText>
                </TouchableOpacity>
              </View>
              <ThemedText style={styles.projectDescription}>
                {item.description}
              </ThemedText>
              <View style={styles.tasksContainer}>
                {item.tasks.map((task, index) => (
                  <View key={index} style={styles.taskItem}>
                    <ThemedText style={styles.taskText}>{task}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
          )}
        />
      </ScrollView>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Novo Projeto</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Título do Projeto"
              value={newProject.title}
              onChangeText={(text) => setNewProject({ ...newProject, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={newProject.description}
              onChangeText={(text) => setNewProject({ ...newProject, description: text })}
              multiline
              numberOfLines={4}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowModal(false);
                  setNewProject({ title: '', description: '', status: 'pending' });
                }}
              >
                <ThemedText style={styles.modalButtonText}>Cancelar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={addProject}
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
  projectsContainer: {
    flex: 1,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusButton: {
    padding: 8,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  pendingButton: {
    backgroundColor: '#FFC107',
  },
  inProgressButton: {
    backgroundColor: '#2196F3',
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
  },
  projectDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  tasksContainer: {
    marginTop: 10,
  },
  taskItem: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 5,
  },
  taskText: {
    fontSize: 16,
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
  inProgressButton: {
    backgroundColor: '#2196F3',
  }
});
