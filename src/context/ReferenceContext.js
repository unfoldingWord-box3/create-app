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

  const [currentLayout, setCurrentLayout] = useLocalStorage('resourceLayout', null)

  const value = {
    state: {
      showAccountSetup,
      languageId,
      owner,
      currentLayout,
    },
    actions: {
      setShowAccountSetup,
      setLanguageId,
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
