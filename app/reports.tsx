import { StyleSheet, View, Text, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function ReportsScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Relatórios</ThemedText>
      <Text style={styles.report}>Relatório de produtividade semanal: 80% concluído.</Text>
      <Text style={styles.report}>Relatório de metas diárias: 5/7 metas alcançadas.</Text>
      <Button title="Exportar Relatórios" onPress={() => alert('Relatórios exportados com sucesso!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  report: {
    marginVertical: 8,
    fontSize: 16,
  },
});
