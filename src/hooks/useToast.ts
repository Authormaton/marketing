import * as React from "react";
import { ToastProps } from "@/components/ui/Toast";
import { Toast } from "@/components/ui/Toast";
import { AnimatePresence } from "framer-motion";

interface ToastState extends Omit<ToastProps, "onDismiss" | "id"> {
  id: string;
}

type ToastContextType = {
  addToast: (message: string, variant?: ToastProps["variant"], duration?: number) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastState[]>([]);

  const addToast = React.useCallback(
    (message: string, variant: ToastProps["variant"] = "info", duration?: number) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prevToasts) => [...prevToasts, { id, message, variant, duration }]);
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              variant={toast.variant}
              duration={toast.duration}
              onDismiss={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
