import React from 'react'
import { Button } from '@mui/material'

interface SkipLinkProps {
  href?: string
  children?: React.ReactNode
}

const SkipLink: React.FC<SkipLinkProps> = ({ 
  href = '#main-content', 
  children = 'Skip to main content' 
}) => {
  return (
    <Button
      href={href}
      component="a"
      sx={{
        position: 'absolute',
        top: -40,
        left: 6,
        zIndex: 9999,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        padding: '8px 16px',
        textDecoration: 'none',
        borderRadius: 1,
        fontSize: '0.875rem',
        fontWeight: 600,
        transition: 'top 0.3s ease-in-out',
        '&:focus': {
          top: 6,
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'background.paper',
          outlineOffset: '2px',
        },
      }}
    >
      {children}
    </Button>
  )
}

export default SkipLink