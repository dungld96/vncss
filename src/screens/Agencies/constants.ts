import { IAgency } from '../../services/agencies.service';

export interface AgencyType extends IAgency {
  username: string;
  phone: string;
  password: string;
  confirm_password: string;
  parent_uuid?: string;
}
export const defaultInitialValue: AgencyType = {
  id: '',
  name: '',
  username: '',
  phone: '',
  password: '',
  confirm_password: '',
  address: '',
  parent_id: null,
  level: '',
  user: {
    phone: '',
    username: '',
  },
};
