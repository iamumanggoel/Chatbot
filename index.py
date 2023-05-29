from flask import Flask, render_template, request
import os
import pinecone
from dotenv import load_dotenv
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.memory import ConversationTokenBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts.prompt import PromptTemplate
app = Flask(__name__)

# Load environment variables
load_dotenv()

# Initialize Pinecone
PINECONE_API_KEY = os.environ["PINECONE_API_KEY"]
PINECONE_API_ENV = os.environ["PINECONE_ENV"]
index_name = os.environ['PINECONE_INDEX']
pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_API_ENV)
index = pinecone.Index(index_name)

# Initialize embeddings
embeddings = OpenAIEmbeddings()

# Initialize docsearch
docsearch = Pinecone.from_existing_index(index_name, embeddings)

# Initialize llm
llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

# Initialize memory
memory = ConversationTokenBufferMemory(llm=llm, max_token_limit=2000, memory_key="chat_history", return_messages=True)


llm_template = """Given the following conversation and a follow up question,
rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:"""
llm_prompt = PromptTemplate(input_variables=["question", "chat_history"], template=llm_template)



load_qa_template = """
You are Koko Assistant, an AI designed to assist users with their queries about the Koko Face Yoga website.
Your primary goal is to provide helpful responses and direct users to relevant information on the website.
If you are unsure about an answer, please suggest that the user emails their query to smile@kokofaceyoga.com instead of admitting that you don't know.
When responding, focus on addressing the visitor's question without providing unnecessary information.
If a user asks about a specific blog topic, provide a concise response and include a relevant blog link for further reading.
Here is the question and context to help you answer it. If you're unable to provide an answer, kindly ask the user to email their query to smile@kokofaceyoga.com.
Please avoid using the word 'context' in your responses, and do not disclose that you are an AI assistant.
If the context includes a relevant link, you can include it and encourage the user to explore further while summarizing the response. If it is a blog, do try to
provide a link everytime.
Question:
{question}
Context:
{context}
"""

load_qa_prompt = PromptTemplate(input_variables=["context", "question"], template=load_qa_template)

# Initialize qa
qa = ConversationalRetrievalChain.from_llm(
    llm,
    docsearch.as_retriever(),
    memory=memory,
    condense_question_prompt = llm_prompt,
    combine_docs_chain_kwargs={"prompt": load_qa_prompt},
)

def generate_response(query):
    response = qa({"question": query})
    return response['answer']

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    query = request.form['query']
    response = generate_response(query)
    return response

if __name__ == '__main__':
    app.run()
