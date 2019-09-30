from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient

# db 연결 및 db 생성
client = MongoClient('localhost', 27017)
db = client.genie
db.top200.remove()

# scraping 설정
url = 'https://www.genie.co.kr/chart/top200?ditc=D&rtm=N&ymd=20190908'
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get(url,headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')

# 순위, 곡 제목, 가수
#body-content > div.newest-list > div > table > tbody > tr:nth-child(1) > td.info > a.title.ellipsis
#td.info > a.title = '재생'
#body-content > div.newest-list > div > table > tbody > tr:nth-child(1) > td.info > a.artist.ellipsis

rank = 1
charts = soup.select('#body-content > div.newest-list > div > table > tbody > tr')
for chart in charts:
    title = chart.select_one('td.info > a.title.ellipsis')
    if not title == None:
        title = title.text
        artist = chart.select_one('td.info > a.artist.ellipsis').text
        doc = {
            'rank': rank,
            'artist': artist,
            'title': title,
        }
        
        db.top200.insert_one(doc) # insert into genie.top200
        rank += 1
    else: pass

top200 = list(db.top200.find())

for top in top200:
    rank = top['rank']
    artist = top['artist'].strip()
    title = top['title'].strip()
    print('순위: {}, 가수: {}, 제목: {}'.format(rank, artist, title))

