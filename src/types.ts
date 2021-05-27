interface NotificationsDef {
  id: string;
  show: boolean;
  details?: NotificationDef;
}

type level = "info" | "error";

export interface NotificationDef {
  message: string;
  description?: string;
  level: level;
}
