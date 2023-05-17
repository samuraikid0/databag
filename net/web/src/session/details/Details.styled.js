import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const DetailsWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (prefers-color-scheme: light) {
    background-color: ${LightColors.formBackground};
    color: ${LightColors.text};
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${DarkColors.formBackground};
    color: ${DarkColors.text};
  }

  .header {
    width: 100%;
    height: 48px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    padding: 16px;
    @media (prefers-color-scheme: light) {
      border-bottom: 1px solid ${LightColors.divider};
    }
    @media (prefers-color-scheme: dark) {
      border-bottom: 1px solid ${DarkColors.divider};
    }

    .label {
      flex-grow: 1;
      display: flex;
      justify-content: center;
    }

    .dismiss {
      font-size: 18px;
      cursor: pointer;
      @media (prefers-color-scheme: light) {
        color: ${LightColors.text};
      }
      @media (prefers-color-scheme: dark) {
        color: ${DarkColors.text};
      }
    }
  }

  .content {
    min-height: 0;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding-top: 32px;
    align-items: center;
    flex-grow: 1;
    position: relative;
    min-height: 0;

    .label {
      padding-top: 16px;
      width: 100%;
      padding-left: 16px;
      @media (prefers-color-scheme: light) {
        border-bottom: 1px solid ${LightColors.divider};
      }
      @media (prefers-color-scheme: dark) {
        border-bottom: 1px solid ${DarkColors.divider};
      }
    }

    .members {
      width: 100%;
      padding-top: 4px;
    }

    .button {
      width: 144px;
      padding: 4px;
      border-radius: 4px;
      color: ${LightColors.white};
      background-color: ${LightColors.primary};
      cursor: pointer;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .description {
      display: flex;
      flex-direction: row;
      margin-bottom: 32px;
      width: 100%;

      .logo {
        height: fit-content;
        flex-shrink: 0;
        width: 40%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }

      .stats {
        display: flex;
        flex-direction: column;
        padding-left: 16px;

        .edit {
          cursor: pointer;
        }

        .subject {
          font-size: 18px;
          font-weight: bold;
          padding-right: 8px;
        }

        .host {
          font-size: 16px;
        }

        .created {
          font-size: 14px;
        }
    }
  }
`

export const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
