import BankIcon from '../assets/icons/b-bank.svg';
import OtherIcon from '../assets/icons/b-home.svg';
import ElectronicIcon from '../assets/icons/b-electronic.svg';
import GoldIcon from '../assets/icons/b-gold.svg';
import StarIcon from '../assets/icons/b-star.svg';
import MedicalIcon from '../assets/icons/b-medical.svg';
import ATMIcon from '../assets/icons/b-atm.svg';

export const MAX_FILE_SIZE = 5242880;

export interface CursorType {
  after?: string | null;
  before?: string | null;
}

export const BusinessTypes = [
  {
    icon: BankIcon,
    value: 'Ngân hàng',
  },
  {
    icon: GoldIcon,
    value: 'Tiệm vàng',
  },
  {
    icon: StarIcon,
    value: 'Văn phòng, cơ quan hành chính',
  },
  {
    icon: ElectronicIcon,
    value: 'Trạm điện',
  },
  {
    icon: MedicalIcon,
    value: 'Bệnh viện',
  },
  {
    icon: ATMIcon,
    value: 'ATM',
  },
  {
    icon: OtherIcon,
    value: 'Khác',
  },
];
