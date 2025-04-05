import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const TextSendingPlaceholder: React.FC = () => {
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        textAlign="center"
        p={2}
      >
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Sending your message...
        </Typography>
      </Box>
    </div>
  );
};

export default TextSendingPlaceholder;
