import React, { useState, createContext } from 'react'
import useLocalStorage from '@hooks/useLocalStorage'

export const ReferenceContext = createContext({})

export default function ReferenceContextProvider(props) {
  const [owner, setOwner] = useLocalStorage('owner', '')
  const [languageId, setLanguageId] = useLocalStorage('languageId', '')
  const [showAccountSetup, setShowAccountSetup] = useLocalStorage(
    'showAccountSetup',
    true,
  )

  const [server, setServer] = useState('https://git.door43.org')
  const [branch, setBranch] = useState('master')
  const [currentLayout, setCurrentLayout] = useLocalStorage('resourceLayout', null)

  const value = {
    state: {
      showAccountSetup,
      languageId,
      server,
      branch,
      owner,
      currentLayout,
    },
    actions: {
      setShowAccountSetup,
      setLanguageId,
      setBranch,
      setServer,
      setOwner,
      setCurrentLayout,
    },
  }

  return (
    <ReferenceContext.Provider value={value}>
      {props.children}
    </ReferenceContext.Provider>
  )
}
