import React from 'react'
import styled from 'styled-components'

import useWallet from 'hooks/useWallet'
import useApproval from 'hooks/useApproval'

import { RoundedButton } from 'components/RoundedButton'
import { issue, redeem } from 'utils'
import {
  usdcTokenAddress,
  zrxTokenAddress,
  batTokenAddress,
  csTokenAddress,
  basicIssuanceAddress,
} from 'constants/ethContractAddresses'

const IssueRedeemButton: React.FC = () => {
  const { account, ethereum, onOpenWalletModal } = useWallet()
  const usdcApproval = useApproval(usdcTokenAddress, basicIssuanceAddress)
  const zrxApproval = useApproval(zrxTokenAddress, basicIssuanceAddress)
  const batApproval = useApproval(batTokenAddress, basicIssuanceAddress)
  const csApproval = useApproval(csTokenAddress, basicIssuanceAddress)

  const loginRequiredBeforeSubmit = !account

  const usdcApprovalRequired = !usdcApproval.isApproved
  const zrxApprovalRequired = !zrxApproval.isApproved
  const batApprovalRequired = !batApproval.isApproved
  const csApprovalRequired = !csApproval.isApproved

  let issueButtonText: string
  let issueButtonAction: (...args: any[]) => any
  if (loginRequiredBeforeSubmit) {
    issueButtonText = 'Issue'
    issueButtonAction = onOpenWalletModal
  } else if (usdcApprovalRequired) {
    issueButtonText = 'Approve USDC to Issue'
    issueButtonAction = usdcApproval.onApprove
  } else if (zrxApprovalRequired) {
    issueButtonText = 'Approve ZRX to Issue'
    issueButtonAction = zrxApproval.onApprove
  } else if (batApprovalRequired) {
    issueButtonText = 'Approve BAT to Issue'
    issueButtonAction = batApproval.onApprove
  } else {
    issueButtonText = 'Issue'
    issueButtonAction = () => issue(account, ethereum)
  }

  let redeemButtonText: string
  let redeemButtonAction: (...args: any[]) => any
  if (loginRequiredBeforeSubmit) {
    redeemButtonText = 'Redeem'
    redeemButtonAction = onOpenWalletModal
  } else if (csApprovalRequired) {
    redeemButtonText = 'Approve csDEFI to Redeem'
    redeemButtonAction = csApproval.onApprove
  } else {
    redeemButtonText = 'Redeem'
    redeemButtonAction = () => redeem(account, ethereum)
  }

  return (
    <StyledIssueRedeemContainer>
      <RoundedButton
        // isDisabled={!currencyQuantity || !tokenQuantity}
        // isPending={isFetchingOrderData}
        text={issueButtonText}
        onClick={issueButtonAction}
      />
      <StyledContainerSpacer />
      <RoundedButton
        // isDisabled={!currencyQuantity || !tokenQuantity}
        // isPending={isFetchingOrderData}
        text={redeemButtonText}
        onClick={redeemButtonAction}
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
