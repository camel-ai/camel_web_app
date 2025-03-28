import { test, expect } from "@playwright/test"

// 使用 auth.setup.ts 中设置的状态
test.use({ storageState: 'playwright/.auth/user.json' })

test.describe("Camel Agent Chat", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    // 等待聊天界面加载
    await page.waitForSelector('.chat-interface', { state: 'visible' })
  })

  test("should be able to chat with the agent", async ({ page }) => {
    // 找到并填写系统消息输入框
    const systemMessageInput = await page.locator('textarea').first()
    await systemMessageInput.fill("You are a helpful assistant")

    // 找到并填写用户消息输入框
    const userMessageInput = await page.locator('.chat-input input')
    await userMessageInput.fill("Hello, who are you?")

    // 提交消息
    await page.keyboard.press('Enter')

    // 等待响应出现在聊天历史中
    await expect(
      page.locator('.chat-message.assistant').first()
    ).toBeVisible({ timeout: 30000 })
  })

  test("should display chat history correctly", async ({ page }) => {
    // 发送消息
    const userMessageInput = await page.locator('.chat-input input')
    await userMessageInput.fill("Test message")
    await page.keyboard.press('Enter')

    // 验证用户消息和AI响应都显示在历史记录中
    await expect(page.locator('.chat-message.user')).toBeVisible()
    await expect(page.locator('.chat-message.assistant')).toBeVisible()
  })

  test("should handle model selection", async ({ page }) => {
    // 选择不同的模型
    const modelSelect = await page.locator('select').first()
    await modelSelect.selectOption('GPT_3_5_TURBO')

    // 发送消息并验证响应
    const userMessageInput = await page.locator('.chat-input input')
    await userMessageInput.fill("Hello with GPT-3.5")
    await page.keyboard.press('Enter')

    // 验证响应
    await expect(
      page.locator('.chat-message.assistant').first()
    ).toBeVisible({ timeout: 30000 })
  })

  test("should handle API errors gracefully", async ({ page }) => {
    await page.goto("/")

    // 模拟无效的系统消息
    await page.getByLabel("System Message").fill("")
    await page.getByPlaceholder("输入消息...").fill("This should fail")
    await page.getByRole("button", { name: "发送" }).click()

    // 验证错误消息显示
    await expect(page.getByText("抱歉，发生了错误")).toBeVisible()
  })
})