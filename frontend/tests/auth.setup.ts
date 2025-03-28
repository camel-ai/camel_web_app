import { test as setup } from "@playwright/test"

const authFile = "playwright/.auth/user.json"

setup("basic page test", async ({ page }) => {
  // 访问主页
  await page.goto("/")
  
  // 等待页面加载完成
  await page.waitForSelector('.chat-interface', { state: 'visible', timeout: 10000 })
  
  // 保存状态
  await page.context().storageState({ path: authFile })
})
