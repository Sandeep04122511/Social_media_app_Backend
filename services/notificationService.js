import Notification from "../models/Notification.js";
import { getIO } from "./socketService.js";
import { EVENTS } from "../utils/constats.js";

export const createNotification = async ({ user, type, from, refId, meta }) => {
  const notif = await Notification.create({ user, type, from, refId, meta });
  // emit to receiver room
  const io = getIO();
  if (io) io.to(String(user)).emit(EVENTS.NEW_NOTIFICATION, notif);
  return notif;
};

export const markAllRead = (userId) => Notification.updateMany({ user: userId, read: false }, { read: true });
