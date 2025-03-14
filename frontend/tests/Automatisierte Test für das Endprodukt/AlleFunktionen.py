from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

nav_bar = ["navbar_Home", "navbar_Data", "navbar_Settings", "navbar_Login", "navbar_Logout", "navbar_Icon"]
home_buttons = ["home_PTS", "home_FAQ1", "home_FAQ2", "home_FAQ3"]
data_buttons =["data_StartSimu", "data_Protocol", "data_Debug"]
settings_buttons = ["settings_Account", "settings_Appearance", "settings_Accesibility", "settings_Management"]
settings_Management = ["settings_NewUser", "settings_NewPassword","settings_ChooseRole", "settings_AddUser", "settings_OldUser", "settings_DeleteUser"]
login_buttons = ["login_Login"]

Generic_buttons = ["login_Login", "home_PTS", "data_StartSimu", "data_Protocol", "data_Debug", "data_History"]



#Funktionen, die für die Tests genutzt werden.

def wait_element(driver, by, value, timeout=10):
    return WebDriverWait(driver, timeout).until(EC.presence_of_element_located((by, value)))

def wait_elements(driver, by, value, timeout=10):
    return WebDriverWait(driver, timeout).until(EC.presence_of_all_elements_located((by, value)))

def click_button(driver, button_text):
    wait_element(driver, By.ID, button_text)
    button = driver.find_element(By.ID, button_text)
    button.click()
    return True



def test_navigation(driver, button_id, expecte_text):
    click_button(driver, button_id)
    content = wait_element(driver, By.CLASS_NAME, expecte_text)
    del content[0]
    for x in content:
        actual_text = x.text
        if expecte_text != actual_text:
            print(f"Fehler: {button_id} nicht korrekt geladen!")
        time.sleep(1)

def initialize_driver1():
    driver = webdriver.Safari()
    driver.get("http://localhost:3000")
    driver.maximize_window()
    return driver

def initialize_driver2():
    time.sleep(15)
    driver = webdriver.Chrome()
    driver.get("http://localhost:3000")
    driver.maximize_window()
    return driver

