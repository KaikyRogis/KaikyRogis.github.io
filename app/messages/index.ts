import { en } from "./en";
import { pt } from "./pt";

export const messages = { pt, en } as const;
export type MessageLocale = keyof typeof messages;

export function getMessages(locale: MessageLocale) {
  return messages[locale];
}
