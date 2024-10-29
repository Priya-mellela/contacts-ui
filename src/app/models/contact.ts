export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  position: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface ContactResponse {
  hasErrors?: boolean;
  message: string;
  data: Contact[];
}
