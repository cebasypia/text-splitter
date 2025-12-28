import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({ message: '', visible: false });
    
    setTimeout(() => {
      setToast({ message, visible: true });
      timeoutRef.current = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
        timeoutRef.current = null;
      }, 300); // Start fading out after 0.3s (to match entrance) or as needed
    }, 10);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all ${
          toast.visible
            ? 'opacity-100 translate-y-0 duration-300'
            : 'opacity-0 translate-y-4 pointer-events-none duration-2700'
        }`}
      >
        <div className="bg-green-100 text-green-600 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-green-200">
          <CheckCircle className="text-green-600" size={20} />
          <span className="font-medium">{toast.message}</span>
        </div>
      </div>
    </ToastContext.Provider>
  );
};
