export interface ConfirmDialog {
  title?: string;
  message?: string;
  accept?: {
    // label: string;
    icon?: string;
    function?: () => void;
  };
  cancel?: {
    // label: string;
    icon?: string;
    function?: () => void;
  };
}
