export type NotificationTime = {
  value: number;
  unit: "now" | "seconds" | "minute" | "minutes" | "hour" | "hours";
};

export type BaseNotification = {
  id: number;
  username: string;
  types: NotificationType[];
  createdAt: NotificationTime;
};

export type NewUserNotification = BaseNotification & {
  type: "new-user";
};

export type SharedPostNotification = BaseNotification & {
  type: "shared-post";
  social: string;
};

export type ServerEventType = "high-cpu" | "high-memory" | "down" | "backup";

export type ServerEventNotification = BaseNotification & {
  type: "server-event";
  event: ServerEventType;
  cpuUsage?: number;
};

export type Notification =
  | NewUserNotification
  | SharedPostNotification
  | ServerEventNotification;

export type NotificationType =
  | "new"
  | "unread"
  | "pending"
  | "financial"
  | "warning"
  | "forum"
  | "media"
  | "server"
  | "share";

export type AdminNotificationsResponse = Notification[];
