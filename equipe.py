# -*- coding: utf-8 -*-
"""
Created on Thu Mar 12 09:03:24 2020

@author: 33762
"""

#import the libraries we'll need
from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

#instantiate the BeautifulSoup to find data on the website
html = urlopen("https://fbref.com/en/country/clubs/ENG/England-Football-Clubs")
html_soup = BeautifulSoup(html, 'html.parser')


#get every line with the string "tr" in it
rows = html_soup.findAll("tr")

#create the tab that will stock the informations about teams 
teams = []

#for each row in rows
for row in rows:
    #if the line contains the tag "a" this is the name of the squad (only this line contains this tag)
    squad = row.find("a")
    #search for every td tag in the line
    cells = row.findAll("td")
    #if there is 7 td tag then 
    if (len(cells) == 7):
        #the beginning of the url of the squad is the 20 first characters
        debut_url=squad['href'][0:20]
        #the end of the url of the squad is the last characters from the index 28
        fin_url=squad['href'][28:-1]
        try:
            #different entries for the team
            team_entry = {
                #name of the squad/team
                "squad": squad.text,
                #url of the squad
                "url": "https://fbref.com" + squad['href'],
                #url of the current season for the team
                "url_saison_actuelle": "https://fbref.com" + debut_url + fin_url,
                #type of squad, if this is an team of male or female 
                "gender": cells[0].text,
                #the league where the squad is
                "comp": cells[1].text,
                #first season we have data for the squad
                "from": cells[2].text,
                #last season we have data for the squad
                "to": cells[3].text,
                #number of time the squad participated to cup
                "comps": cells[4].text,
                #number of time the squad was champion of their league
                "champs": cells[5].text,   
                #if the team changes it name 
                "other_names": cells[6].text
            }
            #add the information about the squad
            teams.append(team_entry)
        except ValueError:
            print("Ouch!")


#on veut passer de https://fbref.com/en/squads/18bb7c10/history/Arsenal-Stats
#a https://fbref.com/en/squads/18bb7c10/Arsenal-Stats
            
#create a dataframe with the different informations we gathered
df = pd.DataFrame(teams,columns=['squad','url','url_saison_actuelle','gender','comp','from','to','comps','champs','other_names'])

#methods to avoid an encoding error that appears on column 'comp'
def without_error_encoding(entry):
    if "—" in entry:
        entry = entry.replace(u"—", u"-")
    return entry


df["comp"] = df["comp"].apply(without_error_encoding)
#convert this dataframe to a csv
df.to_csv("teams.csv")
#print done
print("Done !")