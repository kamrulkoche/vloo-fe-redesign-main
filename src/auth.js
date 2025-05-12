// /src/auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";

//  Login with custom backend API
async function loginUser(credentials) {
  try {
    const response = await fetch(
      "https://vloo.lamptechs.com/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      },
    );

    const data = await response.json();

    if (data.status && data.access_token) {
      return {
        id: data.data.id,
        email: data.data.email,
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        userType: data.data.user_type,
        accessToken: data.access_token,
        userData: data.data,
        needsCompletion: false,
        signUpType: "Credentials",
      };
    }

    return null;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (!parsed.success) throw new Error("Invalid credentials");

        const user = await loginUser(parsed.data);
        if (!user) throw new Error("CredentialsSignin");

        return user;
      },
    }),

    LinkedInProvider({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/linkedin`,
        },
      },
      async profile(profile) {
        try {
          const res = await fetch(
            `https://vloo.lamptechs.com/api/v1/public/sign-up/searchEmail?email=${profile.email}`,
          );
          const data = await res.json();

          return {
            id: profile.sub,
            email: profile.email,
            userType: "User",
            first_name: profile.given_name,
            last_name: profile.family_name,
            provider_id: profile.sub,
            image: profile.picture,
            signUpType: "LinkedIn",
            needsCompletion: data.status,
          };
        } catch (err) {
          console.error("LinkedIn user check failed:", err);
          return {
            id: profile.sub,
            email: profile.email,
            userType: "User",
            first_name: profile.given_name,
            last_name: profile.family_name,
            provider_id: profile.sub,
            image: profile.picture,
            signUpType: "LinkedIn",
            needsCompletion: true,
          };
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
      async profile(profile) {
        try {
          const res = await fetch(
            `https://vloo.lamptechs.com/api/v1/public/sign-up/searchEmail?email=${profile.email}`,
          );
          const data = await res.json();

          return {
            id: profile.sub,
            email: profile.email,
            userType: "User",
            first_name: profile.given_name || profile.name?.split(" ")[0],
            last_name: profile.family_name || profile.name?.split(" ")[1] || "",
            provider_id: profile.sub,
            image: profile.picture,
            signUpType: "Google",
            needsCompletion: data.status,
          };
        } catch (err) {
          console.error("Google user check failed:", err);
          return {
            id: profile.sub,
            email: profile.email,
            userType: "User",
            first_name: profile.given_name || profile.name?.split(" ")[0],
            last_name: profile.family_name || profile.name?.split(" ")[1] || "",
            provider_id: profile.sub,
            image: profile.picture,
            signUpType: "Google",
            needsCompletion: true,
          };
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Handle session updates from our custom API
      if (trigger === "update" && session) {
        token.userType = session.userType || token.userType;
        token.needsCompletion =
          session.needsCompletion || token.needsCompletion;
        token.accessToken = session.accessToken || token.accessToken;
        token.userData = session.userData || token.userData;
      }

      if (user) {
        token.userType = user.userType;
        token.needsCompletion = user.needsCompletion;
        token.accessToken = user.accessToken;
        token.userData = user.userData;
        token.signUpType = user.signUpType;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.provider_id = user.provider_id;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.userType = token.userType;
      session.needsCompletion = token.needsCompletion;
      session.accessToken = token.accessToken;
      session.userData = token.userData;
      session.signUpType = token.signUpType;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;
      session.user.provider_id = token.provider_id;
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});
