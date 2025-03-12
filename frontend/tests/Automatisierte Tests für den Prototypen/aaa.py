from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

#Funktionen, die für die Tests genutzt werden.

def wait_element(driver, by, value, timeout=10):
    return WebDriverWait(driver, timeout).until(EC.presence_of_element_located((by, value)))

def wait_elements(driver, by, value, timeout=10):
    return WebDriverWait(driver, timeout).until(EC.presence_of_all_elements_located((by, value)))

def click_button(driver, class_name, button_text):
    wait_element(driver, By.CLASS_NAME, class_name)
    buttons = driver.find_elements(By.CLASS_NAME, class_name)
    for button in buttons:
        if button.text == button_text:
            button.click()
            return True
    return False

def test_navigation(driver, subbutton, page_name, textbox, expecte_text):
    click_button(driver, subbutton, page_name)
    content = wait_element(driver, By.CLASS_NAME, textbox).text
    
    actual_text = content.strip()
    if expecte_text != actual_text:
        print(f"Fehler: {page_name} nicht korrekt geladen!")
        print(actual_text)
    time.sleep(1)

def initialize_driver1():
    driver = webdriver.Safari()
    driver.get("http://localhost:3000/index.html")
    driver.maximize_window()
    return driver

def initialize_driver2():
    time.sleep(15)
    driver = webdriver.Chrome()
    driver.get("http://localhost:3000/index.html")
    driver.maximize_window()
    return driver

