'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Accueil() {
  const router = useRouter();
  const [username, setUsername] = useState('Utilisateur');

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-red-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center border-2 border-red-800">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Bien joué</h1>
        <p className="text-gray-300 mb-8">Vous avez contourné la sécurité</p>
        <button 
          onClick={handleLogout}
          className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition duration-300"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}