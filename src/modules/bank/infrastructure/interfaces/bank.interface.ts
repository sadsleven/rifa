export interface IBankOwner {
  name: string;
  email: string;
  phone: string;
}

export interface IBank {
  id: number;
  dbs: string;
  name: string;
  urlEndpoint: string;
  secretJwt: string;
  hashBank: string;
  urlBg: string | null;
  urlLogo: string | null;
  owner?: IBankOwner;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBankSchema {
  dbs: string;
  name: string;
  urlEndpoint: string;
  secretJwt: string;
  hashBank: string;
  urlBg?: string | null;
  urlLogo?: string | null;
  owner: IBankOwner;
}

export interface IBankSchemaEdit {
  dbs?: string;
  name?: string;
  urlEndpoint?: string;
  secretJwt?: string;
  hashBank?: string;
  urlBg?: string | null;
  urlLogo?: string | null;
  owner?: IBankOwner;
}
