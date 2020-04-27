#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Apr 27 09:02:49 2020

@author: bernardintheo
"""

from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import pandas as pd
import sys
import time

offset = 0
teams = []



def test_fin_list_teams(htlm_soup):
    tests = html_soup.findAll("span")
    res = True
    for test in tests:
        if test.text == "Next":
            res = False
    return res



def without_error_encoding(entry):
    if "€" in entry:
        entry = entry.replace(u"€", u"Euros-")
    return entry



while True :
    req = Request('https://sofifa.com/teams?type=all&lg%5B%5D=61&lg%5B%5D=13&lg%5B%5D=60&lg%5B%5D=14&offset='+str(offset), headers={'User-Agent': 'Mozilla/5.0'})

    html = urlopen(req).read()
    html_soup = BeautifulSoup(html, 'html.parser')
    rows = html_soup.findAll("tr")
    
    
    for row in rows:
        cells = row.findAll("td")
        
        if(len(cells) == 7):
            team_entry = {
                    "Url_logo": cells[0].img['data-src'],
                    "Name": cells[1].a.text,
                    "League":cells[1].find("a",{"class":"sub"}).text,
                    "Overall_rating":cells[2].span.text,
                    "Attack":cells[3].span.text,
                    "Mid":cells[4].span.text,
                    "Defense":cells[5].span.text
                    }
            
            url = 'https://sofifa.com'+str(cells[1].a['href'])
            req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            html = urlopen(req).read()
            html_soup2 = BeautifulSoup(html, 'html.parser')
            rowsStats = html_soup2.findAll("dd")
            rowsStats2 = html_soup2.find_all("li")
            
                        
            team_entry.update([("Defensive_style",rowsStats[0].span.text),
                               ("Offensive_style",rowsStats[3].span.text),
                               ("Captain",rowsStats2[7].a.text),
                               ("SFK",rowsStats2[8].a.text),
                               ("LFK",rowsStats2[9].a.text),
                               ("LSFK",rowsStats2[10].a.text),
                               ("RSFK",rowsStats2[11].a.text),
                               ("PEN",rowsStats2[12].a.text),
                               ("Left_corner",rowsStats2[13].a.text),
                               ("Right_corner",rowsStats2[14].a.text),
                               ("XI_average_age",rowsStats2[5].text[23:]),
                               ("Team_average_age",rowsStats2[6].text[23:]),
                               ("Transfert_budget",rowsStats2[4].text[16:]),
                               ("Home_stadium",rowsStats2[0].text[12:]),
                               ("Rival_team",rowsStats2[1].a.text)
                               ])
    
    
            teams.append(team_entry)
    
    if(test_fin_list_teams(html_soup)):
        df = pd.DataFrame(teams, columns=['Url_logo','Name','League','Overall_rating','Attack','Mid','Defense','Defensive_style','Offensive_style','Captain','SFK','LFK','LSFK','RSFK','PEN','Left_corner','Right_corner','XI_average_age','Team_average_age','Transfert_budget','Home_stadium','Rival_team'])
        df["Transfert_budget"] = df["Transfert_budget"].apply(without_error_encoding)

        df.to_csv("js/public/teams_theo.csv")
        print('Done !')
        sys.exit('Fin de la récolte des équipes.')
    else:
        offset = offset+60
        print(str(round((offset/120)*100)) + '%')
    