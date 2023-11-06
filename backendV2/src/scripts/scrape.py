import sys
from bs4 import BeautifulSoup
import pandas as pd
from time import sleep
from random import randint
import requests


def process_url(url):
    i = 0
    headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0' } 
    
    try: 
        page = requests.get(url, allow_redirects=False, headers = headers ,timeout=10)
    except requests.exceptions.Timeout as err: 
        print(err)
    
    soup = BeautifulSoup(page.content, 'html.parser')
    summaryResult = soup.find(id="PropertySummary")
    
    propertyDetailData = summaryResult.find_all("div", class_="propertyDetailsSectionContentValue")
    labels = summaryResult.find_all("div", class_ = "propertyDetailsSectionContentLabel")
    processedString = "{"
    for (info, label) in zip(propertyDetailData,labels):
        processedString = processedString+ "\""+label.text.strip() +"\": \""+ info.text.strip()+ "\", "
        i = i + 1
    
    buildingResult = soup.find(id = "listingDetailsBuildingCon")
    buildingDetailData = buildingResult.find_all("div", class_ ="propertyDetailsSectionContentValue")
    labels = buildingResult.find_all("div", class_ = "propertyDetailsSectionContentLabel")
    for (info,label) in zip(buildingDetailData,labels):
        processedString = processedString+ "\""+label.text.strip() +"\": \""+ info.text.strip()+ "\", "
        i = i + 1
    
    landResult = soup.find(id = "propertyDetailsLandSection")
    landDetailData = landResult.find_all("div", class_ ="propertyDetailsSectionContentValue")
    labels = landResult.find_all("div", class_ = "propertyDetailsSectionContentLabel")
    for (info,label) in zip(landDetailData,labels):
        processedString = processedString+ "\""+label.text.strip() +"\": \""+ info.text.strip()+ "\", "
        i = i + 1

    imageResult = soup.find(id = "heroImage")
    processedString += "\"imageLink\": "+ imageResult['src']
    processedString += "}"
    return processedString

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: scrape.py <url_to_process>")
        sys.exit(1)

    url = sys.argv[1]
    result = process_url(url)
    print(result)