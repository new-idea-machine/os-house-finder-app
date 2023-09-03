import sys
from bs4 import BeautifulSoup
import pandas as pd
from time import sleep
from random import randint
import requests

def process_url(url):
    i = 0
    keys = ["Property Type", "Building Type", "Storeys", "Square Footage", "Community Name", "Subdivision Name", "Title", "Land Size", "Built in", "Annual Property Taxes", "Parking Type", "Time on REALTOR.ca"]
    headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0' } 
    try: 
        page = requests.get(url, allow_redirects=False, headers = headers ,timeout=10)
    except requests.exceptions.Timeout as err: 
        print(err)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find(id="PropertySummary")
    propertyDetailData = results.find_all("div", class_="propertyDetailsSectionContentValue")
    processedString = "{"
    for info in propertyDetailData:
        processedString = processedString+ "\""+keys[i] +"\": \""+ info.text.strip()+ "\", "
        i = i + 1
    processedString = processedString[:-2]
    processedString = processedString + "}"
    return processedString

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: scrape.py <url_to_process>")
        sys.exit(1)

    url = sys.argv[1]
    result = process_url(url)
    print(result)