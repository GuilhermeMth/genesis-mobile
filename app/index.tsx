import { useState, useCallback } from 'react';
import { View, TextInput, Pressable, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { createMember, listarMembros } from '../src/db/member';

export default function MembrosScreen() {
  const [name, setName] = useState('');
  const [telefone, setTelefone] = useState('');
  const [membros, setMembros] = useState<{ id: number; name: string; telefone: string }[]>([]);

  const carregar = useCallback(() => {
    listarMembros().then((res) => setMembros(res as any));
  }, []);

  useFocusEffect(carregar);

  async function salvar() {
    if (!name.trim() || !telefone.trim()) return;
    await createMember(name, telefone);
    setName('');
    setTelefone('');
    carregar();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Membro</Text>

      <TextInput
        placeholder="name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefone (com DDI/DDD)"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Pressable onPress={salvar} style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>

      <Text style={styles.subtitle}>Membros cadastrados</Text>
      <FlatList
        data={membros}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} — {item.telefone}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 60,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    paddingVertical: 6,
  },
});