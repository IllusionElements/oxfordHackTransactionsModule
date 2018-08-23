/** @format */

import React, { SFC } from 'react'
import {
  withStyles,
  WithStyles,
  Drawer,
  AppBar,
  Toolbar,
  /* List, */ Typography /* Divider, */,
} from '@material-ui/core'
// import { mailFolderListItems, otherMailFolderListItems } from './tileData'
import { styles } from './theme'

interface HeaderProps {
  name: string
}

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode[] | React.ReactNode
}

const Header: SFC<HeaderProps> = ({ name }) => (
  <Toolbar>
    <Typography variant="title" color="inherit" noWrap>
      {name}
    </Typography>
  </Toolbar>
)

const Content: SFC<{ classes: any; children?: (props: any) => React.ReactNode }> = ({
  classes,
  children,
}) => (
  <main className={classes.content}>
    <div className={classes.toolbar} />
    {children}
  </main>
)

class ClippedDrawer extends React.PureComponent<Props, {}> {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Header name="Clipped" />
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          {/* <List>{mailFolderListItems}</List>
          <Divider />
        <List>{otherMailFolderListItems}</List> */}
        </Drawer>
        <Content classes={classes}>{this.props.children}</Content>
      </div>
    )
  }
}

export default withStyles(styles as any)((props: Props) => (
  <ClippedDrawer classes={props.classes}>
    {props.children}
  </ClippedDrawer>
))
