from aaa import initialize_driver1,initialize_driver2, click_button, wait_element
from selenium.webdriver.common.by import By
import time

#Test überpfrüft, ob ein eingeloggter User den richtigen Username in den Einstellungen angezeigt bekommt.

driver = initialize_driver1()
#driver = initialize_driver2()


click_button(driver, "_navbarListItem_15rkn_40", "Login")
wait_element(driver, By.ID, "username").send_keys("admin")
wait_element(driver, By.ID, "password").send_keys("admin")
click_button(driver, "_button_z9y01_113", "Login")
time.sleep(1)
click_button(driver, "_navbarListItem_15rkn_40", "Settings")
acc_info = wait_element(driver, By.CLASS_NAME, "_settingsText_sir06_100").text

if "username: admin" == acc_info:
    driver.get("https://t3.ftcdn.net/jpg/01/11/23/66/360_F_111236618_lYr6mJ48LCzszFP0a9mq5GDzUQc8eakF.jpg")
    time.sleep(2)
else:
    print("Fehler")

driver.quit()
