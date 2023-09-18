export interface ToastDataModel {
  title?: string;
  message: string;
  state?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  date?: any;
}
