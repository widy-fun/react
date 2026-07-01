import type { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { darkTheme } from "@widy/sdk";

export const dark = createTheme(darkTheme as ThemeOptions);
