import { agencies } from '../Agencies/mockData';

export interface IReport {
  seri: string;
  name: string;
  type: string;
  time: string;
  diary_type: string;
  status: string;
  diary: string;
}

export const reports = [
  {
    seri: 'WZspZdLM7rjl',
    name: 'Woods',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'vFmwEhJzVDfJZhIRnC5P',
    name: 'Montgomery',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Rời khỏi nhà',
    diary: 'Tài khoản Nguyễn Anh đã bật chế độ Rời Khỏi Nhà gateway',
  },
  {
    seri: 'llXJ1af',
    name: 'Schultz',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Báo động',
    diary: 'Nút bấm 02 phát tín hiệu báo động',
  },
  {
    seri: '5zaloi5Iw',
    name: 'Castillo',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'Dt0kbxA',
    name: 'Herrera',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'BMloRfA6LIN',
    name: 'Wilson',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'Z4Ccu7hC3m2',
    name: 'Collins',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: '7fkRgxOhk50',
    name: 'Colon',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'fEj6mESB3078',
    name: 'Shelton',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'Ru3X19yYg1Jfntp0A1xg',
    name: 'Goodman',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'yPrNBIxPsMx7eBdZDJQ',
    name: 'Alexander',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'K3IIkTi1Hu',
    name: 'Martinez',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'vuAZBq0RT3oHNkp',
    name: 'Weber',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'k8gqu0aB9rn2q',
    name: 'Rodriquez',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'NvThywxg5K5rwa',
    name: 'Hubbard',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
  {
    seri: 'dZVqmEIlJyEVOIlPJ6',
    name: 'Peters',
    type: 'SGW-GM2',
    time: '20:13:23 22/03/2023',
    diary_type: 'Lưu ý',
    status: 'Pin yếu',
    diary: 'Nút bấm 01 pin yếu dưới 20%',
  },
];

export const selectAgencies = [
  {
    label: 'Tất cả',
    value: 'all',
  },
  ...agencies.map((item) => ({ label: item.name, value: item.id })),
];
