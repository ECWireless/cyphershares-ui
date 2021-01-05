import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Logo: React.FC = () => {
  return (
    <StyledLogo to='/'>
      <StyledEmoji
        src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/123.png'
        alt='Owl'
      />
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledEmoji = styled.img`
  height: 24px;
  text-align: center;
  min-width: 24px;
`

export default Logo
