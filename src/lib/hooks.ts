import { useContext, useEffect, useRef, useState } from 'react';
import RepositoriesContext from '@/contexts/RepositoriesContext';
import TopicsContext from '@/contexts/TopicsContext';
import BookmarksContext from '@/contexts/BookmarksContext';
import AuthContext from '@/contexts/AuthContext';

// ----------------
// --- Contexts ---
// ----------------

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const useBookmarksContext = () => {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      'useBookmarksContext must be used within a BookmarksContextProvider'
    );
  }

  return context;
};

export const useRepositoriesContext = () => {
  const context = useContext(RepositoriesContext);

  if (!context) {
    throw new Error(
      'useRepositoriesContext must be used within a RepositoriesContextProvider'
    );
  }

  return context;
};

export const useTopicsContext = () => {
  const context = useContext(TopicsContext);

  if (!context) {
    throw new Error(
      'useTopicsContext must be used within a TopicsContextProvider'
    );
  }

  return context;
};

// -------------
// --- Utils ---
// -------------

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, ref };
};
