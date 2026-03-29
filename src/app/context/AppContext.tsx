import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, User, Badge, INITIAL_BADGES, Project } from '../data/projects';

interface AppContextType {
  state: AppState;
  updateUser: (user: User | null) => void;
  addPoints: (points: number) => void;
  markProjectDone: (projectId: number, project: Project) => void;
  checkBadges: (project: Project) => void;
  claimReward: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'mk3';
const DARK_MODE_KEY = 'mk3_dk';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    user: null,
    pts: 0,
    done: [],
    badges: JSON.parse(JSON.stringify(INITIAL_BADGES)),
    claimable: false
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load state from localStorage (excluding user for session-only auth)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Don't restore user from localStorage - user should log in fresh each session
        setState(prev => ({ 
          ...prev, 
          pts: parsed.pts || 0,
          done: parsed.done || [],
          badges: parsed.badges || JSON.parse(JSON.stringify(INITIAL_BADGES)),
          claimable: parsed.claimable || false
        }));
      } catch (e) {
        console.error('Failed to load state', e);
      }
    }

    const darkMode = localStorage.getItem(DARK_MODE_KEY) === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Save state to localStorage (excluding user for session-only auth)
  useEffect(() => {
    const stateToSave = {
      pts: state.pts,
      done: state.done,
      badges: state.badges,
      claimable: state.claimable
      // Note: user is not saved to localStorage for session-only authentication
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [state]);

  const updateUser = (user: User | null) => {
    setState(prev => ({ ...prev, user }));
  };

  const addPoints = (points: number) => {
    setState(prev => ({ ...prev, pts: prev.pts + points }));
  };

  const markProjectDone = (projectId: number, project: Project) => {
    if (state.done.includes(projectId)) return;
    
    setState(prev => ({
      ...prev,
      done: [...prev.done, projectId],
      pts: prev.pts + project.pts,
      claimable: true
    }));

    checkBadges(project);
  };

  const checkBadges = (project: Project) => {
    setState(prev => {
      const newBadges = prev.badges.map(b => {
        if (b.earned) return b;

        const count = prev.done.length + 1; // +1 because we just added a project

        if (b.type === 'count' && b.thresh > 0 && count >= b.thresh) {
          return { ...b, earned: true };
        }

        if (b.type === 'cat' && project.cat.toLowerCase().includes(b.cat?.toLowerCase() || '')) {
          return { ...b, earned: true };
        }

        if (b.type === 'pts' && prev.pts + project.pts >= b.thresh) {
          return { ...b, earned: true };
        }

        return b;
      });

      return { ...prev, badges: newBadges };
    });
  };

  const claimReward = () => {
    if (!state.claimable) return;
    setState(prev => ({
      ...prev,
      pts: prev.pts + 25,
      claimable: false
    }));
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem(DARK_MODE_KEY, String(newMode));
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{
      state,
      updateUser,
      addPoints,
      markProjectDone,
      checkBadges,
      claimReward,
      toggleDarkMode,
      isDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
