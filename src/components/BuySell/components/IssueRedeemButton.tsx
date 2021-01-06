import React from 'react'
import styled from 'styled-components'

import useWallet from 'hooks/useWallet'
import useApproval from 'hooks/useApproval'

import { RoundedButton } from 'components/RoundedButton'
import {
  usdcTokenAddress,
  zrxTokenAddress,
  batTokenAddress,
  csTokenAddress,
  basicIssuanceAddress,
} from 'constants/ethContractAddresses'

const IssueRedeemButton: React.FC = () => {
  const { account, onOpenWalletModal } = useWallet()
  const usdcApproval = useApproval(usdcTokenAddress, basicIssuanceAddress)
  const zrxApproval = useApproval(zrxTokenAddress, basicIssuanceAddress)
  const batApproval = useApproval(batTokenAddress, basicIssuanceAddress)

  const loginRequiredBeforeSubmit = !account

  const usdcApprovalRequired = !usdcApproval.isApproved
  const zrxApprovalRequired = !zrxApproval.isApproved
  const batApprovalRequired = !batApproval.isApproved

  let buttonText: string
  let buttonAction: (...args: any[]) => any
  if (loginRequiredBeforeSubmit) {
    buttonText = 'Issue'
    buttonAction = onOpenWalletModal
  } else if (usdcApprovalRequired) {
    buttonText = 'Approve USDC to Issue'
    buttonAction = usdcApproval.onApprove
  } else if (zrxApprovalRequired) {
    buttonText = 'Approve ZRX to Issue'
    buttonAction = zrxApproval.onApprove
  } else if (batApprovalRequired) {
    buttonText = 'Approve BAT to Issue'
    buttonAction = batApproval.onApprove
  } else {
    buttonText = 'Issue'
    buttonAction = () => console.log('Issuing token')
  }

  return (
    <StyledIssueRedeemContainer>
      <RoundedButton
        // isDisabled={!currencyQuantity || !tokenQuantity}
        // isPending={isFetchingOrderData}
        text={buttonText}
        onClick={buttonAction}
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
