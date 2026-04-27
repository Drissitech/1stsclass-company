import {StrictMode} from 'react';

// Fix for read-only fetch getter error reported by user:
// "Cannot set property fetch of #<Window> which has only a getter"
// This occurs when a library tries to polyfill or wrap fetch via assignment.
if (typeof window !== 'undefined') {
  (function() {
    try {
      const getDescriptor = (obj: any, prop: string): PropertyDescriptor | null => {
        let current = obj;
        while (current) {
          const desc = Object.getOwnPropertyDescriptor(current, prop);
          if (desc) return desc;
          current = Object.getPrototypeOf(current);
        }
        return null;
      };

      const desc = getDescriptor(window, 'fetch');
      if (desc && !desc.set && desc.configurable) {
        const originalFetch = window.fetch;
        Object.defineProperty(window, 'fetch', {
          get: () => originalFetch,
          set: () => { 
            // Silent catch or log attempt
            console.info('Blocked attempt to overwrite read-only fetch');
          },
          configurable: true,
          enumerable: true
        });
      }
    } catch (e) {
      // Ignore errors during interception setup
    }
  })();
}

import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './lib/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
