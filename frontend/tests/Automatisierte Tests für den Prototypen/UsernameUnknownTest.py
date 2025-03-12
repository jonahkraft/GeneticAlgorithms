from aaa import initialize_driver1,initialize_driver2, click_button, wait_elements
from selenium.webdriver.common.by import By
import time

#Test überprüft, ob ein nicht eingeloggter User die Rolle "simulator" bekommt
#und kein Username angezeigt wird.

driver = initialize_driver1()
#driver = initialize_driver2()

click_button(driver, "_navbarListItem_15rkn_40", "Settings")
acc_info = wait_elements(driver, By.CLASS_NAME, "_settingsText_sir06_100")
print(acc_info[0])
print(acc_info[1])

if acc_info[0].text != "username: could not load username" or acc_info[1].text != "role: simulator":
    print("Fehler")
driver.quit()
