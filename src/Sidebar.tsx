import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";

import { User } from "../types";

import UserList from "./UserList";

type SidebarProps = {
  issueLink: string;
  onChangeIssueLink: (e: React.ChangeEvent<HTMLInputElement>) => void;
  users?: User[];
};

export default function Sidebar({ issueLink, onChangeIssueLink, users }: SidebarProps) {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: "sticky",
        transition: "transform 0.4s, width 0.4s",
        height: "100dvh",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Input value={issueLink} onChange={onChangeIssueLink} />

      <UserList users={users} onToggleUser={() => {}} />
    </Sheet>
  );
}
