from os import makedirs
from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd


def test_head(html_soup):
    if html_soup.thead is None:
        return False

    head = html_soup.thead.findAll("tr")

    if len(head) < 2:
        return False

    if head[1].th.text != "Player":
        return False

    return True


def players_from_team(url, team_name):
    print(f"fetching {team_name} at {url}")
    html = urlopen(url)
    html_soup = BeautifulSoup(html, 'html.parser')

    if not test_head(html_soup):
        return

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


makedirs("teams", exist_ok=True)
for row in pd.read_csv("teams.csv").values:
    players_from_team(row[3], row[1])

# players_from_team("https://fbref.com/en/squads/9172ba36/Accrington-Stanley", "Accrington Stanley FC")
