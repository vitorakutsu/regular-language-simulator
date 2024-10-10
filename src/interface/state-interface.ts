export interface StateInterface{
  id: string;
  label: string;
  position: { x: number; y: number };
  isInitial?: boolean;
  isFinal?: boolean;
}