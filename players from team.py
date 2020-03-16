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
        name = row.find("th").find("a")
        cells = row.findAll("td")
        if len(cells) == 26:
            try:
                player_entry = dict()
                player_entry["name"] = name.text
                player_entry["Nation"] = cells[0].text[3:]
                for i, label in enumerate(labels):
                    player_entry[label] = cells[i + 1].text
                player_entry["Matches"] = cells[-1].a.get("href")
                players.append(player_entry)
            except ValueError:
                print("Ouch!")

    df = pd.DataFrame(players, columns=["name", "Nation"] + labels + ["Matches"])

    df.to_csv(f"teams/{team_name}.csv")
    print("Done !")


for row in pd.read_csv("teams.csv"):
    players_from_team(row["url_saison_actuelle"], row["squad"])
