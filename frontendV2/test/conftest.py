import pytest
from playwright.sync_api import sync_playwright

# Fixture to launch a Playwright browser instance before each test
@pytest.fixture(scope="function")
def browser():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=3000)
        yield browser
        browser.close()
        
# Fixture to create a new Playwright context before each test
@pytest.fixture(scope="function")
def context(browser):
    context = browser.new_context()
    yield context
    context.close()

# Fixture to create a new Playwright page before each test
@pytest.fixture(scope="function")
def page(browser):
    return browser.new_page()