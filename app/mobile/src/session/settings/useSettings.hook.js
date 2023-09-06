import { useState, useEffect, useRef, useContext } from 'react';
import { Alert } from 'react-native';
import { getLanguageStrings } from 'constants/Strings';
import { ProfileContext } from 'context/ProfileContext';
import { AccountContext } from 'context/AccountContext';
import { CardContext } from 'context/CardContext';
import { ChannelContext } from 'context/ChannelContext';
import { AppContext } from 'context/AppContext';
import { generateSeal, updateSeal, unlockSeal } from 'context/sealUtil';
import { DisplayContext } from 'context/DisplayContext';
import { getChannelSubjectLogo } from 'context/channelUtil';

export function useSettings() {

  const profile = useContext(ProfileContext);
  const account = useContext(AccountContext);
  const app = useContext(AppContext);
  const card = useContext(CardContext);
  const channel = useContext(ChannelContext);
  const display = useContext(DisplayContext);

  const debounce = useRef(null);
  const checking = useRef(null);
  const channels = useRef([]);
  const cardChannels = useRef([]);

  const [state, setState] = useState({
    strings: getLanguageStrings(),
    timeFull: false,
    monthLast: false,
    pushEnabled: null,

    login: false,
    username: null,
    validated: false,
    available: true,
    password: null,
    confirm: null,
    delete: null,
    
    editSeal: false,
    sealEnabled: false,
    sealUnlocked: false,
    sealPassword: null,
    sealConfirm: null,
    sealDelete: null,
    hideConfirm: true,
    hidePassword: true,
    sealRemove: false,
    sealUpdate: false,

    blockedContacts: false,
    blockedTopics: false,
    blockedMessages: false,

    contacts: [],
    topics: [],
    messages: [],
  });

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }));
  }

  useEffect(() => {
    const { timeFull, monthLast } = profile.state;
    const handle = profile.state.identity.handle;
    updateState({ timeFull, monthLast, handle });
  }, [profile.state]);

  useEffect(() => {
    const { seal, sealable, pushEnabled } = account.state.status;
    const sealKey = account.state.sealKey;
    const sealEnabled = seal?.publicKey != null;
    const sealUnlocked = seal?.publicKey === sealKey?.public && sealKey?.private && sealKey?.public;
    updateState({ sealable, seal, sealKey, sealEnabled, sealUnlocked, pushEnabled });
  }, [account.state]);

  const setCardItem = (item) => {
    const { profile, cardId } = item?.card || {};
    return {
      cardId: cardId,
      name: profile?.name,
      handle: `${profile?.handle} / ${profile?.node}`,
      logo: profile?.imageSet ? card.actions.getCardImageUrl(cardId) : 'avatar',
    }
  };

  const setChannelItem = (item) => {
    const profileGuid = profile.state?.identity?.guid;
    const { logo, subject } = getChannelSubjectLogo(null, profileGuid, item, card.state.cards, card.actions.getCardImageUrl);
    return {
      cardId: null,
      channelId: item.channelId,
      created: item.detail.created,
      logo: logo,
      subject: subject,
    }
  };

  useEffect(() => {
    const contacts = Array.from(card.state.cards.values());
    const filtered = contacts.filter(contact => contact.card.blocked);
    const sorted = filtered.map(setCardItem).sort((a, b) => {
      if (a.name === b.name) {
        return 0;
      }
      if (!a.name || (a.name < b.name)) {
        return -1;
      }
      return 1;
    });
    updateState({ contacts: sorted });

    contacts.current = [];
    contacts.forEach(contact => {
      const filtered = Array.from(contact.channels.values()).filter(topic => topic.blocked);
      const mapped = filtered.map(setChannelItem).map(item => ({ ...item, cardId: contact.card.cardId }));
      cardChannels.current = cardChannels.current.concat(mapped);
    });
    const merged = cardChannels.current.concat(channels.current);
    const sortedMerge = merged.sort((a, b) => {
      if (a.created === b.created) {
        return 0;
      }
      if (a.created < b.created) {
        return -1;
      }
      return 1;
    });
    updateState({ topics: sortedMerge });
  }, [card.state]);

  useEffect(() => {
    const filtered = Array.from(channel.state.channels.values()).filter(topic => topic.blocked);
    channels.current = filtered.map(setChannelItem);
    const merged = cardChannels.current.concat(channels.current);
    const sortedMerge = merged.sort((a, b) => {
      if (a.created === b.created) {
        return 0;
      }
      if (a.created < b.created) {
        return -1;
      }
      return 1;
    });
    updateState({ topics: sortedMerge });
  }, [channel.state]);

  const unlockKey = async () => {
    const sealKey = unlockSeal(state.seal, state.sealPassword);
    await account.actions.unlockAccountSeal(sealKey);
  };

  const disableKey = async () => {
    await account.actions.unlockAccountSeal({});
  }

  const updateKey = async () => {
    const updated = updateSeal(state.seal, state.sealKey, state.sealPassword);
    await account.actions.setAccountSeal(updated.seal, updated.sealKey);
  }

  const generateKey = async () => {
    const created = await generateSeal(state.sealPassword);
    await account.actions.setAccountSeal(created.seal, created.sealKey);
  }

  const removeKey = async () => {
    await account.actions.setAccountSeal({}, {});
  }

  const actions = {
    setTimeFull: async (flag) => {
      updateState({ timeFull: flag });
      await profile.actions.setTimeFull(flag);
    },
    setMonthLast: async (flag) => {
      updateState({ monthLast: flag });
      await profile.actions.setMonthLast(flag);
    },
    setNotifications: async (pushEnabled) => {
      updateState({ pushEnabled });
      await account.actions.setNotifications(pushEnabled);
    },
    showBlockedContacts: () => {
      updateState({ blockedContacts: true });
    },
    hideBlockedContacts: () => {
      updateState({ blockedContacts: false });
    },
    showBlockedTopics: () => {
      updateState({ blockedTopics: true });
    },
    hideBlockedTopics: () => {
      updateState({ blockedTopics: false });
    },
    showBlockedMessages: () => {
      updateState({ blockedMessages: true });
    },
    hideBlockedMessages: () => {
      updateState({ blockedMessages: false });
    },
    showLogin: () => {
      updateState({ login: true, username: state.handle, password: '', available: true, validated: true });
    },
    hideLogin: () => {
      updateState({ login: false });
    },
    changeLogin: async () => {
      await account.actions.setLogin(state.username, state.password);
    },
    deleteAccount: async () => {
      await app.actions.remove();
    },
    setUsername: (username) => {
      clearTimeout(debounce.current);
      checking.current = username;
      updateState({ username, validated: false });
      if (!username) {
        updateState({ available: false, validated: false });
      }
      else if (state.handle === username) {
        updateState({ available: true, validated: true });
      }
      else {
        debounce.current = setTimeout(async () => {
          const cur = JSON.parse(JSON.stringify(username));
          const available = await profile.actions.getHandleStatus(cur);
          if (checking.current === cur) {
            updateState({ available, validated: true });
          }
        }, 1000);
      }
    },
    setPassword: (password) => {
      updateState({ password });
    },
    setConfirm: (confirm) => {
      updateState({ confirm });
    },
    logout: async () => {
      await app.actions.logout();
    },
    showDelete: () => {
      updateState({ delete: true, confirm: '' });
    },
    hideDelete: () => {
      updateState({ delete: false });
    },
    promptLogout: () => {
      display.actions.showPrompt({
        title: state.strings.loggingOut,
        ok: { label: state.strings.confirmLogout, action: app.actions.logout, failed: () => {
          Alert.alert(
            state.strings.error,
            state.strings.tryAgain,
          );
        }},
        cancel: { label: state.strings.cancel },
      });
    },
    showEditSeal: () => {
      updateState({ editSeal: true, sealPassword: '', hidePassword: true, hideConfirm: true,
          sealDelete: '', sealRemove: false, sealUpdate: false });
    },
    hideEditSeal: () => {
      updateState({ editSeal: false });
    },
    showSealRemove: () => {
      updateState({ sealRemove: true });
    },
    hideSealRemove: () => {
      updateState({ sealRemove: false });
    },
    showSealUpdate: () => {
      updateState({ sealUpdate: true });
    },
    hideSealUpdate: () => {
      updateState({ sealUpdate: false });
    },
    setSealPassword: (sealPassword) => {
      updateState({ sealPassword });
    },
    setSealConfirm: (sealConfirm) => {
      updateState({ sealConfirm });
    },
    setSealDelete: (sealDelete) => {
      updateState({ sealDelete });
    },
    showPassword: () => {
      updateState({ hidePassword: false });
    },
    hidePassword: () => {
      updateState({ hidePassword: true });
    },
    showConfirm: () => {
      updateState({ hideConfirm: false });
    },
    hideConfirm: () => {
      updateState({ hideConfirm: true });
    },
    generateKey: async () => {
      await generateKey();
    },
    disableKey: async () => {
      await disableKey();
    },
    unlockKey: async () => {
      await unlockKey();
    },
    updateKey: async () => {
      await updateKey();
    },
    removeKey: async () => {
      await removeKey();
    },
    unblockContact: async (cardId) => {
      await card.actions.clearCardFlag(cardId);
    },
  };

  return { state, actions };
}


