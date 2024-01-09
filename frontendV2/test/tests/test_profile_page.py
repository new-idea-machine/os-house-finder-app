# COULD ALSO JUST USE PLAYWRIGHT CODEGEN "URL" 
# AND NOT USE POM (BASEPAGE, CONFTEST, ETC.)

from ..pages.profile_page import ProfilePage
from playwright.sync_api import sync_playwright

def test_guest_can_go_to_profile_page(page):
    profile_page = ProfilePage(page)
    profile_page.navigate_to_profile_page()

def test_guest_can_add_new_profile(page):
    profile_page = ProfilePage(page)
    profile_page.should_be_profile_button()
    
#...
    

