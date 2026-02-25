import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Container,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
  children: React.ReactNode;
  mode: "light" | "dark";
  toggleMode: () => void;
};

export default function AppLayout({ children }: Props) {
  return (
    <Box>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backdropFilter: "blur(8px)",
          backgroundColor: "background.paper",
        }}
      >
        <Toolbar>
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
            ElderVoice Guardian
          </Typography>

          <IconButton>
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton>
            <FavoriteIcon color="error" />
          </IconButton>

          <Avatar sx={{ ml: 2 }}>S</Avatar>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
}