import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AccueilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vérification côté serveur
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token');
  
  if (!authToken) {
    // Redirection côté serveur avant tout rendu
    redirect('/');
  }
  
  return (
    <div>{children}</div>
  );
}