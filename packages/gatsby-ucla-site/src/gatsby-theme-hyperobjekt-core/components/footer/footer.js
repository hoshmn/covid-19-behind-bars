import React from "react"
import { default as FooterNav } from "gatsby-theme-hyperobjekt-core/src/components/footer/footer-nav"
import { default as FooterSocial } from "gatsby-theme-hyperobjekt-core/src/components/footer/footer-social"
import { default as FooterCopyright } from "gatsby-theme-hyperobjekt-core/src/components/footer/footer-copyright"
import Subscribe from "../../../components/footer/subscribe"
import {
  Container,
  Grid,
  Link,
  Typography,
  withStyles,
} from "@material-ui/core"
import Stack from "../../../components/stack"
import { serifTypography } from "../../theme"

const styles = (theme) => ({
  root: {
    background: "#F5F5ED",
    padding: theme.spacing(8, 0, 3, 0),
  },
  copyright: {
    marginTop: theme.spacing(4),
    "& .MuiTypography-root": {
      ...serifTypography,
      fontSize: theme.typography.pxToRem(13),
      color: "#61664D",
      paddingRight: theme.spacing(1),
      borderRight: "1px solid",
      borderColor: theme.palette.divider,
    },
    "& .MuiTypography-root:last-child": {
      borderRight: "none",
    },
  },
  links: {
    flexDirection: "column",
  },
  listItem: {},
  link: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.5, 0),
  },
  social: {
    marginLeft: theme.spacing(-1.5),
  },
  socialLink: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(16),
  },
})

const Footer = ({ classes, className, ...props }) => {
  return (
    <footer id="footer" className={classes.root} {...props}>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item xs={12} md={9}>
            <Subscribe />
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterNav
              classes={{
                root: classes.links,
                listItem: classes.listItem,
                link: classes.link,
              }}
            />
            <FooterSocial
              classes={{ root: classes.social, link: classes.socialLink }}
            />
          </Grid>
        </Grid>

        <Stack className={classes.copyright} horizontal>
          <FooterCopyright />
          <Typography variant="body1">
            Site by{" "}
            <Link
              href="https://hyperobjekt.com"
              target="_blank"
              rel="noreferrer"
            >
              Hyperobjekt
            </Link>
          </Typography>
        </Stack>
      </Container>
    </footer>
  )
}

export default withStyles(styles, { name: "HypFooter" })(Footer)
