import { checkResponse, fetchWithTimeout } from './fetchUtil';

export async function setChannelNotifications(server, token, channelId, flag) {
  const notify = await fetchWithTimeout(`https://${server}/content/channels/${channelId}/notification?agent=${token}`, { method: 'PUT', body: JSON.stringify(flag) });
  checkResponse(notify)
}

