export interface UserType {
  id?: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  confirm_password: string;
  role: string;
  password: string;
  first_name: string;
  last_name: string;
}
export const defaultValueUser: UserType = {
  id: '',
  name: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  role: 'accountant',
  username: '',
  password: '',
  confirm_password: '',
};

export const listRole = [
  {
    value: 'accountant',
    label: 'Chọn chức vụ',
  },
  {
    value: 'manager',
    label: 'Quản trị viên',
  },
  {
    value: 'technician',
    label: 'Nhân viên kỹ thuật',
  },
  {
    value: 'supporter',
    label: 'Nhân viên',
  },
];

