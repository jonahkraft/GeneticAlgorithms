from AlleFunktionen import initialize_driver1,initialize_driver2, click_button, wait_element, wait_elements
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
import time

#Test soll überprüfen, dass beim Aktiveren von Easy Speech in den Einstellungen alle Texte auf der Website
#in einfacher Sprache geschrieben sind.

driver = initialize_driver1()
#driver = initialize_driver2()



click_button(driver, "navbar_Login")
wait_element(driver, By.ID, "username").send_keys("user")
wait_element(driver, By.ID, "password").send_keys("password")
#time.sleep(2)
click_button(driver, "login_Login")
click_button(driver, "navbar_Settings")
click_button(driver, "settings_Accesibility")
click_button(driver, "slider")
#time.sleep(2)
click_button(driver, "navbar_Data")
#time.sleep(2)
text = wait_element(driver, By.ID, "data_description").text
if "Every generation is the base of the following generation." in text:
    print("Fehler")
click_button(driver, "navbar_Home")
click_button(driver, "FAQ1")
answer1 = wait_element(driver, By.ID, "answer1").text
if "This simulation is designed to optimize specific characteristics of a car using a genetic algorithm." in answer1:
    print("Fehler")
click_button(driver, "FAQ2")
answer2 = wait_element(driver, By.ID, "answer2").text
if "To begin, navigate to the Data Visualization page." in answer2:
    print("Fehler")
click_button(driver, "FAQ3")
answer3 = wait_element(driver, By.ID, "answer3").text
if "The overview graph displays all members of the population, organized by generation and consumption." in answer3:
    print("fehler")
driver.execute_script("window.scrollBy(0, 500);")
driver.quit()
