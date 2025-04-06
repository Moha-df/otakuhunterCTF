import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginPage from './login-page';
import Image from 'next/image';
import shanksImage from './images/0022_2d.png.webp';
import AnimatedBackground from './components/AnimatedBackground';
import AnimatedTitle from './components/AnimatedTitle';

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
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <AnimatedTitle />
      <LoginPage />
      <div className="fixed bottom-4 left-4 z-10">
        <Image
          src={shanksImage}
          alt="Shanks"
          width={500}
          height={500}
          className="object-contain w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
        />
      </div>
      <div className="fixed bottom-2 w-full text-center z-50">
        <p className="text-white text-sm opacity-70">
          Made by Soki
        </p>
      </div>
    </div>
  );
}