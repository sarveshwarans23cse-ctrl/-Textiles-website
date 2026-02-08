import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { readData } from './utils';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const data = readData();
        const admin = data.admin;

        if (credentials.username !== admin.username) {
          return null;
        }

        // Default password: admin123
        const isValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: '1',
          name: admin.username,
          email: 'admin@example.com',
        };
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'change-me-secret-key-2024-minimum-32-characters-required-for-nextauth',
};

