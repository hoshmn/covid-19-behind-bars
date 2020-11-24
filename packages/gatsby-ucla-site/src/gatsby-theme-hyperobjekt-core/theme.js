import { createMuiTheme } from "@material-ui/core"
import { deepmerge } from "@material-ui/utils"
import { fade as alpha } from "@material-ui/core/styles"

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
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: "neue-haas-grotesk-display, sans-serif",
  },
  shadows: ["none", "0 3px 4px rgba(0,0,0,0.2)", "none", "none"],
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

export const serifTypography = {
  fontFamily: "plantin, sans-serif",
  textTransform: "none",
}
export const titleTypography = {
  fontFamily: `"Champion Heavywt A", "Champion Heavywt B"`,
  fontStyle: "normal",
  fontWeight: 400,
  textTransform: "uppercase",
}
export const subtitleTypography = {
  fontFamily: `"Champion Featherwt A", "Champion Featherwt B"`,
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
    marginTop: "1em",
  }
  // build overrides
  const overrides = {
    overrides: {
      /** Site wide global style overrides */
      MuiCssBaseline: {
        "@global": {
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
        h2: headingStyles,
        h3: headingStyles,
        h4: headingStyles,
        h5: headingStyles,
        h6: headingStyles,
      },
      MuiButton: {
        root: {
          ...serifTypography,
          background: "transparent",
          border: "1px solid",
          borderColor: "#92926C",
          color: "#555526",
          letterSpacing: "0.03em",
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
      /** Header style overrides */
      HypHeader: {
        root: {
          boxShadow: "none",
          background: "#fff",
          borderBottom: `none`,
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
      HypNavigation: {
        link: {
          fontFamily: "plantin, sans-serif",
          fontSize: theme.typography.pxToRem(13),
        },
      },
      /** Content area style overrides */
      HypContent: {
        root: {
          // override link colors in content
          "& .MuiLink-root.MuiTypography-root": {
            color: theme.palette.secondary.main,
          },
        },
      },
      /** Default hero style overrides */
      HypHero: {
        root: {
          background: "#F5F5ED",
          boxShadow: "none",
          color: theme.palette.text.primary,
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
      /** Slide open side panel overrides */
      HypDrawer: {
        root: {},
        content: {},
        close: {},
      },
      HypFooterNav: {
        list: {
          display: "flex",
          flexDirection: "row",
          "& li:last-child": {
            paddingBottom: theme.spacing(0.5),
          },
        },
      },
      /** Footer style overrides */
      HypFooter: {
        root: {},
        wrapper: {},
        copyright: {
          position: "static!important",
        },
        links: {},
        listItem: {},
        link: {},
        social: {},
        socialLink: {},
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
