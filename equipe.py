# -*- coding: utf-8 -*-
"""
Created on Thu Mar 12 09:03:24 2020

@author: 33762
"""

from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd


html = urlopen("https://fbref.com/en/country/clubs/ENG/England-Football-Clubs")
html_soup = BeautifulSoup(html, 'html.parser')
rows = html_soup.findAll("tr")
teams = []

for row in rows:
    squad = row.find("a")
    cells = row.findAll("td")
    if (len(cells) == 7):
        debut_url=squad['href'][0:20]
        fin_url=squad['href'][28:-1]
        try:
            team_entry = {
                "squad": squad.text,
                "url": "https://fbref.com" + squad['href'],
                "url_saison_actuelle": "https://fbref.com" + debut_url + fin_url,
                "gender": cells[0].text,
                "comp": cells[1].text,
                "from": cells[2].text,
                "to": cells[3].text,
                "comps": cells[4].text,
                "champs": cells[5].text,    
                "other_names": cells[6].text
            }
            teams.append(team_entry)
        except ValueError:
            print("Ouch!")



df = pd.DataFrame(teams,columns=['squad','url','url_saison_actuelle','gender','comp','from','to','comps','champs','other_names'])


df.to_csv("teams.csv")
print("Done !")