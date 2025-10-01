'use client';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface CTAButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const CTAButton = ({ text, onClick, className }: CTAButtonProps) => {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="outlined"
        onClick={onClick}
        className={className}
        sx={{
          borderColor: "#4ade80",
          color: "#4ade80",
          "&:hover": {
            backgroundColor: "#4ade80",
            color: "#000",
            borderColor: "#4ade80",
          },
        }}
      >
        {text}
      </Button>
    </Stack>
  );
};

export default CTAButton;
