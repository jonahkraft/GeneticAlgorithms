from aaa import initialize_driver1,initialize_driver2, click_button, wait_element, wait_elements
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
import time

driver = initialize_driver1()
#driver = initialize_driver2()

newusername = "khan"
newpassword = "nknk"

bb ="bb"

click_button(driver, "navbar_Login")
wait_element(driver, By.ID, "username").send_keys(newusername)
wait_element(driver, By.ID, "password").send_keys(newpassword)
click_button(driver, "login_Login")
time.sleep(2)                                           ##dieser Part soll zeigen, dass der User noch nicht existiert
wait_element(driver, By.ID, "username").clear()
wait_element(driver, By.ID, "password").clear()
time.sleep(2)
wait_element(driver, By.ID, "username").send_keys(bb)
wait_element(driver, By.ID, "password").clear()
wait_element(driver, By.ID, "password").send_keys(bb)
time.sleep(2)                                           ##Login als Admin
click_button(driver, "login_Login")
click_button(driver, "navbar_Settings")
click_button(driver, "settings_Management")
wait_element(driver, By.ID, "settings_NewUser").send_keys(newusername)
wait_element(driver, By.ID, "settings_NewPassword").send_keys(newpassword)
click_button(driver, "settings_ChooseRole")
click_button(driver, "role_Simulator")
click_button(driver, "settings_AddUser")
driver.execute_script("window.scrollBy(0, 1200);")
time.sleep(3)                                           ##Hier wurde der neue User vom Admin hinzugefügt
click_button(driver, "navbar_Logout")
alert = Alert(driver)
alert.accept()

click_button(driver, "navbar_Login")
wait_element(driver, By.ID, "username").send_keys(newusername)
wait_element(driver, By.ID, "password").send_keys(newpassword)
time.sleep(3)                                           ##Login mit neuen Userdaten funktioniert
click_button(driver, "login_Login")
time.sleep(3)

##Testablauf soll zeigen, dass der Admin neue User registrieren kann


driver.quit()