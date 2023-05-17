import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const WelcomeWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #555555;

  .video {
    width: 640px;
    height: 480px;
    background-color: yellow;
  }

  .title {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 16px;
    @media (prefers-color-scheme: light) {
      color: ${LightColors.backgroundText};
    }
    @media (prefers-color-scheme: dark) {
      color: ${DarkColors.backgroundText};
    }

    .header {
      font-weight: bold;
      font-size: 20px;
    }
  }

  .session {
    width: 100%;
    object-fit: contain;
    display: flex;
    align-items: center;
    min-height: 0;
    opacity: 0.3;
    @media (prefers-color-scheme: light) {
      display: block;
    }
    @media (prefers-color-scheme: dark) {
      display: none;
    }
  }

  .darken {
    width: 100%;
    object-fit: contain;
    display: flex;
    align-items: center;
    min-height: 0;
    opacity: 0.3;
    @media (prefers-color-scheme: light) {
      display: none;
    }
    @media (prefers-color-scheme: dark) {
      display: block;
    }
  }

  .message {
    width: 100%;
    display: flex;
    flex-row: column;
    align-items: center;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 16px;
    @media (prefers-color-scheme: light) {
      color: ${LightColors.backgroundText};
    }
    @media (prefers-color-scheme: dark) {
      color: ${DarkColors.backgroundText};
    }'
  }
`

