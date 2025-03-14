from AlleFunktionen import initialize_driver1,initialize_driver2, click_button, wait_element, wait_elements
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
import time

driver = initialize_driver1()
#driver = initialize_driver2()

oldusername = "khan"
oldpassword = "nknk"

newusername = "abc"
newpassword = "123"


click_button(driver, "navbar_Login")
wait_element(driver, By.ID, "username").send_keys(oldusername)
wait_element(driver, By.ID, "password").send_keys(oldpassword)
click_button(driver, "login_Login")
time.sleep(2)                                           ##dieser Part soll zeigen, dass der User existiert
click_button(driver, "navbar_Logout")
alert = Alert(driver)
alert.accept()
time.sleep(2)
click_button(driver, "navbar_Login")
wait_element(driver, By.ID, "username").send_keys("user")
wait_element(driver, By.ID, "password").send_keys("password")
click_button(driver, "login_Login")
time.sleep(2)                                           ##Login als Admin
click_button(driver, "navbar_Settings")
click_button(driver, "settings_Management")
wait_element(driver, By.ID, "settings_OldUsername").send_keys(oldusername)
wait_element(driver, By.ID, "settings_ChangedUsername").send_keys(newusername)
wait_element(driver, By.ID, "settings_ChangedPassword").send_keys(newpassword)
time.sleep(3)                                           ##Hier wurde der User vom Admin gelöscht
click_button(driver, "settings_ChooseRole2")
click_button(driver, "settings_NewAdmin")
click_button(driver, "settings_ApplyChanges")
driver.execute_script("window.scrollBy(0, 500);")
time.sleep(2)
click_button(driver, "navbar_Logout")
alert = Alert(driver)
alert.accept()
time.sleep(2)
click_button(driver, "navbar_Login")
wait_element(driver, By.ID, "username").send_keys(oldusername)
wait_element(driver, By.ID, "password").send_keys(oldpassword)
click_button(driver, "login_Login")
time.sleep(2)                                           ##dieser Part soll zeigen, dass der User noch nicht existiert
wait_element(driver, By.ID, "username").clear()
wait_element(driver, By.ID, "password").clear()
time.sleep(2)
wait_element(driver, By.ID, "username").send_keys(newusername)
wait_element(driver, By.ID, "password").clear()
wait_element(driver, By.ID, "password").send_keys(newpassword)
click_button(driver, "login_Login")
time.sleep(3)

##Testablauf soll zeigen, dass der Admin neue User läschen kann


driver.quit()