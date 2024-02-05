import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login', // 定義しておくことで、ユーザーがNextAuth.jsのデフォルトページではなく'/login'にredirectされる
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // redirect unauthenticated users to login page
        } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl)); // <nextUrl>/dashboard というURLを生成
        }
        return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;