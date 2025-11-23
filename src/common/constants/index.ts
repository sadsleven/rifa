export const HTTP_SUCCESS_STATUS = [200, 201, 204, 300, 302, 304];
export const HTTP_ERROR_STATUS = [400, 401, 403, 404, 412, 500, 501];
export const DEFAULT_OPTIONS_NOTIFY = {
  defaultOptions: {
    progress: true,
    classes: 'text-medium',
    position: 'bottom-right',
    actions: [{ label: 'Cerrar', color: 'white', handler: () => {} }],
    message: '',
    textColor: 'white',
  },
  success: {
    color: 'app-success',
    icon: 'verified',
    timeout: 4000,
  },
  error: {
    color: 'app-danger',
    icon: 'report_problem',
    timeout: 10000,
  },
  warning: {
    color: 'app-warning',
    icon: 'warning',
    timeout: 10000,
  },
};
