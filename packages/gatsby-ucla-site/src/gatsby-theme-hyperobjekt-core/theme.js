import { createMuiTheme } from "@material-ui/core"
import { deepmerge } from "@material-ui/utils"

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
  typography: {
    fontFamily: ["sans-serif"].join(","),
  },
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

/**
 * A function that accepts site context (currently only `isDarkMode`)
 * and returns a theme object that is applied to the site.
 */
const CovidTheme = () => {
  // create a base theme to utilize theme values and functions
  const theme = createMuiTheme(base)

  const headingStyles = {
    fontFamily: ["Tinos", "serif"].join(","),
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
      /** Header style overrides */
      HypHeader: {
        root: {
          boxShadow: "none",
          background: "#fff",
          borderBottom: `1px solid ${theme.palette.divider}`,
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
