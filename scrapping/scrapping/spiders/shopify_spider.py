import scrapy
from urllib.parse import urlparse, urljoin
from bs4 import BeautifulSoup
import json
import re


class MySpider(scrapy.Spider):
    name = 'shopify_spider'
    start_urls = ['https://shop.kokofaceyoga.com/']
    base_url = urlparse(start_urls[0]).netloc

    def start_requests(self):
        yield scrapy.Request(url=self.start_urls[0], callback=self.parse)

    def parse(self, response):
        visited_urls = set()
        documents = []

        yield from self.scrape_website(response, self.base_url, visited_urls, documents)

        # Save documents to a file
        with open('/home/cybertron/Documents/proj/kfychatbot/kokofaceyogachatbot/website_data/shopify.txt', 'a', encoding='utf-8') as f:
            for doc in documents:
                if isinstance(doc, dict):
                    f.write(json.dumps(doc, ensure_ascii=False) + '\n')
                elif isinstance(doc, str):
                    cleaned_content = re.sub(r'\s+', ' ', doc.strip())
                    f.write(cleaned_content + '\n')

    def scrape_website(self, response, base_url, visited_urls, documents):
        url = response.url
        if url in visited_urls:
            return

        visited_urls.add(url)
        self.logger.info("Scraping: %s", url)

        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        content = soup.get_text()
        documents.append(content.strip())

        # Extract and save metadata
        title = soup.title.string.strip() if soup.title else ''
        url_metadata = {'title': title, 'url': url}
        documents.append(url_metadata)

        # Save document even if there is no title
        if not title:
            empty_title_metadata = {'title': '', 'url': url}
            documents.append(empty_title_metadata)

        urls = self.get_urls(html, base_url)
        for sub_url in urls:
            yield scrapy.Request(sub_url, callback=self.parse)

    def get_urls(self, html, base_url):
        soup = BeautifulSoup(html, 'html.parser')
        urls = []
        for link in soup.find_all('a'):
            href = link.get('href')
            if href is not None:
                parsed_url = urlparse(href)
                if parsed_url.netloc == '':
                    # Resolve relative URLs using the base URL
                    absolute_url = urljoin("https://shop.kokofaceyoga.com/", href)
                    urls.append(absolute_url)
                elif parsed_url.netloc == base_url:
                    urls.append(parsed_url.geturl())
        return urls
