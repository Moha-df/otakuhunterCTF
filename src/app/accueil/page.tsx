'use client';

import { useRouter } from 'next/navigation';

export default function Accueil() {
  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-red-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center border-2 border-red-800">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Good job !</h1>
        <p className="text-gray-300 mb-8">You bypassed the security</p>
        <p className="text-gray-300 mb-8">Code is : otakupassword</p>
        <button 
          onClick={handleLogout}
          className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}