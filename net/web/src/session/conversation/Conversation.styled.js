import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const ConversationWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (prefers-color-scheme: light) {
    background-color: ${LightColors.threadBackground};
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${DarkColors.threadBackground};
  }

  .header {
    margin-left: 16px;
    margin-right: 16px;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    @media (prefers-color-scheme: light) {
      color: ${LightColors.text};
    }
    @media (prefers-color-scheme: dark) {
      color: ${DarkColors.text};
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      flex-grow: 1;
      padding-left: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      min-width: 0;

      .label {
        padding-left: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        min-width: 0;
      }

      .logo {
        flex-shrink: 0;
      }
    }

    .button {
      font-size: 18px;
      color: ${LightColors.grey};
      cursor: pointer;
      padding-right: 16px;
      padding-left: 16px;
    }
  }

  .thread {
    position: relative;
    flex-grow: 1;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;

    .empty {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20;
      color: ${LightColors.grey};
    }

    .loading {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
    }
  }

  .divider {
    padding-left: 16px;
    padding-right: 16px;
    
    .line {
      @media (prefers-color-scheme: light) {
        border-top: 1px solid ${LightColors.divider};
      }
      @media (prefers-color-scheme: dark) {
        border-top: 1px solid ${DarkColors.divider};
      }
    }

    .progress-idle {
      @media (prefers-color-scheme: light) {
        border-top: 1px solid ${LightColors.divider};
      }
      @media (prefers-color-scheme: dark) {
        border-top: 1px solid ${DarkColors.divider};
      }
      height: 1px;
    }

    .progress-active {
      border-top: 1px solid ${LightColors.primary};
      height: 1px;
    }

    .progress-error {
      border-top: 1px solid ${LightColors.alert};
      width: 100%;
      height: 1px;
      display: flex;
      justify-content: flex-end;
    }
  }

  .topic {
    flex-shrink: 0;
    position: relative;

    .upload-error {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 16px;
      cursor-pointer;
    }
  }
`

export const StatusError = styled.div`
  color: ${LightColors.error};
  font-size: 14px;
  padding-left: 8px;
  cursor: pointer;
`

