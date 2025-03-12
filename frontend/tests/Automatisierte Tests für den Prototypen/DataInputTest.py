from aaa import initialize_driver1,initialize_driver2, click_button, wait_element
from selenium.webdriver.common.by import By
import time

#Test wird genutz, um zu überprüfen, ob die Werte der einzelnen Eingabefelder nach Starten der Simulation
#auch richtig angezeigt werden

driver = initialize_driver1()
#driver = initialize_driver2()

a, b, c, d, e, f, g = 0.612387, 3, 2, 2, 5, 6, 7890.122
click_button(driver, "_navbarListItem_15rkn_40", "Data Visualization")
wait_element(driver, By.NAME, "aep").send_keys(a)
wait_element(driver, By.NAME, "generation_count").send_keys(b)
wait_element(driver, By.NAME, "population_size").send_keys(c)
wait_element(driver, By.NAME, "given_seed").send_keys(d)
wait_element(driver, By.NAME, "elite_count").send_keys(e)
wait_element(driver, By.NAME, "alien_count").send_keys(f)
wait_element(driver, By.NAME, "weights").send_keys(g)
click_button(driver, "_paraButton_1joxc_32", "Start Simulation")
time.sleep(3)

content = wait_element(driver, By.ID, "transData").text
if content != f"AEP: {a}, Generation Count: {b}, Population Size: {c}, Given Seed: {d}, Elite Count: {e}, Alien Count: {f}, Weights: {g}":
    print("fehler")

driver.quit()

