import { useContext, useState } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ReferenceContext } from '@context/ReferenceContext'
import RepoHealthCheck from '@components/RepoHealthCheck'
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
    },
  } = useContext(ReferenceContext)


  const config = {
    server,
    branch,
    cache: { maxAge: 1 * 1 * 1 * 60 * 1000 },
  }

  return (
    <Container maxWidth="sm">

      <RepoHealthCheck title={res.scriptureResourceTypes["tn"]}  server={server} branch={branch} owner={owner} languageId={languageId} resourceId="tn" />
      <RepoHealthCheck title={res.scriptureResourceTypes["ta"]}  server={server} branch={branch} owner={owner} languageId={languageId} resourceId="ta" />
      <RepoHealthCheck title={res.scriptureResourceTypes["tw"]}  server={server} branch={branch} owner={owner} languageId={languageId} resourceId="tw" />
      <RepoHealthCheck title={res.scriptureResourceTypes["twl"]} server={server} branch={branch} owner={owner} languageId={languageId} resourceId="twl" />
      <RepoHealthCheck title={res.scriptureResourceTypes["tq"]}  server={server} branch={branch} owner={owner} languageId={languageId} resourceId="tq" />
      <RepoHealthCheck title={res.scriptureResourceTypes["sn"]}  server={server} branch={branch} owner={owner} languageId={languageId} resourceId="sn" />
      <RepoHealthCheck title={res.scriptureResourceTypes["sq"]}  server={server} branch={branch} owner={owner} languageId={languageId} resourceId="sq" />
      <RepoHealthCheck title={res.scriptureResourceTypes["glt"]} server={server} branch={branch} owner={owner} languageId={languageId} resourceId="glt" />
      <RepoHealthCheck title={res.scriptureResourceTypes["gst"]} server={server} branch={branch} owner={owner} languageId={languageId} resourceId="gst" />

    </Container>
  )
}

export default WorkspaceContainer

/*
      <RepoHealthCheck title={res.scriptureResourceTypes["tn"]}  owner={owner} languageId={languageId} resourceId="tn" />
      <RepoHealthCheck title={res.scriptureResourceTypes["ta"]}  owner={owner} languageId={languageId} resourceId="ta" />
      <RepoHealthCheck title={res.scriptureResourceTypes["tw"]}  owner={owner} languageId={languageId} resourceId="tw" />
      <RepoHealthCheck title={res.scriptureResourceTypes["twl"]} owner={owner} languageId={languageId} resourceId="twl" />
      <RepoHealthCheck title={res.scriptureResourceTypes["tq"]}  owner={owner} languageId={languageId} resourceId="tq" />
      <RepoHealthCheck title={res.scriptureResourceTypes["sn"]}  owner={owner} languageId={languageId} resourceId="sn" />
      <RepoHealthCheck title={res.scriptureResourceTypes["sq"]}  owner={owner} languageId={languageId} resourceId="sq" />
      <RepoHealthCheck title={res.scriptureResourceTypes["glt"]} owner={owner} languageId={languageId} resourceId="glt" />
      <RepoHealthCheck title={res.scriptureResourceTypes["gst"]} owner={owner} languageId={languageId} resourceId="gst" />


            {
        res.scriptureResourceTypeIds.map( (rid) => {
          <RepoHealthCheck 
            title={res.scriptureResourceTypes[{rid}]}
            owner={owner}
            languageId={languageId}
            resourceId={rid}
          />
        })
      }

*/