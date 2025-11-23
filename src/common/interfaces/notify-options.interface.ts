export interface NotifyOptionsInterface {
  progress: boolean;
  classes: string;
  position:
    | 'bottom-right'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'top'
    | 'bottom'
    | 'center';
  actions?: {
    label: string;
    color: string;
    handler: () => void;
  }[];
  message?: string;
  color?: string;
  textColor?: string;
  icon?: string;
  timeout?: number;
}
