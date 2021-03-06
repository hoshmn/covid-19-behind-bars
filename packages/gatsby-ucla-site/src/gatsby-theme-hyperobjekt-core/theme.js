import { createMuiTheme } from "@material-ui/core"
import { deepmerge } from "@material-ui/utils"
import { fade as alpha, fade } from "@material-ui/core/styles"

/**
 * Base theme definitions
 */
const base = {
  palette: {
    primary: {
      main: "#414A3E",
    },
    secondary: {
      main: "#D7790F",
    },
    background: {
      default: "#F9FCF8",
      paper: "#fff",
      alt1: "#FEF3E7",
      alt2: "#F5F5ED",
    },
    text: {
      primary: "#283224",
      secondary: "#555526",
    },
    action: {
      hover: fade("#555526", 0.05),
      selected: fade("#555526", 0.1),
      active: fade("#555526", 0.2),
    },
  },
  spacing: (factor) => `${0.5 * factor}rem`,
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: "neue-haas-grotesk-display, sans-serif",
  },
  shadows: [
    "none",
    "0 3px 4px rgba(0,0,0,0.2)",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
  overrides: {
    MuiCssBaseline: {
      "@global": {
        code: {
          background: "#eee",
        },
      },
    },
    HypCodeBlock: {
      root: {
        fontFamily: ["Fira Mono", "monospace"].join(","),
        backgroundColor: "#021029!important",
      },
    },
  },
}

export const sansSerifyTypography = {
  fontFamily: "neue-haas-grotesk-display, sans-serif",
  textTransform: "none",
}

export const serifTypography = {
  fontFamily: "plantin, serif",
  textTransform: "none",
}
export const titleTypography = {
  fontFamily: `"Champion Middlewt A", "Champion Middlewt B", sans-serif`,
  fontStyle: "normal",
  fontWeight: 400,
  textTransform: "uppercase",
}
export const subtitleTypography = {
  fontFamily: `"Champion Bantamwt A", "Champion Bantamwt B", sans-serif`,
  fontStyle: "normal",
  fontWeight: 400,
  textTransform: "uppercase",
}

/**
 * A function that accepts site context (currently only `isDarkMode`)
 * and returns a theme object that is applied to the site.
 */
const CovidTheme = () => {
  // create a base theme to utilize theme values and functions
  const theme = createMuiTheme(base)

  const headingStyles = {
    ...serifTypography,
  }
  // build overrides
  const overrides = {
    overrides: {
      /** Site wide global style overrides */
      MuiCssBaseline: {
        "@global": {
          // remove overflow from html to prevent shift on menu open
          html: {
            overflowX: "visible",
            // boost the font size when there is enough horizontal / vertical space
            // this will resize all elements that use rem values or theme.spacing functions
            [`@media (min-width: ${theme.breakpoints.values["lg"]}px) and (min-height: 666px)`]: {
              fontSize: 20,
            },
          },
          a: {
            "&:not(.MuiLink-root):not(.MuiButtonBase-root)": {
              color: theme.palette.secondary.main,
              textDecoration: "none",
            },
            "&:not(.MuiLink-root):not(.MuiButtonBase-root):visited": {
              color: theme.palette.secondary.main,
            },
            "&:not(.MuiLink-root):not(.MuiButtonBase-root):hover": {
              textDecoration: "underline",
            },
          },
          // update padding and font on <code> elements
          code: {
            padding: `2px ${theme.spacing(1)}px`,
            borderRadius: theme.shape.borderRadius,
            fontFamily: ["Fira Mono", "monospace"].join(","),
          },
        },
      },
      /** Add margins to material UI typography */
      MuiTypography: {
        h1: headingStyles,
        h2: { ...headingStyles, fontSize: theme.typography.pxToRem(34) },
        h3: { ...headingStyles, fontSize: theme.typography.pxToRem(26) },
        h4: headingStyles,
        h5: headingStyles,
        h6: headingStyles,
        body1: {
          ...serifTypography,
          letterSpacing: `0.01em`,
        },
        body2: {
          ...sansSerifyTypography,
          color: theme.palette.text.secondary,
          letterSpacing: `0.01em`,
        },
      },
      MuiListItem: {
        root: {
          ...serifTypography,
          fontSize: theme.typography.pxToRem(14),
          [theme.breakpoints.up("lg")]: {
            fontSize: theme.typography.pxToRem(16),
          },
        },
      },
      MuiInputBase: {
        input: {
          padding: `10px 0 9px`,
          fontSize: theme.typography.pxToRem(14),
          letterSpacing: "0.03em",
          ...sansSerifyTypography,
        },
      },
      MuiButton: {
        root: {
          ...sansSerifyTypography,
          background: "transparent",
          border: "1px solid",
          borderColor: "#92926C",
          color: theme.palette.text.secondary,
          fontSize: theme.typography.pxToRem(15),
          letterSpacing: "0.03em",
          "&$text": {
            padding: theme.spacing(0.5, 3),
          },
        },
      },
      MuiButtonGroup: {
        root: {
          "& .active": {
            background: alpha("#A75E0C", 0.1),
            color: "#A75E0C",
            borderColor: "#A75E0C",
          },
          "& .active + .MuiButton-root": {
            borderLeftColor: "#A75E0C",
          },
          "& .active:hover": {
            background: alpha("#A75E0C", 0.25),
            borderColor: "#A75E0C",
          },
        },
      },
      MuiPopover: {
        paper: {
          boxShadow: `0 0 0 1px #DDDDCB`,
        },
      },
      MuiMenuItem: {
        root: {
          padding: theme.spacing(1, 2),
          borderBottom: `1px dotted #DDDDCB`,
        },
      },
      /** Page level overrides */
      HypPage: {
        root: {
          // full width content on state pages
          "&.page.page--states .content": {
            maxWidth: "none",
          },
        },
      },
      /** Header style overrides */
      HypHeader: {
        root: {
          boxShadow: "none",
          background: "#fff",
          borderBottom: `none`,
        },
        toolbar: {
          maxWidth: theme.breakpoints.values["md"],
          [theme.breakpoints.up("lg")]: {
            maxWidth: `calc(${
              theme.breakpoints.values["lg"]
            }px - ${theme.spacing(6)})`,
          },
        },
        shrunk: {
          // boxShadow: `inset 0 -1px 0 #DDDDCB`,
          // "& .header__branding": {
          //   opacity: 1,
          // },
        },
        title: {
          color: theme.palette.text.primary,
          marginTop: 0,
        },
        nav: {
          "& a": {
            color: theme.palette.text.primary,
          },
        },
        menuButton: {
          height: theme.spacing(6),
          color: theme.palette.text.primary,
          marginTop: "auto",
          marginBottom: "auto",
        },
      },
      HypBranding: {
        logo: {
          width: theme.typography.pxToRem(32),
          height: theme.typography.pxToRem(32),
        },
      },
      HypNavigation: {
        link: {
          ...sansSerifyTypography,
          fontSize: theme.typography.pxToRem(16),
        },
      },
      /** Content area style overrides */
      HypContent: {
        root: {
          maxWidth: "38.5rem",
          // override link colors in content
          "& .MuiLink-root.MuiTypography-root": {
            color: theme.palette.secondary.main,
          },
          // unset bottom padding
          "& > .block:last-child": {
            paddingBottom: undefined,
          },
        },
      },
      /** Code block style overrides */
      HypCodeBlock: {
        root: {
          borderRadius: 0,
          [theme.breakpoints.up(780)]: {
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
    /** Apply default props to components */
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        variant: "contained", // All buttons have "contained" appearance
      },
    },
  }
  // return the merged base theme with overrides
  return deepmerge(base, overrides)
}

export default CovidTheme
