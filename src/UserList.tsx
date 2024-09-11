import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon

import { User } from "../types";

type UserListProps = {
  onToggleUser: (login: string) => void;
  // onFilterUser: (login: string) => void;
  users?: User[];
};

export default function UserList({ users }: UserListProps) {
  const onFilterUser = (login: string) => {
    console.log("filtering user", login);
  };

  return (
    <Stack spacing={2}>
      {users?.map((user) => (
        <Box key={user.login} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography>
            {user.login} ({user.messageCount})
          </Typography>

          <Button
            onClick={() => onFilterUser(user.login)}
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <CloseIcon sx={{ color: "red" }} />
          </Button>
        </Box>
      ))}
    </Stack>
  );
}
