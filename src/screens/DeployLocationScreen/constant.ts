export const randomId = () => Math.random().toString(36).substr(2, 6);

type ObjectType = { [key: string]: any };

export interface UsersReceiveType {
  id: string;
  name: string;
  regency: string;
  phone: string;
}

export interface LocationResponType {
  name: string;
  business_id?: string;
  contact_name: string;
  contact_number: string;
  contract_date: string;
  tags: {
    tagName?: string;
    agency?: string;
  }[];
  address: string;
  commune: string;
  district: string;
  province: string;
  usersReceive?: UsersReceiveType[];
  dataCity?: ObjectType;
  dataDistrict?: ObjectType;
  lat?: string | number;
  lng?: string | number;
}

export const defaultInitialValues: LocationResponType = {
  name: '',
  business_id: '',
  contact_name: '',
  contact_number: '',
  contract_date: '',
  tags: [],
  address: '',
  commune: '',
  district: '',
  province: '',
  usersReceive: [{ id: randomId(), name: '', regency: '', phone: '' }],
  dataCity: {},
};
