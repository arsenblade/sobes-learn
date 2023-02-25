import { toast } from 'react-toastify';

export const MyToast = (title: string, success: boolean) => {
  // eslint-disable-next-line no-unused-expressions
  success ? toast.success(title, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
    : toast.error(title, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
};
