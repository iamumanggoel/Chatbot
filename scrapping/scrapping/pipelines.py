# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import re

class ScrappingPipeline:
    def process_item(self, item, spider):
        return item

class DocumentPipeline:
    def open_spider(self, spider):
        self.file = open('documents.txt', 'w')

    def close_spider(self, spider):
        self.file.close()

    def process_item(self, item, spider):
        if 'url' in item and 'title' in item and 'content' in item:
            url = item['url']
            title = item['title']
            content = item['content']

            # Remove extra whitespaces and newlines
            content = re.sub(r'\s+', ' ', content).strip()

            # Exclude images and graphical content
            if not self.has_image(content):
                # Write metadata and content to the file
                self.file.write(f'URL: {url}\n')
                self.file.write(f'Title: {title}\n')
                self.file.write(f'Content: {content}\n\n')

        return item

    def has_image(self, content):
        # Check if the content has image tags or image file extensions
        img_tags = re.findall(r'<img\s[^>]*>', content)
        img_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg']
        return len(img_tags) > 0 or any(ext in content.lower() for ext in img_extensions)
