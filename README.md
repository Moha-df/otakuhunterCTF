# 🎯 Otaku Hunter CTF

## 🏴‍☠️ Challenge Description

Welcome to the Otaku Hunter CTF! This is a web security challenge where you need to find a way to bypass the authentication system.

### 🎯 Objective
Find a way to access the protected content without knowing the password.

### 💡 Hints
- The authentication system might have some vulnerabilities
- Inspect how the application handles authentication
- Browser's developer tools might be helpful

### 🚀 Getting Started
1. Clone this repository
```bash
git clone https://github.com/Moha-df/otakuhunterCTF.git
cd otakuhunterCTF
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### 🏆 Solution
<details>
<summary>Click to reveal the solution</summary>

The authentication can be bypassed by creating an auth cookie in the browser's console:
```javascript
document.cookie = "auth_token=any_value; path=/; secure; samesite=strict";
```

This vulnerability exists because the application only checks for the presence of the auth_token cookie, not its value.
</details>

## 🛡️ Educational Purpose
This CTF is designed for educational purposes to demonstrate:
- The importance of proper cookie validation
- Why you shouldn't trust client-side data
- How to properly implement authentication systems

## 🎨 Features
- Next.js 14 application
- Animated background with floating particles
- Responsive design
- Red-themed UI inspired by One Piece

## 👨‍💻 Author
Made by Soki

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details 