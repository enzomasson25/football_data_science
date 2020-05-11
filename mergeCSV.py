#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon May 11 10:55:52 2020

@author: bernardintheo
"""

import csv
import pandas as pd
teams=[]
teams_valide = []
with open('js/public/teams.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in spamreader:
        teams.append(row)
    
for team in teams:
    if team[5] in ("Premier League", "EFL Championship", "EFL League One", "EFL League Two"):
        
                    
        if(team[1][:3] =="AFC"):
            if team[1] != "AFC Wimbledon":
                team[1] = team[1][3:]
        else:
            team[1] = team[1][:-3]
        
        
        if(team[1]=="AFC Bournemouth"):
            team[1] = "Bournemouth"
            
        print(len(team))
        teamentry = {
                
                "Name":team[1],
                "url_fbref":team[2],
                "url_current_fbref":team[3],
                "team_gender":team[4],
                "from":team[6],
                "to":team[7],
                "comps":team[8],
                "champs":team[9],
                "other_names":team[10],
                "logo":team[11]
                }
        
        teams_valide.append(teamentry)
        
df = pd.DataFrame(data=teams_valide,columns=["Name","url_fbref","url_current_fbref","team_gender","from","to","comps","champs","other_names","logo"])
df1 = pd.read_csv("js/public/teams_theo.csv")

df2 = pd.merge(df1, df, on="Name")

df2.to_csv("js/public/teamsMix.csv")







        