import styled from 'styled-components';
import { DarkColors, LightColors } from 'constants/Colors';

export const ContactWrapper = styled.div`
  height: 100%;
  width: 100%;

  .thread {
    @media (prefers-color-scheme: light) {
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: ${LightColors.threadBackground};
      color: ${LightColors.text};
    }
    @media (prefers-color-scheme: dark) {
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: ${DarkColors.threadBackground};
      color: ${DarkColors.text};
    }
  }

  .column {
    @media (prefers-color-scheme: light) {
      display: flex;
      flex-direction: column;
      background-color: ${LightColors.formBackground};
      olor: ${LightColors.text};
    }
    @media (prefers-color-scheme: dark) {
      display: flex;
      flex-direction: column;
      background-color: ${DarkColors.formBackground};
      color: ${DarkColors.text};
    }
  }

  .header {
    margin-left: 16px;
    margin-right: 16px;
    height: 48px;
    border-bottom: 1px solid ${LightColors.profileDivider};
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;

    .handle {
      font-size: 20px;
      font-weight: bold;
      flex-grow: 1;
      padding-left: 16px;
    }

    .close {
      font-size: 18px;
      cursor: pointer;
      padding-right: 16px;
    }
  }

  .midContent {
    min-height: 0;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 32px;
  }

  .rightContent {
    min-height: 0;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo {
    position: relative;
    width: 20vw;
    margin-right: 32px;
    margin-left: 32px;
  }

  .details {
    display: flex;
    flex-direction: column;

    .notset {
      font-style: italic;
      color: ${LightColors.grey};
    }

    .name {
      display: flex;
      flex-direction: row;
      align-items: center;
 
      .data {
        padding-right: 8px;
        font-size: 24px;
        font-weight: bold;
      }
    }

    .location {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 8px;
  
      .data {
        padding-left: 8px;
      }
    }

    .description {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 8px;

      .data {
        padding-left: 8px;
      }
    }
  }

  .view {
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      display: flex;
      width: 100%;
      flex-direction: row;
      font-size: 18px;
      padding-top: 8px;
      padding-bottom: 32px;

      .handle {
        flex-grow: 1;
        font-weight: bold;
        display: flex;
        justify-content: center;
      }

      .close {
        color: ${LightColors.primary};
        cursor: pointer;
        width: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .controls {
    padding-top: 16px;
    padding-bottom: 16px;

    .button {
      width: 192px;
      padding-top: 2px;
      padding-bottom: 2px;
      margin-top: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      color: ${LightColors.white};
      background-color: ${LightColors.primary};
    }

    .label {
      flex-grow: 1;
      display: flex;
      justify-content: center;
    }

    .idle {
      cursor: pointer;
      opactiy: 0;
    }

    .busy {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .footer {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 16px;
    color: ${LightColors.grey};
  }
`

