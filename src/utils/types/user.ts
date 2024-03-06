export interface UserInformation {
  isLinkAccount: boolean;
  linkAccountParameters: string;
  user: User;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  store: UserStore[];
}

export interface UserStore {
  storeName: string;
  storeId: string;
  marketplaceName: string;
}
