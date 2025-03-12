from aaa import initialize_driver1,initialize_driver2, click_button, wait_element
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
import time

#Test überprüft, ob der User nach dem Logout auf die Startseite weitergeleitet wird.

driver = initialize_driver1()
#driver = initialize_driver2()

click_button(driver, "_navbarListItem_15rkn_40", "Login")
wait_element(driver, By.ID, "username").send_keys("admin")
wait_element(driver, By.ID, "password").send_keys("admin")
click_button(driver, "_button_z9y01_113", "Login")
time.sleep(1)
click_button(driver, "_navbarListItem_15rkn_40", "Logout")
time.sleep(3)

alert = Alert(driver)
alert.accept()
time.sleep(3)

if driver.current_url != "http://localhost:3000/index.html":
    print("Fehler")
driver.quit()