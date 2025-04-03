import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcrypt';


// Stocker les tentatives d'authentification
// En production, on utilisera plutôt une base de données ou Redis mais flemme la
const loginAttempts = new Map<string, { count: number, lastAttempt: number }>();

// Configurer les limites
const MAX_ATTEMPTS = 5;           // Nombre maximal de tentatives
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes en millisecondes
const ATTEMPT_RESET = 60 * 60 * 1000;    // Réinitialiser le compteur après 1h

export async function POST(request: Request) {


  // Obtenir l'adresse IP du client
  const ip = request.headers.get('x-forwarded-for') || 'unknown-ip';

  // Vérifier si l'IP est verrouillée
  const attemptData = loginAttempts.get(ip);
  const now = Date.now();

  if (attemptData) {
    // Vérifier si l'IP est en période de verrouillage
    if (attemptData.count >= MAX_ATTEMPTS) {
      const timeElapsed = now - attemptData.lastAttempt;
      
      if (timeElapsed < LOCKOUT_DURATION) {
        const remainingSeconds = Math.ceil((LOCKOUT_DURATION - timeElapsed) / 1000);
        return NextResponse.json({ 
          success: false, 
          message: `Trop de tentatives, réessayez dans ${remainingSeconds} secondes` 
        }, { status: 429 });
      } else {
        // Réinitialiser après la période de verrouillage
        attemptData.count = 0;
      }
    }
    
    // Réinitialiser le compteur si la dernière tentative date de plus d'une heure
    if (now - attemptData.lastAttempt > ATTEMPT_RESET) {
      attemptData.count = 0;
    }
  }

  const { password } = await request.json();

  const hashedPassword = process.env.HASHED_PASSWORD;


  if (!hashedPassword) {
    console.error("Erreur: HASHED_PASSWORD n'est pas défini dans les variables d'environnement");
    return NextResponse.json({ 
      success: false, 
      message: "Erreur de configuration du serveur" 
    }, { status: 500 });
  }

  console.log("Mot de passe reçu:", password);
  console.log("Hash stocké:", hashedPassword);

  // Comparer le mot de passe fourni avec le hash stocké
  const passwordMatch = await bcrypt.compare(password, hashedPassword);

  console.log("Résultat de la comparaison:", passwordMatch);

  
  if (passwordMatch) {
    // Réinitialiser les tentatives en cas de succès
    loginAttempts.delete(ip);
    // Générer un token aléatoire sécurisé
    const token = crypto.randomBytes(32).toString('hex');
    
    // Créer la réponse avec le cookie
    const response = NextResponse.json({ success: true });
    
    // Définir le cookie d'authentification
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 heures
    });
    
    return response;
  }
  
  // Incrémenter le compteur de tentatives en cas d'échec
  if (!attemptData) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
  } else {
    attemptData.count += 1;
    attemptData.lastAttempt = now;
  }
  
  // Calculer combien de tentatives il reste
  const attemptsLeft = MAX_ATTEMPTS - (loginAttempts.get(ip)?.count || 0);
  
  return NextResponse.json({ 
    success: false, 
    message: `Mot de passe incorrect. ${attemptsLeft} tentative${attemptsLeft > 1 ? 's' : ''} restante${attemptsLeft > 1 ? 's' : ''}.` 
  }, { status: 401 });
}