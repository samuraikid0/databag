import styled from 'styled-components';
import { DarkColors, LightColors } from 'constants/Colors';

export const CardItemWrapper = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  @media (prefers-color-scheme: light) {
    border-bottom: 1px solid ${LightColors.itemDivider};
    color: ${LightColors.text};
  }
  @media (prefers-color-scheme: dark) {
    border-bottom: 1px solid ${DarkColors.itemDivider};
    color: ${DarkColors.text};
  }

  &:hover {
    @media (prefers-color-scheme: light) {
      background-color: ${LightColors.formHover};
      cursor: pointer;
    }
    @media (prefers-color-scheme: dark) {
      background-color: ${DarkColors.formHover};
      cursor: pointer;
    }
  }

  .details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    justify-content: center;
    min-width: 0;

    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 15px;
    }

    .handle {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
    }
  }

  .markup {
    position: absolute;
    right: 0;
    margin-right: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }
`;

export const StatusError = styled.div`
  color: ${LightColors.error};
  font-size: 14px;
  padding-right: 12px;
`

export const ComOptions = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  @media (prefers-color-scheme: light) {
    color: ${LightColors.link};
  }
  @media (prefers-color-scheme: dark) {
    color: ${DarkColors.link};
  }

  .option {
    padding-right: 12px;
    cursor: pointer;
  }
`

export const StatusConnected = styled.div`
  background-color: ${LightColors.connected};
  border-radius: 8px;
  width: 8px;
  height: 8px;
`;

export const StatusConnecting = styled.div`
  background-color: ${LightColors.connecting};
  border-radius: 8px;
  width: 8px;
  height: 8px;
`;

export const StatusRequested = styled.div`
  background-color: ${LightColors.requested};
  border-radius: 8px;
  width: 8px;
  height: 8px;
`;

export const StatusPending = styled.div`
  background-color: ${LightColors.pending};
  border-radius: 8px;
  width: 8px;
  height: 8px;
`;

export const StatusConfirmed = styled.div`
  background-color: ${LightColors.confirmed};
  border-radius: 8px;
  width: 8px;
  height: 8px;
`;


