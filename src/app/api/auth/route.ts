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
    console.error("Error: HASHED_PASSWORD is not defined in environment variables");
    return NextResponse.json({ 
      success: false, 
      message: "Error server configuration" 
    }, { status: 500 });
  }

  console.log("Received password:", password);
  console.log("Stored hash:", hashedPassword);

  // Compare the provided password with the stored hash
  const passwordMatch = await bcrypt.compare(password, hashedPassword);

  console.log("Comparison result:", passwordMatch);

  
  if (passwordMatch) {
    // Reset attempts in case of success
    loginAttempts.delete(ip);
    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Create the response with the cookie
    const response = NextResponse.json({ success: true });
    
    // Define the authentication cookie
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });
    
    return response;
  }
  
  // Increment the attempt counter in case of failure
  if (!attemptData) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
  } else {
    attemptData.count += 1;
    attemptData.lastAttempt = now;
  }
  
  // Calculate how many attempts are left
  const attemptsLeft = MAX_ATTEMPTS - (loginAttempts.get(ip)?.count || 0);
  
  return NextResponse.json({ 
    success: false, 
    message: `Incorrect password. ${attemptsLeft} attempt${attemptsLeft > 1 ? 's' : ''}.` 
  }, { status: 401 });
}