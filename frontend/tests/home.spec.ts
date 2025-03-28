import { test, expect } from "@playwright/test"

test.describe("Home Page", () => {
  test("should load the main page", async ({ page }) => {
    await page.goto("/")
    
    // 验证页面标题存在
    await expect(page.getByRole("heading", { name: "Welcome to My App" })).toBeVisible()
    
    // 在这里添加更多的测试用例
    // 例如：验证特定组件是否存在、交互是否正常等
  })
}) 