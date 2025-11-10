export interface UserProfile {
  id: string;
  walletAddress: string;
  email: string;
  fullName: string;
  phone: string;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_started';
  kycDocuments: {
    idFront?: string;
    idBack?: string;
    selfie?: string;
  };
  tier: 'basic' | 'verified' | 'premium';
  createdAt: string;
  updatedAt: string;
}

export interface KYCDocument {
  type: 'id_front' | 'id_back' | 'selfie';
  file: File;
  url?: string;
}