import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginPage from './login-page';

// Composant côté serveur pour vérifier l'authentification
export default async function Home() {
  // Vérification côté serveur
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token');
  
  // Si l'utilisateur est déjà authentifié, rediriger directement vers /accueil
  if (authToken) {
    redirect('/accueil');
  }
  
  // Sinon, afficher la page de connexion
  return <LoginPage />;
}