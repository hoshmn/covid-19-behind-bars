import React from "react"
import clsx from "clsx"
import { Link } from "gatsby-theme-material-ui"
import { List, ListItem } from "@material-ui/core"
import ResponsiveContainer from "../../../components/responsive-container"

const SubMenu = ({ links, className, classes, onSelect, ...props }) => {
  return (
    <div className={clsx("SubMenu-root", classes.root)}>
      <ResponsiveContainer
        className={clsx("SubMenu-container", classes.container)}
      >
        <List className={clsx("SubMenu-list", classes.list)} {...props}>
          {links.map((menuItem, index) => (
            <ListItem
              className={clsx("SubMenu-listItem", classes.listItem)}
              key={"link" + index}
            >
              <Link
                className={clsx("SubMenu-link", classes.link)}
                activeClassName="active"
                onClick={onSelect}
                to={menuItem.link}
              >
                {menuItem.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </ResponsiveContainer>
    </div>
  )
}

SubMenu.defaultProps = {
  classes: {},
  links: [],
  onSelect: () => {},
}

export default SubMenu
