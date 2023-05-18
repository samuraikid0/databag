import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const AddTopicWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .message {
    width: 100%;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 8px;
    padding-bottom: 8px;

    .control {
      @media (prefers-color-scheme: light) {
        color: ${LightColors.text};
        background-color: ${LightColors.inputBackground};
      }
      @media (prefers-color-scheme: dark) {
        color: ${DarkColors.text};
        background-color: ${DarkColors.inputBackground};
      }
      border-radius: 8px;
      flex-grow: 1;

      .ant-input {
        @media (prefers-color-scheme: light) {
          color: ${LightColors.text};
        }
        @media (prefers-color-scheme: dark) {
          color: ${DarkColors.text};
        }

        ::placeholder {
          @media (prefers-color-scheme: light) {
            color: ${LightColors.dimText};
          }
          @media (prefers-color-scheme: dark) {
            color: ${DarkColors.dimText};
          }
        }
      }
    }
  }

  .assets {
    margin-top: 8px;
    height: 128px;
    overflow: auto;
  }

  .buttons {
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 16px;
    width: 100%;
    display: flex;
    flex-direction: row; 
    align-items: center;
    
    .bar {
      border-left: 1px solid ${LightColors.encircle};
      height: 36px;
      padding-right 8px;
      margin-left: 8px;
    }

    .button {
      display: flex;
      flex-align: center;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      cursor: pointer;
      font-size: 18px;
      @media (prefers-color-scheme: light) {
        background-color: ${LightColors.formBackground};
        color: ${LightColors.text};
      }
      @media (prefers-color-scheme: dark) {
        background-color: ${DarkColors.formBackground};
        color: ${DarkColors.text};
      }
    }

    .space {
      margin-right: 8px;
    }

    .end {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
`
