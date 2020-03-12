# -*- coding: utf-8 -*-
"""
Created on Thu Mar 12 09:03:24 2020

@author: 33762
"""

from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

list_url['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p']

html = urlopen("https://www.premierleague.com/clubs")
html_soup = BeautifulSoup(html, 'html.parser')


rows = html_soup.findAll("clubName")
print(len(rows))