export interface UserType {
  id?: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  confirm_password: string;
  password: string;
}
export const defaultValueUser: UserType = {
  id: '',
  name: '',
  email: '',
  phone: '',
  //   confirmed: '',
  username: '',
  password: '',
  confirm_password: '',
};

export const defaultAttention = {
  show: false,
  title: '',
  content: '',
  type: '',
  textConfirm: '',
  onSuccess: () => {},
};
