import styled from 'styled-components';
import { DarkColors, LightColors } from 'constants/Colors';

export const AccountAccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;

  .switch {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 8px;

    .switchEnabled {
      color: ${LightColors.primary};
      cursor: pointer;
    }

    .switchDisabled {
      color: ${LightColors.grey};
    }

    .switchLabel {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  .link {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;

    @media (prefers-color-scheme: light) {
      color: ${LightColors.link};
    }
    @media (prefers-color-scheme: dark) {
      color: ${DarkColors.link};
    }
  
    .label {
      padding-left: 8px;
    }
  }
`;

export const SealModal = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;

  .switch {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 8px;
    align-items: center;
    justify-content: center;

    .switchLabel {
      color: ${LightColors.text};
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  .sealPassword {
    padding-top: 4px;
    padding-bottom: 4px;
    position: relative;

    .editPassword {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
`

export const EditFooter = styled.div`
  width: 100%;
  display: flex;

  .select {
    display: flex;
    flex-grow: 1;
  }
`

