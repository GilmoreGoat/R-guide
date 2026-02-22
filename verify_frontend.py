from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # OOP Module
        print("Checking OOP Module...")
        page.goto("http://127.0.0.1:8080/modules/oop.html")
        page.wait_for_selector("text=The Band Fund", timeout=10000)
        page.screenshot(path="verification_screenshots/oop.png", full_page=True)
        print("OOP screenshot taken")

        # Debugging Module
        print("Checking Debugging Module...")
        page.goto("http://127.0.0.1:8080/modules/debugging.html")
        page.wait_for_selector("text=The Printing Press", timeout=10000)
        page.screenshot(path="verification_screenshots/debugging.png", full_page=True)
        print("Debugging screenshot taken")

        # Functional Module
        print("Checking Functional Module...")
        page.goto("http://127.0.0.1:8080/modules/functional.html")
        page.wait_for_selector("text=Price Adjustment", timeout=10000)
        page.screenshot(path="verification_screenshots/functional.png", full_page=True)
        print("Functional screenshot taken")

        browser.close()

if __name__ == "__main__":
    run()
