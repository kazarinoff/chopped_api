from bs4 import BeautifulSoup
from datetime import datetime
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.chopped_db
collection = db.episodes

stub = open('wiki2.html',encoding="utf8")
count = len(open('wiki2.html',encoding="utf8").readlines())
soup = BeautifulSoup(stub, 'html.parser')
entryarray=[]
tag=soup.td
season=1
for i in range(0,249):
    entry={'season':season}
    entry['seriesno']=int(tag.string.replace("\t", "").replace("\r", "").replace("\n", ""))
    tag=tag.next_sibling.next_sibling
    entry['seasonno']=int(tag.text.replace("\t", "").replace("\r", "").replace("\n", ""))
    tag=tag.next_sibling.next_sibling
    entry['title']=tag.text.replace("\t", "").replace("\r", "").replace("\n", "").replace('\"','')
    tag=tag.next_sibling.next_sibling
    x=tag.text.replace("\t", "").replace("\r", "").replace("\n", "")
    premieredate=datetime.strptime(x,"%B %d, %Y")
    entry['premiere']=premieredate
    tag=tag.parent.next_sibling.next_sibling
    tag=tag.ul.li
    x=tag.text.split(":")[1].split(", ")
    entry['courses']={'appetizer':x}
    tag=tag.next_sibling.next_sibling
    x=tag.text.split(":")[1].split(", ")
    entry['courses']['entree']=x
    tag=tag.next_sibling.next_sibling
    x=tag.text.split(":")[1].split(", ")
    entry['courses']['dessert']=x
    for key in entry['courses']:
        entry['courses'][key][0]=entry['courses'][key][0].lstrip(" ")


    tag=tag.parent.parent.next_sibling.next_sibling
    tag=tag.ul
    entry['judges']=[tag.contents[0].text,tag.contents[2].text,tag.contents[4].text]

    tag=tag.parent.parent.next_sibling.next_sibling
    x=tag.ul.contents[0].text.split()
    y=x[0]+" "+x[1]
    entry['contestants']=[y]
    x=tag.ul.contents[2].text.split()
    y=x[0]+" "+x[1]
    entry['contestants'].append(y)
    x=tag.ul.contents[4].text.split()
    y=x[0]+" "+x[1]
    entry['contestants'].append(y)
    x=tag.ul.contents[6].text.split()
    y=x[0]+" "+x[1]
    entry['contestants'].append(y)

    tag=tag.next_sibling.next_sibling.td
    entry['notes']=tag.text.replace("\t", "").replace("\r", "").replace("\n", "")
    entryarray.append(entry)
    print(entry['title'])
    if tag.parent.next_sibling != None:
        tag=tag.find_next("td")
    else:
        tag=tag.find_next('span')
        season += 1
        tag=tag.find_next('td')
    print (i)
    
result=collection.insert_many(entryarray)