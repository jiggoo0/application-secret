// 💡 File: components/ui/use-toast.jsx

import * as React from 'react';
// import { ToastAction } from '@/components/ui/toast';    // ❌ REMOVED: ไม่ได้ใช้งาน (แก้ warning)
// import { toast as invokeToast } from '@/components/ui/toaster'; // ❌ REMOVED: ไม่ได้ใช้งาน (แก้ warning)

const TOAST_LIMIT = 5;

// สถานะและ Hook หลัก (Simplified for .jsx)
const reducer = (state, action) => {
  switch (action.type) {
    // 🟢 FIX: ใช้ Block Scope ({}) ครอบ case เพื่อความปลอดภัย (no-case-declarations)
    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    }

    // 🟢 FIX: ใช้ Block Scope ({}) ครอบ case
    case 'UPDATE_TOAST': {
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };
    }

    // 🟢 FIX: ใช้ Block Scope ({}) ครอบ case
    case 'DISMISS_TOAST': {
      const { toasts } = state; // 💡 ประกาศ const ที่นี่ทำได้แล้วเพราะอยู่ใน Block Scope
      if (action.toastId) {
        return {
          ...state,
          toasts: toasts.map((t) => (t.id === action.toastId ? { ...t, open: false } : t)),
        };
      }
      return {
        ...state,
        toasts: [],
      };
    }

    // 🟢 FIX: ใช้ Block Scope ({}) ครอบ case
    case 'REMOVE_TOAST': {
      if (action.toastId === undefined) return state; // ป้องกัน error
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    }

    default:
      return state;
  }
};

const defaultState = {
  toasts: [],
};

const ToastContext = React.createContext(defaultState);

export function useToast() {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  const [openMap, setOpenMap] = React.useState({});

  const idRef = React.useRef(0);

  const toasts = state.toasts.map((toast) => ({
    ...toast,
    open: openMap[toast.id] !== undefined ? openMap[toast.id] : true,
  }));

  const onOpenChange = (id, open) => {
    setOpenMap((prev) => ({ ...prev, [id]: open }));
    if (!open) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', toastId: id });
        setOpenMap((prev) => {
          // 💡 ใช้ Destructuring เพื่อลบ key ออกจาก object อย่างสะอาด
          const { [id]: _, ...rest } = prev;
          return rest;
        });
      }, 500); // Wait for the transition
    }
  };

  const toast = React.useCallback(
    ({ ...props }) => {
      // 💡 ใช้ postfix increment (idRef.current++) ภายในฟังก์ชัน callback
      const id = idRef.current++;

      const update = (props) => dispatch({ type: 'UPDATE_TOAST', toast: { id, ...props } });
      const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

      dispatch({
        type: 'ADD_TOAST',
        toast: {
          ...props,
          id,
          title: props.title,
          description: props.description,
          action: props.action,
          duration: props.duration || 3000,
        },
      });

      return {
        id,
        dismiss,
        update,
      };
    },
    [dispatch],
  );

  return {
    toasts,
    toast,
    dismiss: (id) => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
    onOpenChange,
    // 💡 หากคุณต้องการ expose context provider, คุณต้องทำดังนี้:
    // ToastProvider: ({ children }) => (
    //     <ToastContext.Provider value={{ toasts, toast, dismiss, onOpenChange }}>
    //         {children}
    //     </ToastContext.Provider>
    // )
  };
}
