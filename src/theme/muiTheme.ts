import type { Theme, ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { darkTheme } from "@widy/sdk";

export type AppTheme = typeof darkTheme & Theme;

export const dark = createTheme(darkTheme as ThemeOptions);
