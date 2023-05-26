import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const AccountWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (prefers-color-scheme: light) {
    background-color: ${LightColors.formFocus};
    color: ${LightColors.text};
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${DarkColors.formFocus};
    color: ${DarkColors.text};
  }

  .header {
    width: 100%;
    height: 48px;
    border-bottom: 1px solid ${LightColors.statsDivider};
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    padding: 16px;

    .label {
      flex-grow: 1;
      display: flex;
      justify-content: center;
    }

    .dismiss {
      font-size: 18px;
      @media (prefers-color-scheme: light) {
        color: ${LightColors.link};
      }
      @media (prefers-color-scheme: dark) {
        color: ${DarkColors.link};
      }
      cursor: pointer;
    }
  }

  .content {
    min-height: 0;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 32px;
    align-items: center;
    flex-grow: 1;

    .bottom {
      flex-grow: 1;
      display: flex;
      align-items: flex-end;
      padding-bottom: 16px;

      .link {
        @media (prefers-color-scheme: light) {
          color: ${LightColors.link};
        }
        @media (prefers-color-scheme: dark) {
          color: ${DarkColors.link};
        }
        padding-top: 16px;
        padding-bottom: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;    

        .label {
          padding-left: 8px;
        }
      }
    }
  }
    
`
