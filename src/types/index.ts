
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'collector' | 'user';
  points: number;
  walletAddress?: string;
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    accountName: string;
  };
  createdAt: Date;
}

export interface PlasticType {
  id: string;
  name: string;
  description: string;
  pointValue: number;
  qrCode: string;
  createdBy: string;
  createdAt: Date;
}

export interface PlasticReturn {
  id: string;
  plasticTypeId: string;
  userId: string;
  collectorId: string;
  pointsEarned: number;
  scannedAt: Date;
}

export interface Redemption {
  id: string;
  userId: string;
  pointsRedeemed: number;
  method: 'bank' | 'solana';
  status: 'pending' | 'completed' | 'failed';
  details: {
    amount: number;
    destination: string;
  };
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: 'collector' | 'user';
}
