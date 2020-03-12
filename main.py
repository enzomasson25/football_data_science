# -*- coding: utf-8 -*-
"""
Created on Thu Mar 12 09:03:24 2020

@author: 33762
"""

from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

list_lettre=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','y','z','oth']

rows = []
for lettre in list_lettre :
   html = urlopen("http://fchd.info/index"+lettre+".htm")
   html_soup = BeautifulSoup(html, 'html.parser')
   rows = rows + html_soup.findAll("li")

print(len(rows))