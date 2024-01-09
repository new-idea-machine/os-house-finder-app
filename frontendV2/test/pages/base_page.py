# BasePage.py

class BasePage:
    def __init__(self, page):
        self.page = page

    def goto(self, url):
        self.page.goto(url)
        
    # def locator(self, selector):
    #     return self.page.locator(selector)
    
    def locator(self, selector, timeout=3000):
        element = self.page.wait_for_selector(selector, timeout=timeout)
        self.wait_for_navigation()  # Call wait_for_navigation after locating the element
        return element

    def wait_for_navigation(self):
        self.page.wait_for_navigation()