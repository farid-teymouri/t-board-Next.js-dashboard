export type UserStatus = "online" | "offline";

export type UserRole = "administrator" | "editor" | "viewer";

export type UserProfile = {
  name: string;
  username: string;
  email: string;
  avatarSrc: string | null;
  status: UserStatus;
  role: UserRole;
};
