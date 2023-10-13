import React from 'react'
import SidePanel from './SidePanel'
import {createPortal} from 'react-dom'

export default function SidePanelContainer({ isPanelOpen }) {
    const portalRoot = document.getElementById('portal-root')


  return (
    isPanelOpen &&
    portalRoot &&
    createPortal(
        <SidePanel 
        isPanelOpen={isPanelOpen}/>,
        portalRoot
    )
  )
}
