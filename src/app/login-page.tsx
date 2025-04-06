'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedBackground from './components/AnimatedBackground';
export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push('/accueil');
      } else {
        setError(data.message || 'Incorrect password');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-red-900 relative">
      <AnimatedBackground />
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border-2 border-red-800 z-11">
        <h1 className="text-2xl font-bold text-center mb-6 text-red-500">Enter the password</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-gray-700 text-white"
              placeholder="password"
              required
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800 transition duration-300 font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Loading...' : 'Confirm'}
          </button>
        </form>
      </div>
    </div>
  );
}