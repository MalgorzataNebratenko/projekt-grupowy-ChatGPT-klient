import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

# Inicjalizacja przeglądarki
driver = webdriver.Edge()

# Otworzenie strony
driver.get("https://www.bing.com/")

time.sleep(2)
# Znalezienie pola tekstowego na stronie
# chat = driver.find_element("codex") 
chat = driver.find_element(By.ID, 'codex')

child_a = chat.find_element(By.TAG_NAME, "a")

redirected_url = child_a.get_attribute("href")

print("Adres przekierowanej strony:", redirected_url)

child_a.click()

time.sleep(10)


# # Teraz, aby znaleźć element <a> jako jego dziecko
# child_a = chat.find_element("a")

# # Pobranie adresu URL przekierowanej strony
# redirected_url = child_a.get_attribute("href")

# # Wyświetlenie pobranego adresu
# print("Adres przekierowanej strony:", redirected_url)

# child_a.click()

# # Pobranie wartości z pola tekstowego
# text_value = textbox.get_attribute("value")

# # Wyświetlenie pobranej wartości
# print("Wartość pola tekstowego:", text_value)

# Zakończ przeglądarkę
driver.quit()
