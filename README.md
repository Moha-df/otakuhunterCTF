# 🔐 Next.js Security Learning Project

![Next.js](https://img.shields.io/badge/Next.js-13.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-5.1+-525252?style=for-the-badge)

An educational project to explore web security concepts and authentication with Next.js. This application demonstrates fundamental security practices for React/Next.js developers.

## 📋 Overview

This project was created to deepen my understanding of Next.js and essential principles of modern web security. The application implements a robust authentication system with multiple layers of protection.

### 🌐 Deployment
The application is deployed and accessible at: [https://moha-df-auth.vercel.app/](https://moha-df-auth.vercel.app/)

### ✨ Main Features

- **Secure Authentication** - Complete system based on bcrypt and tokens
- **Attack Protection** - Rate limiting mechanisms and temporary blocking
- **Secure Session Management** - Use of httpOnly and sameSite cookies
- **Protection Middleware** - Route security and smart redirects
- **Adaptive UI** - Simple and responsive interface

## 🛠️ Technologies Used

- **Next.js** - React framework for server-side rendering and API Routes
- **TypeScript** - For static typing and better maintainability
- **Tailwind CSS** - For quick and responsive styling
- **bcrypt** - For secure password hashing
- **crypto** - For authentication token generation

## 🏗️ Project Architecture

```
password/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/       # Secure authentication endpoint
│   │   ├── accueil/        # Protected area of the application
│   │   └── login-page.tsx  # Login interface
│   └── middleware.ts       # Route protection and token verification
├── utils/
│   └── auth.ts             # Authentication functions and helpers
├── .env.local              # Environment variables (not versioned)
├── generate-hash.js        # bcrypt hash generation utility
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🧠 Security Concepts Explored

1. **Secure Password Hashing**
   - Using bcrypt with appropriate cost factor
   - Salting strategies to prevent rainbow table attacks

2. **Protection Against Brute Force Attacks**
   - Login attempt limitation by IP
   - Progressive blocking periods after multiple failures
   - Attempt tracking with programmed expiration

3. **Secure Session Management**
   - Cryptographically secure random tokens
   - Restricted access cookies (httpOnly, secure, sameSite)
   - Limited session lifetime

4. **General Best Practices**
   - Environment variables for sensitive data
   - Strict user input validation
   - Generic error messages (without information disclosure)

## 🚀 Getting Started

1. Clone this repository
   ```bash
   git clone https://github.com/Moha-df/Auth-Security-with-Next.js.git
   cd auth-security-nextjs
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   ```bash
   touch .env.local
   # Edit .env.local to configure the password hash
   ```
   
   Example content for .env.local:
   ```
   HASHED_PASSWORD=your_bcrypt_hash_here
   SALT_ROUNDS=10
   ```

4. Generate a password hash (optional)
   ```bash
   node generate-hash.js your_password
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

## ⚠️ Warning

This project is designed for educational purposes only. Although it implements several security best practices, a production application would require additional measures such as:

- Using a secure database system for users
- Implementing Multi-Factor Authentication (MFA)
- Advanced monitoring and logging of suspicious attempts
- Complete CSRF protection
- Regular penetration testing

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [OWASP Top 10 Guide](https://owasp.org/www-project-top-ten/)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)
- [bcrypt NPM Package](https://www.npmjs.com/package/bcrypt)

## 📝 License

This project is under MIT license. See the [LICENSE](LICENSE) file for more details.

---

*Created as part of my learning journey in Next.js and web security. Contributions and suggestions are welcome!*