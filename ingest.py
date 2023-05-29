from dotenv import load_dotenv
import os
import requests
from urllib.parse import urlparse, urljoin
from bs4 import BeautifulSoup
import pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter, TextSplitter
from langchain.vectorstores import Pinecone
from langchain.document_loaders import TextLoader
import json
import uuid 
import requests
import xml.etree.ElementTree as ET
import re
import json
from bs4 import BeautifulSoup

load_dotenv()

sitemap_url = os.environ["SITEMAP_URL"]
main_url = os.environ["WEBSITE_URL"]
file_path = os.environ["WEBSITE_DATA_FILE"]

PINECONE_API_KEY = os.environ["PINECONE_API_KEY"]
PINECONE_API_ENV = os.environ["PINECONE_ENV"]
INDEX = os.environ["PINECONE_INDEX"]

def fetch_urls_from_sitemap(sitemap_url, main_url):
    try:
        response = requests.get(sitemap_url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print("Failed to retrieve the sitemap:", e)
        return []

    tree = ET.fromstring(response.content)
    urls = []
    for url_element in tree.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}url"):
        loc_element = url_element.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
        
        lastmod_element = url_element.find("{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod")
        
        url = loc_element.text
        last_modified = lastmod_element.text if lastmod_element is not None else None
        
        if url.startswith(main_url):
            urls.append({"url": url, "last_modified": last_modified})
    
    return urls

def save_content_to_file(url, file_path):
    try:
        response = requests.get(url)
        response.raise_for_status() 
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve content from URL: {url}", e)
        return

    content = response.text
    soup = BeautifulSoup(content, 'html.parser')
    title = soup.title.string if soup.title else ""
    text_content = soup.get_text()
    cleaned_content = re.sub(r'\s+', ' ', text_content.strip())
    metadata = json.dumps({"title": title, "url": url})

    try:
        if os.path.exists(file_path) and os.stat(file_path).st_size > 0:
            mode = 'a' 
        else:
            mode = 'w'  

        with open(file_path, mode, encoding='utf-8') as file:
            if isinstance(cleaned_content, str):
                file.write(cleaned_content + '\n')
            file.write(metadata + '\n')

    except IOError as e:
        print(f"Failed to save content to file: {file_path}", e)

def fetch_and_save_urls_content(sitemap_url, main_url, file_path):
    urls = fetch_urls_from_sitemap(sitemap_url, main_url)

    for url_dict in urls:
        url = url_dict["url"]
        print("Scrapping ", url)
        save_content_to_file(url, file_path)



fetch_and_save_urls_content(sitemap_url, main_url, file_path)


text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)

try:
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        docs = []
        odd_line = ''
        even_line = ''
        for line in lines:
            cleaned_line = line.strip()

            if odd_line == '':
                odd_line = cleaned_line
            else:
                even_line = json.loads(cleaned_line)
                doc_list = text_splitter.create_documents([odd_line], metadatas=[even_line])
                docs.extend(doc_list)
                odd_line = ''
                even_line = ''
except IOError as e:
    print(f"Failed to read file: {file_path}", e)

embeddings = OpenAIEmbeddings()

pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_API_ENV)
index_name = INDEX

if index_name not in pinecone.list_indexes():
    try:
        pinecone.create_index(
            name=index_name,
            metric='cosine',
            dimension=1536
        )
    except pinecone.exceptions.PineconeException as e:
        print("Failed to create index:", e)
        exit(1)

print("Wait for the Ingestion to complete. It may take 10-20 mins. Do not click any key...")

try:
    docsearch = Pinecone.from_texts(
        [t.page_content + " " + str(t.metadata) for t in docs],
        embeddings,
        index_name=index_name,
        metadatas=[t.metadata for t in docs]
    )
except Exception as e:
    print("An error occurred:", str(e))

print("Ingestion completed.")