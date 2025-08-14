// src/lib/cart-token.ts

const CART_TOKEN_KEY = 'guestCartToken'; // Key used in localStorage

/**
 * Retrieves the guest cart token from localStorage.
 * Returns null if not found or if localStorage is unavailable.
 * @returns {string | null} The token or null.
 */
export function getCartToken(): string {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      let token = localStorage.getItem(CART_TOKEN_KEY);
      if (!token) {
        token = generateUniqueToken();
        localStorage.setItem(CART_TOKEN_KEY, token);
      }
      return token;
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
  return generateUniqueToken();
}

function generateUniqueToken(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Saves the guest cart token to localStorage.
 * Does nothing if localStorage is unavailable or token is null/undefined.
 * @param {string | null | undefined} token The token to save.
 */
export function setCartToken(token: string | null | undefined): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage && token) {
      localStorage.setItem(CART_TOKEN_KEY, token);
    } else if (typeof window !== 'undefined' && window.localStorage) {
      // If token is explicitly null/undefined, consider removing it
      // localStorage.removeItem(CART_TOKEN_KEY); // Optional: Uncomment if you want null to clear
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
}

/**
 * Removes the guest cart token from localStorage.
 * Does nothing if localStorage is unavailable.
 */
export function removeCartToken(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(CART_TOKEN_KEY);
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
}