import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import { Comment, Event, Issue } from "../types";

import ChatBubble from "./ChatBubble";
import EventInfo from "./EventInfo";

/** Type guard to check if the item is an event */
const isEvent = (item: Comment | Event): item is Event => {
  return (item as Event).event !== undefined;
};

type MessagesPaneProps = {
  comments?: Comment[];
  events?: Event[];
  issue?: Issue;
};

export default function MessagesPane({ comments = [], events = [], issue }: MessagesPaneProps) {
  const combinedData = [...comments, ...events].sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));

  return (
    <Sheet
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      {issue && (
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.body",
          }}
          py={{ xs: 2, md: 2 }}
          px={{ xs: 1, md: 2 }}
        >
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
            endDecorator={
              <Chip
                variant="outlined"
                size="sm"
                color="neutral"
                sx={{
                  borderRadius: "sm",
                }}
              >
                #{issue.number}
              </Chip>
            }
          >
            {issue.title}
          </Typography>
          <Typography level="body-sm">{issue.user.login}</Typography>
        </Stack>
      )}

      {combinedData.length && (
        <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
          <ChatBubble variant="solid" {...issue!} />

          {combinedData.map((item) =>
            isEvent(item) ? (
              <EventInfo key={item.id} created_at={item.created_at} eventType={item.event} user={item.actor} />
            ) : (
              <ChatBubble
                key={item.id}
                variant={item.user.login === issue!.user.login ? "solid" : "outlined"}
                {...item}
              />
            ),
          )}
        </Stack>
      )}
    </Sheet>
  );
}
