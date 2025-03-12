from aaa import initialize_driver1,initialize_driver2, click_button
import time

#Test überprüft, ob die Buttons in der Navigationsbar auf die richtigen Seiten weiterleiten.

driver = initialize_driver1()
#driver = initialize_driver2()

nav_items = {
    "Login": "http://localhost:3000/login.html",
    "Settings": "http://localhost:3000/settings.html",
    "Home": "http://localhost:3000/index.html",
    "Data Visualization": "http://localhost:3000/visualization.html"
}

for item, expected_url in nav_items.items():
    try:
        click_button(driver, "_navbarListItem_15rkn_40", item)
        time.sleep(1)
        if driver.current_url != expected_url:
            print(f"Fehler: Nach Klick auf '{item}' falsche Weiterleitung ({driver.current_url}) statt {expected_url}")

        if item != "Home":
            driver.get("http://localhost:3000/index.html")

    except Exception as e:
        print(f"Fehler beim Testen von '{item}': {e}")

driver.quit()
