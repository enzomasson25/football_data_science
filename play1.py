#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 31 10:29:54 2020

@author: bernardintheo
"""

from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd


def players_from_team(url, team_name):
    html = urlopen(url)
    html_soup = BeautifulSoup(html, 'html.parser')

    labels = [tag.text for tag in html_soup.thead.findAll("tr")[1].findAll("th")][2:7]

    rows = html_soup.tbody.findAll("tr")
    players = []
    for row in rows:
        cells = row.findAll("td")
        if len(cells) == 16:
            try:
                player_entry = dict()
                player_entry["age"] = cells[1]
                print(player_entry)
            except:
                pass
    
    df = pd.DataFrame(players, columns=["name", "Nation"] + labels + ["Matches"])
    df.to_csv(f"teams/{players}.csv")
    print("Done !")


for row in pd.read_csv("teams.csv"):
    players_from_team(row["url_saison_actuelle"], row["squad"])
