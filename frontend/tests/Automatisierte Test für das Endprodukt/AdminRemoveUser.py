from AlleFunktionen import initialize_driver1,initialize_driver2, click_button, wait_element, wait_elements
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
time.sleep(2)                                           ##dieser Part soll zeigen, dass der User existiert
click_button(driver, "navbar_Logout")
alert = Alert(driver)
alert.accept()
time.sleep(2)
click_button(driver, "navbar_Login")
wait_element(driver, By.ID, "username").send_keys(bb)
wait_element(driver, By.ID, "password").send_keys(bb)
click_button(driver, "login_Login")
time.sleep(2)                                           ##Login als Admin
click_button(driver, "navbar_Settings")
click_button(driver, "settings_Management")
wait_element(driver, By.ID, "settings_OldUser").send_keys(newusername)
click_button(driver, "settings_DeleteUser")
driver.execute_script("window.scrollBy(0, -500);")
time.sleep(3)                                           ##Hier wurde der User vom Admin gelöscht
click_button(driver, "navbar_Logout")
alert = Alert(driver)
time.sleep(2)
alert.accept()
click_button(driver, "navbar_Login")
wait_element(driver, By.ID, "username").send_keys(newusername)
wait_element(driver, By.ID, "password").send_keys(newpassword)
time.sleep(3)                                           ##Login mit alten Userdaten funktioniert nicht mehr
click_button(driver, "login_Login")
time.sleep(3)

##Testablauf soll zeigen, dass der Admin neue User läschen kann


driver.quit()