import { useEffect, useMemo, useState } from "react";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";

// TODO: Move the SVG to a specific folder
import loaderSVG from "./loader.svg";

import { Comment, Event, Issue, User } from "../types";

import useFetch from "./useFetch";

import MessagesPane from "./MessagesPane";
import Sidebar from "./Sidebar";

// NOTE FOR MYSELF
// I WORKED ON THIS PROJECT ON SEPTEMBER 11, 2024
// MOSTLY DURING THE MORNING AND NIGHT (AROUND 3 HOURS / BREAKS)

export default function App() {
  const [issueLink, setIssueLink] = useState("facebook/react/issues/7901");
  const [debouncedIssueLink, setDebouncedIssueLink] = useState(issueLink);

  useEffect(() => {
    // Debounce the issue link after 2 seconds
    const handlerTimeout = window.setTimeout(() => {
      setDebouncedIssueLink(issueLink);
    }, 2000);

    return () => {
      if (handlerTimeout !== null) clearTimeout(handlerTimeout);
    };
  }, [issueLink]);

  const onChangeIssueLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssueLink(e.target.value);
  };

  // Fetch the issue, and then fetch the comments and events related to the issue
  const issue = useFetch<Issue>({ url: `https://api.github.com/repos/${debouncedIssueLink}` });
  const comments = useFetch<Comment[]>({ url: issue.data?.comments_url }, { enabled: issue.isFetched });
  const events = useFetch<Event[]>({ url: issue.data?.events_url }, { enabled: issue.isFetched });

  // TODO: Use createContext to store the users
  const uniqueUsers = useMemo(() => {
    return comments.data?.reduce((acc: User[], comment) => {
      const user = acc.find((u) => u.login === comment.user.login);
      if (user) {
        user.messageCount += 1;
      } else {
        acc.push({ ...comment.user, messageCount: 1 });
      }
      return acc;
    }, []);
  }, [comments.data]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box component="aside" sx={{ width: 300 }}>
          <Sidebar issueLink={issueLink} onChangeIssueLink={onChangeIssueLink} users={uniqueUsers} />
        </Box>
        <Box component="main" sx={{ flex: 1 }}>
          {issue.isLoading || comments.isLoading || events.isLoading ? (
            // Display a beautiful loading spinner
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <img src={loaderSVG} alt="Loading..." />
            </Box>
          ) : (
            <MessagesPane issue={issue.data} comments={comments.data} events={events.data} />
          )}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
