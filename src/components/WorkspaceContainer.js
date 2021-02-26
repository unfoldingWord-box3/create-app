import { useContext, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import * as isEqual from 'deep-equal'
import { Workspace } from 'resource-workspace-rcl'
import { makeStyles } from '@material-ui/core/styles'
import { SelectionsContextProvider } from 'scripture-resources-rcl'
import {
  OT_ORIG_LANG,
  NT_ORIG_LANG,
  useScripture,
  ScriptureCard,
  TARGET_LITERAL,
  ORIGINAL_SOURCE,
  TARGET_SIMPLIFIED,
  NT_ORIG_LANG_BIBLE,
  OT_ORIG_LANG_BIBLE,
} from 'single-scripture-rcl'
import ResourceCard from '@components/ResourceCard'
import { getResourceBibles } from '@utils/resources'
import { ReferenceContext } from '@context/ReferenceContext'
import { NT_BOOKS } from '@common/BooksOfTheBible'
import useLocalStorage from '@hooks/useLocalStorage'
import { getLanguage } from '@common/languages'
import {
  Card,
  CardContent,
  useContent,
  useCardState,
} from 'translation-helps-rcl'
import RepoCard from '@components/RepoCard'
import * as res from '@common/resourceTypes.js'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: '0 1px !important',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  dragIndicator: {},
}))

function WorkspaceContainer() {
  const classes = useStyles()
  const {
    state: {
      owner,
      server,
      branch,
      languageId,
      currentLayout,
    },
    actions: {
      setCurrentLayout,
    },
  } = useContext(ReferenceContext)

  const layout = {
    widths: [
      [1, 1, 1],
      [2, 2],
      [2, 2],
    ],
    heights: [[5], [10, 10], [10, 10]],
  }

  if (currentLayout) {
    layout.absolute = currentLayout
  }

  const config = {
    server,
    branch,
    cache: { maxAge: 1 * 1 * 1 * 60 * 1000 },
  }

  const adminContext = 'Org='+owner+", LanguageId=" + languageId;
  console.log("res.scriptureResourceTypes:", res.scriptureResourceTypes)
  console.log("res.scriptureResourceTypeIds:", res.scriptureResourceTypeIds)
  res.scriptureResourceTypeIds.map( t => console.log("t,value", t, res.scriptureResourceTypes[t]))

  return (
    <Workspace
      rowHeight={25}
      layout={layout}
      classes={classes}
      gridMargin={[15, 15]}
      onLayoutChange={setCurrentLayout}
    >

      <Card
        title={'Bingo'}
      >
        <CardContent markdown={adminContext} >
          <Button>Click Me</Button>
        </CardContent>
      </Card>

      <RepoCard title={adminContext} />
      <RepoCard title={res.scriptureResourceTypes["glt"]} />
      {res.scriptureResourceTypeIds.map(key => <Typography>{key}</Typography> )}
    </Workspace>
  )
}

export default WorkspaceContainer

/*
      {
        res.scriptureResourceTypeIds.map(r => 
          <RepoCard title={res.scriptureResourceTypes["{r}"]} />
      )}                

      {
        res.scriptureResourceTypeIds.map(r => 
          <RepoCard title={'xx'} />
      )}                


*/