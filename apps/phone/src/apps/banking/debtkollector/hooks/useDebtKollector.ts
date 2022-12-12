import { Bills, BillingEvents } from '@typings/banking';
import fetchNui from '@utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { isEnvBrowser } from '@utils/misc';
import { MockBillingData } from '../utils/MockBillingData';

export const fetchBills = async (): Promise<Bills[]> => {
  try {
    const resp = await fetchNui<ServerPromiseResp<Bills[]>>(BillingEvents.GET_BILLS);
    return resp.data;
  } catch (e) {
    if (isEnvBrowser()) return MockBillingData;
    console.error(e);
    return [];
  }
};
