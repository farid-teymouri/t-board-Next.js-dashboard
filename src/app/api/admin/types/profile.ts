export type AdminStatus = "online" | "offline";

export type AdminRole = "administrator" | "editor" | "viewer";

export type AdminProfile = {
  name: string;
  username: string;
  avatarSrc: string | null;
  status: AdminStatus;
  role: AdminRole;
};
