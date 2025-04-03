// Ce script est à exécuter pour générer un nouveau hash de mot de passe
// node -r ts-node/register utils/generate-hash.ts votreMotDePasse

import bcrypt from 'bcrypt';

async function generateHash() {
  const password = process.argv[2];
  
  if (!password) {
    console.error('Veuillez fournir un mot de passe en argument');
    process.exit(1);
  }
  
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Mot de passe haché:');
    console.log(hash);
    console.log('\nAjoutez cette valeur à votre fichier .env.local:');
    console.log(`HASHED_PASSWORD=${hash}`);
  } catch (error) {
    console.error('Erreur lors du hachage:', error);
  }
}

generateHash();