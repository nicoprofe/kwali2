import React, { useState } from 'react'

export default function useTooltip() {
    const [ isTooltipVisible, setIsTooltipVisible] = useState(false)

    const showTooltip = () => setIsTooltipVisible(true)
    const hideTooltip = () => setIsTooltipVisible(false)

  return { isTooltipVisible, showTooltip, hideTooltip }
}
