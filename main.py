# -*- coding: utf-8 -*-
"""
Created on Thu Mar 12 09:03:24 2020

@author: 33762
"""

from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

list_lettre=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','y','z','oth']

rows = []
for lettre in list_lettre :
   html = urlopen("http://fchd.info/index"+lettre+".htm")
   html_soup = BeautifulSoup(html, 'html.parser')
   rows = rows + html_soup.findAll("li")
   

def find_nth(haystack, needle, n):
    start = haystack.find(needle)
    while start >= 0 and n > 1:
        start = haystack.find(needle, start+len(needle))
        n -= 1
    return start

teams = []

for row in rows :
    start_url=find_nth(str(row),"\"",1)
    end_url=find_nth(str(row),"\"",2)
    team=row.text
    url=str(row)[start_url+1:end_url]
    teams_entry = {
                "nom": team,
                "url": "http://fchd.info/"+url
            } 
    teams.append(teams_entry)  
    
df = pd.DataFrame(teams)
df.to_csv("teams.csv")