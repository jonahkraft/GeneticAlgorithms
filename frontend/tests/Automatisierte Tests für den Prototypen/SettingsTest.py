from aaa import initialize_driver1,initialize_driver2, click_button, test_navigation
from selenium.webdriver.common.by import By
import time

#Test überprüft, ob die Settingsseiten richtig laden.
#muss noch überarbeitet werden
driver = initialize_driver1()
#driver = initialize_driver2()


click_button(driver, "_navbarListItem_15rkn_40", "Settings")

settings_pages = ["Color Filter", "Easy Speech", "Language"]

for page in settings_pages:
    test_navigation(driver, "_navigationLinkInactive_tqmry_42", page, "_rightbox_tqmry_88", page)

driver.quit()
