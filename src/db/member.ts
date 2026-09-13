import { db } from './client';
import { members } from './schema';

export async function createMember(name: string, phone: string) {
  await db.insert(members).values({ name, phone });
}

export async function listarMembros() {
  return db.select().from(members);
}