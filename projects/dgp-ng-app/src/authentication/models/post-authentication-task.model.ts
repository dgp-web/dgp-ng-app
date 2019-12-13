export type PostAuthenticationTask<TUser> = (user: TUser) => Promise<void>;
