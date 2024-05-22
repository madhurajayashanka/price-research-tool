from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/search_ads', methods=['GET'])
def search_ads():
    try:
        item = request.args.get('inputValue').replace(" ", "%20").lower()
        category = request.args.get('selectedOption').lower()
        date_range = int(request.args.get('date_range', 10))
        page_number = int(request.args.get('page_number', 1))

        extension = f"{category}?sort=relevance&buy_now=0&urgent=0&query={item}&page={page_number}"
        url = f"https://ikman.lk/en/ads/sri-lanka/{extension}"

        with requests.Session() as session:
            response = session.get(url)
            response.raise_for_status()  # Check for any errors in the response
            soup = BeautifulSoup(response.text, 'html.parser')

            all_ads = []
            all_ads_container = soup.find("ul", class_="list--3NxGO")
            if all_ads_container:
                for ad in all_ads_container.find_all("li", class_="normal--2QYVk"):
                    title_elem = ad.find("h2", class_="heading--2eONR")
                    price_elem = ad.find("div", class_="price--3SnqI")
                    time_elem = ad.find("div", class_="updated-time--1DbCk")
                    link_elem = ad.find("a", class_="card-link--3ssYv")

                    if title_elem and price_elem and time_elem and link_elem:
                        title = title_elem.text.strip()
                        price = int(price_elem.text.replace('Rs ', '').replace(',', '').strip())
                        time = time_elem.text.strip()
                        link = "https://ikman.lk" + link_elem['href']

                        # Convert time to days old
                        if 'hours' in time:
                            days_old = 0
                        else:
                            days_old = int(time.split(" ")[0])

                        if days_old <= date_range:
                            all_ads.append({'title': title, 'price': price, 'time': time, 'link': link})

            if all_ads:
                min_price_ad = min(all_ads, key=lambda x: x['price'])
                max_price_ad = max(all_ads, key=lambda x: x['price'])
                avg_price = sum(ad['price'] for ad in all_ads) / len(all_ads)

                return jsonify({
                    'min_price': min_price_ad,
                    'max_price': max_price_ad,
                    'average_price': avg_price
                })
            else:
                return jsonify({"message": "No relevant ads found."}), 404

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
