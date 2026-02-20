from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Go to syllabus.html
    page.goto("http://localhost:8000/syllabus.html")

    # 2. Click the Functional Programming link
    # The link text is "Functional Programming →" but the arrow might be an entity.
    # I'll use text content.
    page.click("text=Functional Programming")

    # 3. Verify navigation to functional.html
    page.wait_for_url("**/functional.html")

    # 4. Verify title
    assert "Functional Programming" in page.title()

    # 5. Take a screenshot
    page.screenshot(path="verification/functional_page.png", full_page=True)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
