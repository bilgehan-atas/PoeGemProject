export interface rawAltGemData {
  name: string;
  from_gem: string;
  to_gem: string;
  r_tries: number;
  s_tries: number;
}

export interface altGemData {
  fName?: string;
  from_gem?: string;
  method?: string;
  bCost?: number;
  tries?: number;
  cost?: number;
  value?: number;
  profit?: number;
}

export enum regrading {
  prime = 'Prime Regrading Lens',
  secondary = 'Secondary Regrading Lens',
}

export enum gemTypes {
  Superior = 'Superior',
  Anomalous = 'Anomalous',
  Divergent = 'Divergent',
  Phantasmal = 'Phantasmal',
}
