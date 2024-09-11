import { EventTypeEnum, User } from "../types";

type ChatBubbleProps = {
  created_at: string;
  eventType: EventTypeEnum;
  user: User;
};

export default function EventInfo({ created_at, eventType, user }: ChatBubbleProps) {
  if (![EventTypeEnum.closed, EventTypeEnum.labeled].includes(eventType)) {
    return null;
  }

  return (
    <h1>
      {user.login} did {eventType} at {created_at}
    </h1>
  );
}
