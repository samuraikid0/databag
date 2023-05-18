import styled from 'styled-components';
import { LightColors, DarkColors } from 'constants/Colors';

export const TopicItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (prefers-color-scheme: light) {
    color: ${LightColors.text};
  }
  @media (prefers-color-scheme: dark) {
    color: ${DarkColors.text};
  }

  .topic-header {
    display: flex;
    flex-direction: row;
    margin-left: 16px;
    padding-left: 16px;
    margin-right: 16px;
    padding-top: 8px;
    @media (prefers-color-scheme: light) {
      border-top: 1px solid ${LightColors.itemDivider};
    }
    @media (prefers-color-scheme: dark) {
      border-top: 1px solid ${DarkColors.itemDivider};
    }

    &:hover .topic-options {
      visibility: visible;
    }

    .topic-options {
      visibility: hidden;
      padding-left: 16px;
      position: relative;
      top: -4px;

      .buttons {
        display: flex;
        flex-direction: row;
        border-radius: 4px;
        background-color: #eeeeee;
        margin-top: 2px;

        .button {
          font-size: 14px;
          margin-left: 8px;
          margin-right: 8px;
          cursor: pointer;
        }

        .remove {
          color: ${LightColors.warn};
        }

        .edit {
          color: ${LightColors.primary};
        }
      }
    }

    .avatar {
      height: 32px;
      width: 32px;
    }

    .info {
      display: flex;
      flex-direction: row;
      line-height: 1;
      padding-left: 8px;

      .comments {
        padding-left: 8px;
        cursor: pointer;
        color: #888888;
      }

      .set {
        font-weight: bold;
        color: #444444;
        padding-right: 8px;
        @media (prefers-color-scheme: light) {
          color: ${LightColors.text};
        }
        @media (prefers-color-scheme: dark) {
          color: ${DarkColors.text};
        }
      }
      .unset {
        font-weight: bold;
        font-style: italic;
        padding-right: 8px;
        @media (prefers-color-scheme: light) {
          color: ${LightColors.dimText};
        }
        @media (prefers-color-scheme: dark) {
          color: ${DarkColors.dimText};
        }
      }
      .unknown {
        font-style: italic;
        color: #aaaaaa;
        padding-right: 8px;
        @media (prefers-color-scheme: light) {
          color: ${LightColors.dimText};
        }
        @media (prefers-color-scheme: dark) {
          color: ${DarkColors.dimText};
        }
      }
    }
  }

  .sealed-message {
    font-style: italic;
    padding-left: 72px;
    @media (prefers-color-scheme: light) {
      color: ${LightColors.dimText};
    }
    @media (prefers-color-scheme: dark) {
      color: ${DarkColors.dimText};
    }
  }

  .asset-placeholder {
    width: 128px;
    height: 128px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eeeeee;
    margin-left: 72px;
    @media (prefers-color-scheme: light) {
      color: ${LightColors.dimText};
    }
    @media (prefers-color-scheme: dark) {
      color: ${DarkColors.dimText};
    }
  }

  .topic-assets {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .skeleton {
    height: 128px;
    margin-left: 72px;
    margin-right: 32px;
  }

  .message {
    padding-right: 16px;
    padding-left: 72px;
    white-space: pre-line;
    min-height: 4px;
  }

  .editing {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 1px solid #aaaaaa;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 16px;
    margin-left: 72px;

    .controls {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding-bottom: 8px;
      padding-right: 8px;
    }
  }
`;


