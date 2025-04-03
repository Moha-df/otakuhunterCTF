import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Vérifier si le cookie d'authentification existe
  const authToken = request.cookies.get('auth_token');
  
  return NextResponse.json({ 
    authenticated: !!authToken 
  });
}