from ..pages.base_page import BasePage
from .locators import ProfilePageLocators
# YOU CAN ALSO JUST USE PLAYWRIGHT CODEGEN ON URL
# AND NOT USE POM (BASEPAGE, CONFTEST, ETC.)

# ALSO ADD TEST FOR LOGIN/OUT ( POSS TO CONFTEST FOR EVERY TEST AFTER ACCNT CREATE)
# OR JUST USE CODEGEN INSTEAD

class ProfilePage(BasePage):
    
    def __init__(self, page):
        self.page = page

    def navigate_to_profile_page(self):
        self.page.goto("ADD PROFILE PAGE URL HERE")
        
     # Test Add New Profile button
    def should_be_profile_button(self):
        self.page.locator(ProfilePageLocators.add_new_profile_button).click()
        # Add assertions or additional interactions related to the Add New Profile functionality

    def should_be_delete_row_button(self):
        # Test Delete Row button
        self.page.locator(ProfilePageLocators.delete_row_button).click()
        # Add assertions or additional interactions related to the Delete Row functionality
    def should_be_eye_icon_button(self):
        # Test Eye icon
        self.page.locator(ProfilePageLocators.eye_icon).click()
        # Add assertions or additional interactions related to the Eye icon functionality

    def should_be_external_link_button(self):
        # Test External Link icon
        self.page.locator(ProfilePageLocators.external_link_icon).click()
        # Add assertions or additional interactions related to the External Link icon functionality
    def should_be_trash_icon_button(self):
        # Test Trash icon
        self.page.locator(ProfilePageLocators.trash_icon).click()
        # Add assertions or additional interactions related to the Trash icon functionality

    def should_be_dropdown_button(self):
        # Test Link to Listing option in the dropdown
        self.page.locator('button:has-text("Open menu")')  # Click to open the dropdown
        self.page.locator(ProfilePageLocators.link_to_listing_option).click()
        # Add assertions or additional interactions related to the Link to Listing option
