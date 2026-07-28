export interface TrialUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  tenantId: string | null;
  warehouseId: string | null;
  email: string;
  name: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  otpHash: string | null;
  otpExpiresAt: string | null;
  otpSentAt: string | null;
  otpVerifiedAt: string | null;
  otpAttemptCount: number;
  otpResendCount: number;
  status: string;
  trialUserId: string;
  trialUsername: string;
  trialStartsAt: string;
  trialEndsAt: string;
  credentialsSentAt: string | null;
  lastMailError: string | null;
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    tenantId: string | null;
    warehouseId: string | null;
    username: string;
    fullName: string;
    email: string;
    mobileNumber: string | null;
    employeeId: string | null;
    initials: string;
    roles: string[];
    warehouseCodes: string[];
    status: string;
    isLoggedIn: boolean;
    activeTasks: number;
    maxTasks: number;
    deactivatedAt: string | null;
    deactivatedBy: string | null;
    deactivationReason: string | null;
    isTrial: boolean;
    trialStartsAt: string;
    trialEndsAt: string;
    trialRequestId: string;
  };
}

export interface TrialUsersState {
  users: TrialUser[];
  loading: boolean;
  error: string | null;
}
