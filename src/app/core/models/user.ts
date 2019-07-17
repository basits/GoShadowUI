
export class User  {

    userId: number;
    id: string;
    firstName: string;
    lastName: string;
    password: any;
    confirmPassword: any
    email: string;
    encryptedPassword: string;
    organizationName: string;
    fullName: string;
    country: string;
    countryId: number;
    token: string;
    expiry: number;
    profilePic: any;
    accountVerified: boolean;
    lastLogin: string;
    stateName: string;
    unsuccessfulAttempts: string;
    isActive: boolean;
    isBlocked: boolean;
    isLoggedIn: boolean;
}