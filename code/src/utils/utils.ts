export const logger = (name, data: any) => {
  console.log(`[points page] ${name}: ${JSON.stringify(data)}`);
};

/**
 * Parse query string from URL
 * @param search - The query string (e.g., "?key=value&foo=bar") or full URL
 * @returns An object with parsed query parameters
 * 
 * @example
 * parseQueryString("?code=ABC123&env=prod")
 * // Returns: { code: "ABC123", env: "prod" }
 * 
 * @example
 * parseQueryString(window.location.search)
 * // Returns: { ... }
 */
export const parseQueryString = (search?: string): Record<string, string> => {
  // If no search string provided, try to get from window.location
  if (!search) {
    if (typeof window !== 'undefined' && window.location?.search) {
      search = window.location.search;
    } else {
      return {};
    }
  }

  // Remove leading '?' if present
  const queryString = search.startsWith('?') ? search.slice(1) : search;
  
  // Handle full URL - extract query part
  if (queryString.includes('?')) {
    const urlParts = queryString.split('?');
    const queryPart = urlParts[urlParts.length - 1];
    // Remove hash if present
    const cleanQuery = queryPart.split('#')[0];
    return parseQueryString(cleanQuery);
  }

  // Use URLSearchParams for parsing
  try {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};
    
    params.forEach((value, key) => {
      result[key] = value;
    });
    
    return result;
  } catch (error) {
    console.error('Failed to parse query string:', error);
    return {};
  }
};

/**
 * Get a specific query parameter value
 * @param key - The parameter key
 * @param search - Optional query string, defaults to window.location.search
 * @returns The parameter value or null if not found
 * 
 * @example
 * getQueryParam("code")
 * // Returns: "ABC123" or null
 */
export const getQueryParam = (key: string, search?: string): string | null => {
  const params = parseQueryString(search);
  return params[key] || null;
};