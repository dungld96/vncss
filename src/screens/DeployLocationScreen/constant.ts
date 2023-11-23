export const randomId = () => Math.random().toString(36).substr(2, 6);

export const defaultInitialValues = {
  name: '',
  business: '',
  contact_name: '',
  contact_number: '',
  contract_date: '',
  tags: [] as { tagName: string; agency: string }[],
  address: '',
  commune: '',
  district: '',
  province: '',
  event_receivers: [{ name: '', position: '', phone: '', enabled: true }],
};
