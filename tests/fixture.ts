import { test as baseTest } from '@playwright/test'
import * as apiHelper from '../helpers/apiHelper'

export const fixtures = baseTest.extend<{ apiHelpers: typeof apiHelper }>({
    apiHelpers: async ({}, use) => {
    await use(apiHelper);
  },
});