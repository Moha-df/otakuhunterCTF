import { NextResponse } from 'next/server';

export async function POST() {
  // Créer une réponse
  const response = NextResponse.json({ success: true });
  
  // Supprimer le cookie d'authentification
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    expires: new Date(0),  // Date dans le passé pour supprimer immédiatement
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
  
  return response;
}