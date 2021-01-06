import React from 'react'
import styled, { css } from 'styled-components'

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
  const [amount, setAmount] = React.useState<number>(0)

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
    issueButtonAction = () =>
      issue(amount, account, ethereum, basicIssuanceAddress, csTokenAddress)
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
    redeemButtonAction = () =>
      redeem(amount, account, ethereum, basicIssuanceAddress, csTokenAddress)
  }

  const onChangeAmount = (e: any) => {
    setAmount(e.target.value)
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

      <StyledContainerSpacer />

      <StyledCurrencyContainer>
        <StyledCurrencyLabelWrapper>
          <StyledCurrencyLabel>Amount</StyledCurrencyLabel>
        </StyledCurrencyLabelWrapper>

        <StyledCurrencySelectWrapper>
          <StyledInputField
            value={amount}
            onChange={onChangeAmount}
            type='number'
            min='0'
            step='0.01'
            placeholder='0'
          />
        </StyledCurrencySelectWrapper>
      </StyledCurrencyContainer>
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

interface StyledCurrencyContainerProps {
  isActive?: boolean
}

const StyledCurrencyContainer = styled.div<StyledCurrencyContainerProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;

  ${(props) =>
    props.isActive &&
    css`
      background-color: transparent;
      border: 1px solid ${props.theme.colors.transparentColors.grey};
    `}
`

const StyledCurrencyLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -5px;
`

const StyledCurrencyLabel = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`

const StyledCurrencySelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledInputField = styled.input`
  font-size: 20px;
  width: 70%;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  padding: 0px;
  border-radius: 4px;
  background: none;
  border: none;
  &:focus {
    outline: none;
  }
`

export default IssueRedeemButton
