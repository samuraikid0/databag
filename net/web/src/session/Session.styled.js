import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const RingingWrapper = styled.div`
  .ringing-list {
    padding: 4px;
    display: flex;
    flex-direction: column;
    background-color: ${LightColors.darkBackground};

    .ringing-entry {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 8px;

      .ringing-accept {
        color: ${LightColors.primary};
        font-size: 18;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${LightColors.white};
        border-radius: 16px;
        margin: 8px;
        cursor: pointer;
      }

      .ringing-ignore {
        color: ${LightColors.grey};
        font-size: 18;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${LightColors.white};
        border-radius: 16px;
        margin: 8px;
        cursor: pointer;
      }
    
      .ringing-decline {
        color: ${LightColors.alert};
        font-size: 18;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${LightColors.white};
        border-radius: 16px;
        margin: 8px;
        transform: rotate(224deg);
        cursor: pointer;
      }

      .ringing-name {
        font-size: 16px;
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        justify-content: center;
        color: ${LightColors.white};
      }
    }
  }
}
`;

export const CallingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover .calling-hovered {
    display: flex;
  }
  
  .calling-local {
    width: 33%;
    bottom: 16px;
    left: 16px;
    position: absolute;
  }

  .calling-logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 256px;
    height: 256px;
    background-color: yellow;
  }

  .calling-end {
    position: absolute;
    bottom: 16px;
    color: ${LightColors.white};
    font-size: 24px;
    background-color: ${LightColors.alert};
    display: none;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 20px;
    cursor: pointer;
    transform: rotate(135deg);
  }

  .calling-options {
    display: none;
    position: absolute;
    top: 16px;
    flex-direction: row;
  }

  .calling-option {
    color: ${LightColors.white};
    font-size: 24px;
    background-color: ${LightColors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 8px;
    margin-right: 8px;
  }
`;


export const SessionWrapper = styled.div`
  height: 100%;
  width: 100%;

  .reframe {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .darken {
    background-color: 'black';
    opacity: 0.4;
  }

  .spinner {
    position: absolute;
    width: 100%;
    height: calc(100% - 48px);
    z-index: 2;
    margin-top: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.1);
    widtH: 100%;
  }

  .desktop-layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

    .left {
      min-width: 256px;
      max-width: 384px;
      width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      min-height: 0;

      .bottom {
        height: calc(100% - 48px);
      }
    }
    .center {
      flex-grow: 1;
      position: relative;

      @media (prefers-color-scheme: light) {
        background-color: ${LightColors.background};
      }
      @media (prefers-color-scheme: dark) {
        background-color: ${DarkColors.background};
      }
    }
    .right {
      min-width: 256px;
      max-width: 384px;
      width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;

      @media (prefers-color-scheme: light) {
        background-color: ${LightColors.background};
      }
      @media (prefers-color-scheme: dark) {
        background-color: ${DarkColors.background};
      }
    }
  }

  .tablet-layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

    .left {
      min-width: 256px;
      max-width: 384px;
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      min-height: 0;

      .bottom {
        height: calc(100% - 48px);
      }
    }
    .right {
      flex-grow: 1;
      position: relative;

      @media (prefers-color-scheme: light) {
        background-color: ${LightColors.background};
      }
      @media (prefers-color-scheme: dark) {
        background-color: ${DarkColors.background};
      }

      .drawer {
        padding: 0px;
      }
    }
  }

  .mobile-layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
      flex-grow: 1;
      position: relative;
    }
    .bottom {
      height: 48px;
      position: relative;
      box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.3);
    }
  }
`;
