# -*- coding: utf-8 -*-
"""
Created on Thu Mar 12 09:03:24 2020

@author: 33762
"""

from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import pandas as pd
import sys
import time

offset = 0
players = []

def without_error_encoding(entry):
    if "€" in entry:
        entry = entry.replace(u"€", u"Euros-")
    return entry

def test_fin_list_joueurs(htlm_soup):
    tests = html_soup.findAll("span")
    res = True
    for test in tests:
        if test.text == "Next":
            res = False
    return res

while True :
    req = Request('https://sofifa.com/players?type=all&lg%5B0%5D=13&lg%5B1%5D=14&lg%5B2%5D=60&lg%5B3%5D=61&col=gu&sort=desc&showCol%5B%5D=ae&showCol%5B%5D=oa&showCol%5B%5D=pt&showCol%5B%5D=bp&showCol%5B%5D=gu&showCol%5B%5D=vl&showCol%5B%5D=rc&showCol%5B%5D=pac&showCol%5B%5D=sho&showCol%5B%5D=pas&showCol%5B%5D=dri&showCol%5B%5D=def&showCol%5B%5D=phy&offset='+str(offset), headers={'User-Agent': 'Mozilla/5.0'})

    html = urlopen(req).read()
    html_soup = BeautifulSoup(html, 'html.parser')
    rows = html_soup.findAll("tr")


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
                     "Contract": cells[5].div.div.text[1:],
                     "Best_position": cells[6].text,
                     "Growth": cells[7].text,
                     "Value": cells[8].text,
                     "Release_clause": cells[9].text,
                     "PAC": cells[10].text,
                     "SHO": cells[11].text,
                     "PAS": cells[12].text,
                     "DRI": cells[13].text,
                     "DEF": cells[14].text,
                     "PHY": cells[15].text,
                     "Lien_photo": cells[0].figure.img['data-src']
                }
                url = 'https://sofifa.com'+str(cells[1].a['href'][:-7])+'live'
                req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                html = urlopen(req).read()
                html_soup2 = BeautifulSoup(html, 'html.parser')
                rowsStats = html_soup2.findAll("tr")
                for elem in rowsStats:
                    infos = elem.findAll("td")
                    try:
                        if (len(infos)==13 and infos[0].a.text == '2019/2020'):
                            player_entry.update([
                                    ('League',infos[2].a['title']),
                                    ('Min',infos[3].text),
                                    ('App',infos[4].text),
                                    ('Lineup start',infos[5].text),
                                    ('Sub in',infos[6].text),
                                    ('Sub out',infos[7].text),
                                    ('Sub on bench',infos[8].text),
                                    ('Goal',infos[9].text),
                                    ('Yellow card',infos[10].text),
                                    ('Yellow 2nd card',infos[11].text),
                                    ('Red card',infos[12].text)
                                    
                                    ])
                    except Exception :
                        pass
                players.append(player_entry)
            except ValueError:
                print("Ouch!")



    if(test_fin_list_joueurs(html_soup)):
        df = pd.DataFrame(players, columns=['Nom','Position','Age','Overall_rating','Potential','Team','Contract','Best_position','Growth','Value','Release_clause','PAC','SHO','PAS','DRI','DEF','PHY','Lien_photo','League','Min','App','Lineup start','Sub in','Sub out','Sub on bench','Goal','Yellow card','Yellow 2nd card','Red card'])
        df["Value"] = df["Value"].apply(without_error_encoding)
        df["Release_clause"] = df["Release_clause"].apply(without_error_encoding)

        df.to_csv("js/public/players.csv")
        print('Done !')
        sys.exit('Fin de la récolte des joueurs.')
    else:
        offset = offset+60
        print(str(round((offset/2660)*100)) + '%')
