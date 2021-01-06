import React from 'react'
import styled from 'styled-components'

import { RoundedButton } from 'components/RoundedButton'

const IssueRedeemButton: React.FC = () => {
  return (
    <StyledIssueRedeemContainer>
      <RoundedButton
        // isDisabled={!currencyQuantity || !tokenQuantity}
        // isPending={isFetchingOrderData}
        text={'Issue'}
        // onClick={buttonAction}
      />
      <StyledContainerSpacer />
      <RoundedButton
        // isDisabled={!currencyQuantity || !tokenQuantity}
        // isPending={isFetchingOrderData}
        text={'Redeem'}
        // onClick={buttonAction}
      />
    </StyledIssueRedeemContainer>
  )
}

const StyledIssueRedeemContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const StyledContainerSpacer = styled.div`
  width: 10%;
  height: 100%;
`

export default IssueRedeemButton
