import { Text } from 'react-native';
import { Stack } from 'expo-router';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as SQLite from 'expo-sqlite';
import { db } from '../src/db/client';
import migrations from '../drizzle/migrations';

const expo = SQLite.openDatabaseSync('genesis.db');

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expo);

  if (error) {
    return <Text>Erro ao aplicar migrations: {error.message}</Text>;
  }

  if (!success) {
    return <Text>Preparando banco de dados...</Text>;
  }

  return <Stack />;
}