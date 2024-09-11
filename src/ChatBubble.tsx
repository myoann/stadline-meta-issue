import ReactMarkdown from "react-markdown";
import { Avatar } from "@mui/joy";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import { User } from "../types";

type ChatBubbleProps = {
  body: string;
  created_at: string;
  user: User;
  variant: "solid" | "outlined";
};

export default function ChatBubble({ body, variant, created_at, user }: ChatBubbleProps) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar size="sm" variant="solid" src={user.avatar_url} />
      <Box>
        <Stack direction="row" spacing={2} sx={{ mb: 0.25 }}>
          <Typography level="body-xs" fontWeight="bold">
            {user.login}
          </Typography>
          <Typography level="body-xs">{created_at}</Typography>
        </Stack>
        <Box>
          <Sheet
            color="primary"
            variant={variant}
            invertedColors={variant === "solid"}
            sx={{
              p: 1.25,
              borderRadius: "lg",
              borderTopLeftRadius: 0,
            }}
          >
            <ReactMarkdown
              components={{
                blockquote: ({ children }) => (
                  <Box
                    sx={{
                      borderLeft: "2px solid",
                      borderColor: "divider",
                      pl: 2,
                      py: 1,
                    }}
                  >
                    {children}
                  </Box>
                ),
                code({ className, children, ...props }) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                p: ({ children }) => <Typography component="div">{children}</Typography>,
                strong: ({ children }) => <Typography component="strong">{children}</Typography>,
                a: ({ children, href }) => (
                  <Typography component="a" href={href} style={{ color: "blue" }}>
                    {children}
                  </Typography>
                ),
              }}
            >
              {body}
            </ReactMarkdown>
          </Sheet>
        </Box>
      </Box>
    </Stack>
  );
}
