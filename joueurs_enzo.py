# -*- coding: utf-8 -*-
"""
Created on Thu Mar 12 09:03:24 2020

@author: 33762
"""

from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import pandas as pd

req = Request('https://sofifa.com/players?type=all&lg%5B0%5D=13&lg%5B1%5D=14&lg%5B2%5D=60&lg%5B3%5D=61&col=gu&sort=desc&showCol%5B%5D=ae&showCol%5B%5D=oa&showCol%5B%5D=pt&showCol%5B%5D=bp&showCol%5B%5D=gu&showCol%5B%5D=vl&showCol%5B%5D=rc&showCol%5B%5D=pac&showCol%5B%5D=sho&showCol%5B%5D=pas&showCol%5B%5D=dri&showCol%5B%5D=def&showCol%5B%5D=phy', headers={'User-Agent': 'Mozilla/5.0'})
html = urlopen(req).read()

html_soup = BeautifulSoup(html, 'html.parser')
rows = html_soup.findAll("tr")



players = []
for row in rows:
    cells = row.findAll("td")

    if (len(cells) == 17):
        try:
            player_entry = {
                 "Nom": cells[1].a.text,
                 "Position": cells[1].span.text,
                 "Age": cells[2].text,
                 "Overall_rating": cells[3].text,
                 "Potential": cells[4].text,
                 "Team": cells[5].a.text,
                 "Contract": cells[5].div.div.text,    
                 "Best_position": cells[6].text,
                 "Growth": cells[7].text,
                 "Value": cells[8].text,
                 "Release_clause": cells[9].text,
                 "PAC": cells[10].text,
                 "SHO": cells[11].text,
                 "PAS": cells[12].text,
                 "DRI": cells[13].text,
                 "DEF": cells[14].text,
                 "PHY": cells[15].text
                 
            }
            players.append(player_entry)        
        except ValueError:
            print("Ouch!")

df = pd.DataFrame(players, columns=['Nom','Position','Age','Overall_rating','Potential','Team','Contract','Best_position','Growth','Value','Release_clause','PAC','SHO','PAS','DRI','DEF','PHY'])

def without_error_encoding(entry):
    if "€" in entry:
        entry = entry.replace(u"€", u"Euros-")
    return entry

df["Value"] = df["Value"].apply(without_error_encoding)
df["Release_clause"] = df["Release_clause"].apply(without_error_encoding)

df.to_csv("players.csv")
print('Done !')
